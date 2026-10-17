//codigo para puebas de super test (usanod la db real)

//tets para csos de prueba y after para ejecutar codigo despues del test 
const {test,after,beforeEach}=require('node:test')

const Blog=require('../models/blog')
const assert=require('node:assert')
const User=require('../models/user')
const bcrypt=require('bcryptjs')

//permite usar la db real sin puerto con metodos http
const supertest=require('supertest')

const mongoose=require('mongoose')
const app=require('../app')

//permite hacer test en app (supertest==db real con htpp)
const api=supertest(app)

//se activa despues que todo el test halla terminaod
after(async()=>{ //(lee el codigo lo ejecuta y luego se activa after)
    await mongoose.connection.close()
})

//objetos para probar cada test (arry de objetos)
const blogs_pruebas=[
    {
        titulo:'Blog de prueba 1',
        author:'Josue',
        url:'http://test1.com',
        likes:5
    },
    {
        titulo:'Blog de prueba 2',
        author:'Maria',
        url:'http://test2.com',
        likes:10
    }
]

let token=null
//limpiar pruebas antes de cada test
beforeEach(async()=>{
    
    //limpiar la db
    await User.deleteMany({})
    await Blog.deleteMany({})

    for(const blog of blogs_pruebas){

        //recorre el array y gaudar cada blog 
        await (new Blog(blog)).save()
    }

    const password_hash=await bcrypt.hash('salainen',10)
    const usuario=new User({user_name:'test_user',password_hash})
    await usuario.save()

    const res_login=await api
        .post('/api/login')
        .send({user_name:'test_user',password:'salainen'})

    token=res_login.body.token
})

test('prueba con get',async()=>{
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
})

test('el identificador unico se llama id',async()=>{
    const res=await api.get('/api/blogs')

    //extare los datos de la repuesta get (url)
    const blogs=res.body

    assert(blogs.length>0) //que halla almenos un blog
    assert(blogs[0].id) //que halla almenos una id
    assert(!blogs[0]._id) //la id que sea difrente a _id
})

test('enviar datos por post',async()=>{
    const nuevo_blog={
        titulo:'Blog de prueba',
        author:'Josue',
        url:'http://test.com',
        likes:5
    }

    //promesa http
    await api.post('/api/blogs')
    .set('Authorization','Bearer '+token)
    .send(nuevo_blog)
    .expect(201)
    .expect('Content-Type',/application\/json/)

    //pide los datos enviados por el post a la db
    const res=await api.get('/api/blogs')
    const blogs=res.body

    //pruebas
    assert.strictEqual(blogs.length,blogs_pruebas.length+1)
    assert(blogs.map(b=>b.titulo).includes('Blog de prueba'))
})

test('eliminar por id',async()=>{
    
    //crear usuario ( el get tiene los viejos que no usa user:id que etsa en blog)
    const nuevo_blog={
        titulo:'Blog a eliminar',
        author:'Josue',
        url:'http://test.com',
        likes:1
    }

    //poner nuevo blog en la db
    const res_creado=await api.post('/api/blogs')
        .set('Authorization','Bearer '+token)
        .send(nuevo_blog)

    const blog_eliminar=res_creado.body

    //eliminar por id
    await api.delete(`/api/blogs/${blog_eliminar.id}`)
    .set('Authorization','Bearer '+token)
    .expect(204)

    const res_final=await api.get('/api/blogs')
    assert.strictEqual(res_final.body.length,blogs_pruebas.length)
})

//actualizar datos
test('actualizar por id',async()=>{
    const res=await api.get('/api/blogs')
    const blog_actualizar=res.body[0]

    //datos nuevos
    const datos_nuevos={
        titulo:'Blog actualizado',
        author:'Josue',
        url:'http://test.com',
        likes:999
    }

    //actualizar datos
    await api.put(`/api/blogs/${blog_actualizar.id}`)
    .send(datos_nuevos)
    .expect(200)
    .expect('Content-Type',/application\/json/)

    //pedir datos para hacer pruebas
    const res_final=await api.get('/api/blogs')
    const blog_final=res_final.body[0]

    //pruebas
    assert.strictEqual(blog_final.titulo,'Blog actualizado')
    assert.strictEqual(blog_final.likes,999)
})

test('crear blog sin token devuelve 401',async()=>{
    const nuevo_blog={
        titulo:'Blog sin token',
        author:'Josue',
        url:'http://test.com',
        likes:5
    }

    await api.post('/api/blogs')
    .send(nuevo_blog)
    .expect(401)
})

test('si falta likes, por defecto es 0',async()=>{
    const nuevo_blog={
        titulo:'Blog sin likes',
        author:'Josue',
        url:'http://test.com'
        //sin likes pa probar
    }

    await api.post('/api/blogs')
    .set('Authorization','Bearer '+token)
    .send(nuevo_blog)
    .expect(201)
    .expect('Content-Type',/application\/json/)

    const res=await api.get('/api/blogs')
    const blog_guardado=res.body.find(b=>b.titulo==='Blog sin likes')

    assert.strictEqual(blog_guardado.likes,0)
})

test('si falta titulo o url, devuelve 400',async()=>{
    
    // 1. Probamos sin titulo
    const blog_sin_titulo={
        author:'Josue',
        url:'http://test.com'
    }

    await api.post('/api/blogs')
    .set('Authorization','Bearer '+token)
    .send(blog_sin_titulo)
    .expect(400)

    // 2. Probamos sin url
    const blog_sin_url={
        titulo:'Blog sin url',
        author:'Josue'
    }

    await api.post('/api/blogs')
    .set('Authorization','Bearer '+token)
    .send(blog_sin_url)
    .expect(400)
})
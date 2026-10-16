const {test,after,beforeEach,describe}=require('node:test')
const User=require('../models/user')
const assert=require('node:assert')
const supertest=require('supertest')
const mongoose=require('mongoose')
const app=require('../app')
const bcrypt=require('bcryptjs')

const api=supertest(app)

describe('when there is initially one user in db',()=>{

    
    //elimina y crea un usario y contraseña 
    beforeEach(async()=>{
        await User.deleteMany({})

        const password_hash=await bcrypt.hash('sekret',10)
        const user=new User({user_name:'root',password_hash})
        await user.save()

    })

    test('probando post',async()=>{
        
        //extrae usario de la db
        const res_inicio=await api.get('/api/users')
        .expect(200)
        .expect('Content-Type',/application\/json/)

        const user_inicio=res_inicio.body

        const nuevo_usuario={
            user_name:'josue',
            name:'Josue Aponte',
            password_hash:'salainen'
        }

        //guarda viejo ususario en la db
        await api.post('/api/users')
        .send(nuevo_usuario)
        .expect(201)
        .expect('Content-Type',/application\/json/)

         const res_final=await api.get('/api/users')
        .expect(200)
        .expect('Content-Type',/application\/json/)

        const user_final=res_final.body

        //verificar que siempre halla un nuevo usario creado
        assert.strictEqual(user_inicio.length+1,user_final.length)

        const user_names=user_final.map(u=>u.user_name)
        assert(user_names.includes(nuevo_usuario.user_name))
   
    })

        test('creation fails with statuscode 400 if user_name too short',async()=>{
        const user_inicio=await User.find({})

        const nuevo_usuario={
            user_name:'jo',
            name:'Josue',
            password_hash:'salainen'
        }

        await api
            .post('/api/users')
            .send(nuevo_usuario)
            .expect(400)

        const user_final=await User.find({})
        assert.strictEqual(user_final.length,user_inicio.length)
    })

        test('creation fails with statuscode 400 if password too short',async()=>{
        const user_inicio=await User.find({})

        const nuevo_usuario={
            user_name:'josue2',
            name:'Josue',
            password_hash:'12'
        }

        await api
            .post('/api/users')
            .send(nuevo_usuario)
            .expect(400)

        const user_final=await User.find({})
        assert.strictEqual(user_final.length,user_inicio.length)
    })

        test('creation fails with statuscode 400 if user_name already taken',async()=>{
        const user_inicio=await User.find({})

        const nuevo_usuario={
            user_name:'root',
            name:'Superuser',
            password_hash:'salainen'
        }

        const res=await api
            .post('/api/users')
            .send(nuevo_usuario)
            .expect(400)

        assert(res.body.error.includes('unique'))

        const user_final=await User.find({})
        assert.strictEqual(user_final.length,user_inicio.length)
    })
    

})

after(async()=>{
    await mongoose.connection.close()
})
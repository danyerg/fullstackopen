const {test,describe}=require('node:test') //para hacer pruebas
const assert=require('node:assert') //para verificar un valor esperado
const list_helper=require('../utils/list_helper') //importa el archivo list_helper


test('dummy returns one',()=>{
    
    const blogs=[] //arry vacio
    const result=list_helper.dummy(blogs) //manda a blogs al la funcion dummy

    assert.strictEqual(result,1) //verifica si es igual a 1
})

//para saber la cantidad de likes de la db
describe('total likes',()=>{
    
    //atributos de la db
    const datos_blog=[{

             _id:'5a422aa71b54a676234d17f8',
            title:'Go To Statement Considered Harmful',
            author:'Edsger W. Dijkstra',
            url:'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes:5,
            __v:0
        }]

    test('cuando la lista tiene un solo blog devuelve sus likes',()=>{
        
        //suma el total de likes de cada blog de la db
        const result=list_helper.total_likes(datos_blog)

        //compara atributos
        assert.strictEqual(result,5)
    })

    
})

//blogs favorito
describe('blog con mas likes',()=>{
    
    //datos de prueba
    const datos_blog=[
        {title:'A', author:'X', url:'...', likes:5},
        {title:'B', author:'Y', url:'...', likes:12},
        {title:'C', author:'Z', url:'...', likes:3}
    ]

    test('cuando hay varios blogs devolvera el de mas likes',()=>{
        
        //funcion para comparar el que tenga mas likes
        const result=list_helper.blog_favorito(datos_blog)
        
        //compara objetos completos y arrys
        assert.deepStrictEqual(result,{title:'B', author:'Y', url:'...', likes:12})

    })


})

//author con mas blogs
describe('author con mas blogs',()=>{
    
    const blogs=[
    {author:'Robert C. Martin', title:'Clean Code', likes:10},
    {author:'Robert C. Martin', title:'Clean Architecture', likes:8},
    {author:'Robert C. Martin', title:'The Clean Coder', likes:12},
    {author:'Edsger W. Dijkstra', title:'Go To Statement', likes:5},
    {author:'Edsger W. Dijkstra', title:'Structured Programming', likes:7},
    {author:'Martin Fowler', title:'Refactoring', likes:15},
    {author:'Martin Fowler', title:'Patterns of Enterprise', likes:9},
    {author:'Martin Fowler', title:'UML Distilled', likes:6},
    {author:'Martin Fowler', title:'PoEAA', likes:11},
    {author:'Kent Beck', title:'Test Driven Development', likes:20},
    {author:'Kent Beck', title:'Extreme Programming', likes:14},
    {author:'Barbara Liskov', title:'Data Abstraction', likes:18}
    ]

    test('devolvera el autor y el nmr de blogs',()=>{
        const result=list_helper.contar_blog(blogs)
        assert.deepStrictEqual(result,{author:'Martin Fowler',blogs:4})
    })


})

//para saber el author con mas likes
describe('para saber el author con mas likes',()=>{

    const blogs = [
    { author: 'Edsger W. Dijkstra', likes: 5 },
    { author: 'Robert C. Martin', likes: 10 },
    { author: 'Edsger W. Dijkstra', likes: 12 }
]

    test('devuelve al autor y sus likes',()=>{

        const result=list_helper.mas_likes(blogs)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })
    })


})
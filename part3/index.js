const express=require('express')
const morgan=require('morgan')

 //se usa cors para permitirle al fornted acceder a los datos del bakend
const cors=require('cors')

//app puede utilizar las herraminetas de express
const app=express()

//middleware 
app.use(cors())
app.use(express.json()) //traforma lo que se envias en la url a json
app.use(express.static('dist'))

//trafroma el body (lo que envia el usuario) a string 
morgan.token('body',(req)=>JSON.stringify(req.body))

//informacion en string... nose
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')) 


//lista de objetos
let personas=[
  {id:1,name:'Arto Hellas',number:'040-123456'},
  {id:2,name:'Ada Lovelace',number:'39-44-5323523'},
  {id:3,name:'Dan Abramov',number:'12-43-234345'},
  {id:4,name:'Mary Poppendieck',number:'39-23-6423122'}
]

//responde con la lista de objetos a entar en esa url 
app.get("/api/personas",(req,res)=>{
    res.json(personas)
})

//
app.get("/api/personas/:id",(req,res)=>{
    
    //req= recibe lo que el clinete envia al servidor
    const id=Number(req.params.id)
    const persona=personas.find(buscar=>buscar.id===id)

    //responde con un solo objeto 
    if(persona){
        //responde con los objetos de una sola persona 
        res.json(persona)
    }
    else{
        //responde que hubo un error
        res.status(404).end()
    }
})

//metodo para eliminar personas especifica por id
app.delete("/api/personas/:id",(req,res)=>{
    //obtener id de la url 
    const id=Number(req.params.id)

    //buscar i eliminar a la persona y crera un arry con los que cumplan
    personas=personas.filter(buscar=>buscar.id!==id)

    //responde que todo salio bien 
    res.status(204).end()
})

//metodo para añadir personas
app.post("/api/personas",(req,res)=>{
    //extrae los datos enviados por el usaurio (en la url)
    const body=req.body

    //revisar si name esta vacio y si ya existe
    if(!body.name){
        return res.status(400).json({error:"el nombre es obligatorio"})
    }else{
        const existe_name=personas.find(buscar=>buscar.name===body.name)
        if(existe_name){
            return res.status(400).json({error:"el nombre debe ser unico"})
        }

    }

    //revisar si el nmr esta vacio
    if(!body.number){
        return res.status(400).json({error:"el numero es obligatorio"})
    }

    //asignarle el id a la persona nueva (una nueva clave:valor)
    const nueva_persona={
        id:Math.floor(Math.random()*1000000),
        name:body.name,
        number:body.number
    }

    //meterlo en la db local 
    personas=personas.concat(nueva_persona)

    //solo muetra el nuevo 
    console.log(nueva_persona)
    console.log(personas)

    //responde con el objeto obtenido 
    res.json(nueva_persona) 
})


//puerto del server usa uno dinamico de la app o el puerto 3001
const PORT=process.env.PORT || 3001 

//primer parametro el puerto y el segundo nose
app.listen(PORT,()=>{
    console.log(`servidor ejecutandandose en ${PORT}`)
})
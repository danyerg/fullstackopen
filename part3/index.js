require('dotenv').config()//permite usar las variables locales de la pc 
const express=require('express')
const morgan=require('morgan')
const cors=require('cors') //se usa cors para permitirle al fornted acceder a los datos del bakend
const persona=require('./models/persona.js')//importamos el esquema
const app=express() //app puede utilizar las herraminetas de express


//middleware 
app.use(cors())
app.use(express.json()) //traforma lo que se envias en la url a json
app.use(express.static('dist'))

//trafroma el body (lo que envia el usuario) a string 
morgan.token('body',(req)=>JSON.stringify(req.body))

//informacion en string... nose
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')) 

//ENDPOINTS 

//responde con la lista de objetos a entar en esa url 
app.get("/api/personas",(req,res,next)=>{
    persona.find({}).then(resultado=>{
        console.log(resultado)
        res.json(resultado)
    }).catch(error=>{next(error)})
})

//responde con el usario que el clienet pida solo un dato 
app.get("/api/personas/:id",(req,res,next)=>{
    
    //req= recibe lo que el clinete envia al servidor
    persona.findById(req.params.id).then(resultado=>{

        //si lo encontro responde con ese dato
        if(resultado){
            res.json(resultado)}
        
        //responde 404 que no lo encontro 
        else{
            res.status(404).end()}

    }).catch(error=>{next(error)})
})

//metodo para eliminar personas especifica por id
app.delete("/api/personas/:id",(req,res,next)=>{

    //busca por la id y lo elimina dorectamente de la db
    persona.findByIdAndDelete(req.params.id).then(resultado=>{

    //responde que todo salio bien 
    res.status(204).end()

    }).catch(error=>{next(error)})
})

//metodo para añadir personas
app.post("/api/personas",(req,res,next)=>{
    //extrae los datos enviados por el usaurio (en la url)
    const body=req.body

    //usasr la variable de la plantilla y crear persona
    const nueva_persona=new persona({
        name:body.name,
        number:body.number
    })

    //guarda la nueva persona e imprime solo eso datos 
    nueva_persona.save().then(resultado=>{
        res.json(resultado)
    }).catch(error=>{next(error)})
 
})

//actualizar numero
app.put("/api/personas/:id",(req,res,next)=>{

    //paquete de la url
    const body=req.body

    persona.findByIdAndUpdate(req.params.id,{name:body.name,number:body.number},
        {new:true,runValidators:true,context:'query'})
    .then(resultado=>{
        res.json(resultado)
    }).catch(error=>{next(error)})
})

//informacion de codumentos y fecha
app.get("/info",(req,res,next)=>{

    //cuenta todos los documentos
    persona.countDocuments({}).then(resultado=>{
        //fecha actual
        const fecha=new Date()
        
        //envia la cantidad y fecha actual 
        res.send(`La agenda tiene ${resultado} personas \nFecha ${fecha}`)
        
    }).catch(error=>{next(error)})
})

//funcion para errors del catch
const errorHandler=(error,req,res,next)=>{

    //imprime el tipo error 
    console.log(error.message)

    //error de tipo id
    if(error.name==="CastError"){
        
        //detiene la ejecucuion de la funcion 
        return res.status(400).send({error:'id mal formado'})}
    
    else if(error.name==="ValidationError"){
        return res.status(400).json({error:error.message})
    }
    
    //en el caso de otro error se lo pasa la manejador de errores 
    next(error)

}

//compruba al final si hubo un error de tipo catch sin resolver
app.use(errorHandler)

//puerto del server usa uno dinamico de la app o el puerto 3001
const PORT=process.env.PORT || 3001 

//primer parametro el puerto y el segundo nose
app.listen(PORT,()=>{
    console.log(`servidor ejecutandandose en ${PORT}`)
})
const logger=require('./logger')
const jwt=require('jsonwebtoken')
const user=require('../models/user')

//describe informacion de la url 
const request_logger=(req,res,next)=>{

    //dice el metodo http usado
    logger.info('method:',req.method) //(ej:GET PUT POST DELETE)
    
    //ruta que el cliente solicito 
    logger.info('path:',req.path) //(ej;/api/blogs)

    //cuerpo json que se envia en la url
    logger.info('body:',req.body) //(ej:{titulo:'Mi blog',author:'Josue',likes:5})
    
    //separador visual
    logger.info('---')//nose cuando se usa
    next()
}

//

const get_token_from=(req,res,next)=>{

    //extare (authorization) de la la cabezera de la url
    const authorization=req.get('authorization')

    //no este vacio y que comience con (Bearer )
    if(authorization && authorization.startsWith('Bearer ')){

        //devuelve el token sin la palabra bearer
        req.token=authorization.replace('Bearer ','')
    }

    //caso contrario devuelve undefined
    else{
        req.token=null
    } 

    next()

}

//se activa cuando la url no existe 
const Endpoints_desconocido=(req,res)=>{
    res.status(404).send({error:'unknown endpoint'})
}


//recibe los tipos de erorres del catch
const errorHandler=(error,req,res,next)=>{
    logger.error(error.message)

    //nose 
    if(error.name==="CastError"){
        return res.status(400).send({error:'id mal formado'})}

    //se activa si los require del esquema no son validos
    else if(error.name==="ValidationError"){
        return res.status(400).json({error:error.message})}

    //se activa cuanod hay error a nivel de base de datos
    else if(error.name==="MongoServerError" && error.message.includes('E11000 duplicate key error')){
    return res.status(400).json({error:'expected `user_name` to be unique'})}

    else if(error.name==='JsonWebTokenError'){
    return res.status(401).json({error:'token invalido'})}
    
    //se activa para errores que no esten 
    next(error)
}

//extare el usuario asociado al token 
const user_extractor=async(req,res,next)=>{

    //decodifica el token (ya extraido por get_token_from)
    const decoded_token=jwt.verify(req.token,process.env.SECRET)

    //busca al usuario del token y lo guarda en req.user
    req.user=await user.findById(decoded_token.id)

    next()
}

//exporta las funciones
module.exports={
    request_logger,Endpoints_desconocido,errorHandler,get_token_from,user_extractor}
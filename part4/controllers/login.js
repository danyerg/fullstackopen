const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const login_router=require('express').Router()
const user=require('../models/user')

login_router.post('/',async(req,res,next)=>{
    
    try{
        
        //cuerpo de la url //contraseña del cliente enviada por POST
        const body=req.body
        const password_url=body.password

        //buscar usuario por nombre 
        const usuario=await user.findOne({user_name:body.user_name})

        //comprobar si el usario existe  
        let comprobar_password=false
        if(usuario){

            //comprobar contraseña si la enviada es la misma que en la db
            comprobar_password=await bcrypt.compare(password_url,usuario.password_hash)}

        //usuario si existe pero contraseña es invalida 
        if(!comprobar_password){
            return res.status(401).json({error:'contraseña o usuario invalido'})
        }

        //datos dle token
        const datos_token={
            user_name:usuario.user_name,
            id:usuario._id
        }

        const token=jwt.sign(datos_token,process.env.SECRET)

        res.status(200).send({token,user_name:usuario.user_name,name:usuario.name})


    }catch(error){next(error)}

})

module.exports=login_router
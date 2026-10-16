const user_router=require('express').Router()
const user=require('../models/user.js')
const bcrypt=require('bcryptjs')

//endpoint

user_router.get('/',async(req,res,next)=>{

    try{

        //muestar los usarios y SUS blogs asociados
        const resultado=await user.find({})
        .populate('blogs',{titulo:1,author:1,url:1,likes:1})
        res.json(resultado)

    }catch(error){next(error)}
})

user_router.post('/',async(req,res,next)=>{

    try{

        //datos de la url
        const body=req.body

        //verificar user_name y password
        if(!body.user_name || body.user_name.length<3){
            return res.status(400).json({error:'user name invalido'})
        }

        if(!body.password_hash || body.password_hash.length<3){
            return res.status(400).json({error:'password invalido'})
        }
        
        //hadhear la contraseña
        const password_hash=await bcrypt.hash(body.password_hash,10)


        const new_user=new user({
            user_name:body.user_name,
            name:body.name,
            password_hash:password_hash
        })

        const resultado=await new_user.save()
        res.status(201).json(resultado)

    }catch(error){next(error)}
})

module.exports=user_router
// quita la dependencia d eusar (app.get app.post)
const blogs_router=require('express').Router()
const blog=require('../models/blog') //permite usar el molde del esquema
const middleware=require('../utils/middleware')

//ENDPOINTS

//pide datos de la db
blogs_router.get('/',async(req,res,next)=>{
    
    //en caso de error sale dle bloque y lo manda al catch
    try{

        //pide los blogs (y el usuario asociado) //0= no lo muestar 1=lo muestra
        const resultado=await blog.find({}).populate('user',{user_name:1,name:1})
        res.json(resultado)

    //recibe el error de try
    }catch(error){next(error)}
    
})

//guarda new dtos en la db
blogs_router.post('/',middleware.user_extractor,async(req,res,next)=>{

    //registra el error y sale del bloque en ese caso
    try{
        
    //dtos del cuepro de la url
    const body=req.body

    //extrae solo el body de UN usuario (usanod el id dle token)
    const usuario=req.user

    const nuevo_datos=new blog({
        
        //variables del esquema
        titulo:body.titulo,
        author:body.author,
        url:body.url,
        likes:body.likes || 0,
        user:usuario._id    
    })
    
    //se gaudra el Blog con el ususario
    const resultado=await nuevo_datos.save()

    //guarda el usario con la id de lso blogs
    usuario.blogs=usuario.blogs.concat(resultado._id)
    await usuario.save()

    res.status(201).json(resultado)
    
}catch(error){next(error)}

})

//eliminar un blog por id
blogs_router.delete('/:id',middleware.user_extractor,async(req,res,next)=>{
    try{

        //buscar blog y ver si existe
        const buscar_blog=await blog.findById(req.params.id)

        if(buscar_blog===null){
            return res.status(404).json({error:'blog no encontrado'})}

        //comprobar la id del usuario (en blog) con el id del token (usario)
        if(buscar_blog.user.toString()!==req.user.id){
             return res.status(401).json({error:'no autorizado'})}

        //elimina por id del blog 
        await blog.findByIdAndDelete(req.params.id)
        res.status(204).end()


    }catch(error){next(error)}


})

//actializar dato por id
blogs_router.put('/:id',async(req,res,next)=>{

    //extraer el cuerpo
    const body=req.body

    try{
        const blog_actualizado=await blog
        .findByIdAndUpdate(req.params.id,
            {titulo:body.titulo,author:body.author,url:body.url,likes:body.likes},
            {new:true})

        res.json(blog_actualizado)

    }catch(error){next(error)}

})
    
module.exports=blogs_router
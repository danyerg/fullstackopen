//permite usar la db de mongose (local/nube)
const mongoose=require('mongoose') 

//creacion del molde de la db
const esquema_blog=new mongoose.Schema({
    titulo:String,
    author:String,
    url:String,
    likes:Number,
    user:{

        //define a que id apunta el atributo user 
        type:mongoose.Schema.Types.ObjectId,
        ref:'usuario' //apunta al id de la tabla usuarios
    }
})

esquema_blog.set('toJSON',{
    transform:(document,returneObject)=>{
        //traforma la _id en (id) 
        returneObject.id=returneObject._id.toString()

        //elimina __v y la id vieja (_id)
        delete returneObject.__v
        delete returneObject._id
    }
})

//exportar esquema //name de la db y uso del molde esquema_blog
module.exports=mongoose.model('blog',esquema_blog) 

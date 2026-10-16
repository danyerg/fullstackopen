const mongoose=require('mongoose')

//crear el esquema para la tabla usuaris
const esquema_usuarios=new mongoose.Schema({
    user_name:{
        type:String,
        required:true,
        unique:true
    },
    name:String,
    password_hash:String,
    
    //relaciona cda blog con el usuario
    blogs :[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'blog'
        }
    ]
})

//trasnforma el objeto a json
esquema_usuarios.set('toJSON',{

    transform:(document,returneObject)=>{

        //convierte el id a string
        returneObject.id=returneObject._id.toString()
        delete returneObject._id
        delete returneObject.__v
        delete returneObject.password_hash //no se debe mandar al fonted
    }

})

module.exports=mongoose.model('usuario',esquema_usuarios)
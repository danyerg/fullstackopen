const dns=require('dns')
dns.setServers(['8.8.8.8','8.8.4.4'])//usa el dns de gogle y no el de mi pc que da error

const mongoose=require("mongoose")

//permite usar la url local y de render
const url=process.env.MONGODB_URI

//quitar avertencias //conectar con la db
mongoose.set('strictQuery',false)
mongoose.connect(url)

//esquema (datos y tipos) que tendran la db
const persona_esquema=new mongoose.Schema({
    name:{type:String,minLength:3,required:true},
    number:{type:String,
        validate:{
            validator:function(v){
                const partes=v.split("-")

                //si es menor de 8 no es valido si es 7 no vale
                if(v.length<=7){return false}

                //si partes No es 2 significa que el split no se activo 2 veces
                //y no debe tener 2 giones creo
                else if(partes.length!==2){return false}

                //minimo 2 0 3 digitos la parte derecha del gion
                else if(partes[0].length<2 || partes[0].length>3){return false}

                //que sea nmr todo los digitos
                else if(isNaN(partes[0]) || isNaN(partes[1])){return false}

                //si pasa todo es valido
                return true

            }//cierre validator
            ,message:"el numero debe tener el formato xx-xxxxxx"
        }//cierrevalidate

        }//cierre number
})//cierre del esquema

//cambiar configuracion
persona_esquema.set('toJSON',{

    transform:(document,returndObject)=>{

        //cambia el _id a string
        returndObject.id=returndObject._id.toString()

        //elimina la id de nose y la __v de nose
        delete returndObject._id
        delete returndObject.__v
    }
})

//modelo que usa el esquema creado
const persona=mongoose.model('persona',persona_esquema)

//exportar a cualquier archivo que use require models/persona.js
module.exports=persona
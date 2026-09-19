const mongoose=require("mongoose")

//revisar si escribio 3 palabras
if(process.argv.length<3){
    console.log("Por favor provee la contraseña como argumento: node mongo.js <password>")
    process.exit(1)
}

//guardar contraseña escrita en la terminal 
const password=process.argv[2]

//url de la db instalada en la pc... 
const url=`mongodb://127.0.0.1:27017/agendaApp`

//quitar avertencias //conectar con la db 
mongoose.set('strictQuery',false)
mongoose.connect(url)


//esquema (datos y tipos) que tendran la db
const persona_esquema=new mongoose.Schema({
    name:String,minlength:3,required:true,
    number:String,minlength:3,require:true
})

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

//solo se activa si escribe 3 palabras
if(process.argv.length===3){
    persona.find({}).then(resultado=>{
        console.log("agenda: ")
        resultado.forEach(p=>{console.log(`${p.name} ${p.number}`)
        
        })

    //cierra la conecion
    mongoose.connection.close()
    })
}

//se activa solo si escribe 5 palabras
else if(process.argv.length===5){
    const nombre=process.argv[3]
    const numero=process.argv[4]

    const nueva_persona=new persona({
        name:nombre,
        number:numero
    })

    nueva_persona.save().then(resultado=>{
        console.log(`se guardo a ${nombre} ${numero}`)
        mongoose.connection.close()
    })

}

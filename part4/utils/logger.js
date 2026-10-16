//los codigos ya no usaran console.log
const info=(...params)=>{
    console.log(...params)
}

//ni idea
const error=(...params)=>{
    console.error(...params)
}

//exportar funciones
module.exports={info,error}
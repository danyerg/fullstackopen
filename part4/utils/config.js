require('dotenv').config()

//Exportacion de los puerto de env
const PORT=process.env.PORT || 3003
const MONGODB_URI=process.env.NODE_ENV==="test"

    //se conecta a la db de (pruebas en consola con conecion a la db)
    ?process.env.TEST_MONGODB_URI 
    
    //se conecta al db usanod el puerto 3003
    :process.env.MONGODB_URI

//exportacion a cualquer archivo 
module.exports={
    PORT,MONGODB_URI
}

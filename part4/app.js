//ME permite usar la db de mongo nube
const dns=require('dns')
dns.setServers(['8.8.8.8','8.8.4.4'])

const config=require('./utils/config') //exportan lo dle .env
const middleware=require('./utils/middleware')
const blogs_router=require('./controllers/blog')
const user_router=require('./controllers/user')
const login_router=require('./controllers/login')
const express=require('express')
const cors=require('cors')
const app=express()
const logger=require('./utils/logger')//quita dependencia de console.log
const mongoose=require('mongoose')//permite usar la db 

//url de la db
const url=config.MONGODB_URI

//desactiva notifiacion de algo //manda notifiacion de que se esta conectando
mongoose.set('strictQuery',false)
logger.info('conectando a',config.MONGODB_URI) 

//se conecta a la db
mongoose.connect(url).then(()=>{
    logger.info('conectado a MongoDB')

}).catch(error=>{logger.error('error de conexion',error.message)
})

//permite conexion entre dfrentes puertos
app.use(cors())

//traforma el body de string a objeto (req.body)
app.use(express.json())

//registra la informacion de la url
app.use(middleware.request_logger)

//extare y tranforma el token //extra el usario del token
app.use(middleware.get_token_from)

//permite usar los endpoints en esas rutas
app.use('/api/blogs',blogs_router)
app.use('/api/users',user_router)
app.use('/api/login',login_router)

//si la ruta no existe manda info del error (404)
app.use(middleware.Endpoints_desconocido)

//recibe todos los errores del catch
app.use(middleware.errorHandler)

//exporta app para que index la use
module.exports=app
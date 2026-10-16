const app=require('./app')
const config=require('./utils/config')
const logger=require('./utils/logger')

//escha el puerto
app.listen(config.PORT,()=>{
    logger.info(`servidor en puerto ${config.PORT}`)
})
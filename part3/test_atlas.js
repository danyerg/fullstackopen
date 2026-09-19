//no me funcionaba mongo nube eso es la solucion
const dns=require('dns')
dns.setServers(['8.8.8.8','8.8.4.4'])

const mongoose=require('mongoose')

const url='mongodb+srv://josueaponteggg_db_user:577K53nB4ihxKChV@cluster0.3v4ojlj.mongodb.net/?appName=Cluster0'

mongoose.connect(url)
  .then(()=>console.log('¡Conectado a MongoDB Atlas!'))
  .catch(error=>console.log('Error de conexión:',error.message))
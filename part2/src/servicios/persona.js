import axios from 'axios'
const dbURL="http://localhost:3001/persons"

const datos_bd=()=>{
    const request=axios.get(dbURL)
    return request.then(response=>response.data)
}

const agregar=(atributos)=>{
    const request=axios.post(dbURL,atributos)
    return request.then(response=>response.data)
}

const eliminar=(id)=>{
    const request=axios.delete(`${dbURL}/${id}`)
    return request.then(response=>response.data)}

const actualizar=(id,atributos)=>{
    const request=axios.put(`${dbURL}/${id}`,atributos)
    return request.then(response=>response.data)
}    


export default {
    datos_bd,agregar,eliminar,actualizar
}

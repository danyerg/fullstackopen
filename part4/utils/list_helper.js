const dummy=()=>{
    return 1
}

//funcion que cuenta los likes de cada objeto
const total_likes=(blogs)=>{

    //suma los elementos especificos de un array (inicializa en 0)
    const result=blogs.reduce((suma,elemento)=>suma+elemento.likes,0)
    return result
}

//funcion para saber el blog con mas like
const blog_favorito=(blogs)=>{
    const result=blogs.reduce(
        //funcion interna del reduce (se sale al recorrer todos los objetos)
        (actual,elementos)=>{

        //compara likes
        if(elementos.likes>actual.likes){
            
            //guarda el blog (individual) con mas likes
            actual=elementos
        }

        //devuelve el acumulador al reduce para la siguiente vuelta (actual)
        return actual

    },blogs[0])

    //devuelve el blog con mas elementos
    return result
}

//funcion para saber cuanos blog tiene un author
const contar_blog=(blogs)=>{
    
    const conteo={}

    for(let i=0;i<blogs.length;i++){
        const author=blogs[i].author

        //le pasa la clave autor ( si esta sun valo no pasa)
        if(conteo[author]){
            
            //le suma 1 a la clave
            conteo[author]=conteo[author]+1

        }
        else{
            
        //le da el valor inicial a todas las nuevas claves vacias
        conteo[author]=1
        }

    }

     let max_autor=''
    let max_cantidad=0

    Object.entries(conteo).forEach(([autor,cantidad])=>{
        if(cantidad>max_cantidad){
            max_autor=autor
            max_cantidad=cantidad
        }
    })

    return {author:max_autor,blogs:max_cantidad}
}
module.exports={dummy,total_likes,blog_favorito,contar_blog}
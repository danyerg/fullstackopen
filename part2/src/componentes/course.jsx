const Course=({course})=>{
  
  const suma=course.parts.reduce((caja_suma,dato_actual)=>{
    return caja_suma+dato_actual.exercises
  },0)
  
console.log(course.parts)
console.log(suma)
  return(
  <div>
    <h1>{course.name}</h1>

  <ul>
    {course.parts.map(
      parte=><Datos 
      key={parte.id} 
      nombre={parte.name}
      nmr_ejercicio={parte.exercises}
      ></Datos>)}
  </ul>
  <p>total de la suma de los ejercicios {suma}</p>
  
  </div>
  )}

  const Datos=({nombre,nmr_ejercicio})=>{
    return(
      <li>{nombre} {nmr_ejercicio}</li>
    )
  }

  export default Course
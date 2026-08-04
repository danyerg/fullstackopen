import {useState} from 'react'

const Header=(props)=>{
  return(
    <div>
      <h1>{props.course.name}</h1>
    </div>

  )
}

const Parte=(props)=>{
  return(
    <div>{props.part} {props.exercises}</div>
  )
}

const Content=(props)=>{
  return(
    <div>
      <Parte part={props.course.parts[0].part} exercises={props.course.parts[0].ejercicio} />
      <Parte  part={props.course.parts[1].part} exercises={props.course.parts[1].ejercicio}/> 
      <Parte part={props.course.parts[2].part} exercises={props.course.parts[2].ejercicio}/>
    </div>
  )
}

const Total=(props)=>{
  return(
  <div>
    <p>{props.course.parts[0].ejercicio+props.course.parts[1].ejercicio+props.course.parts[2].ejercicio}</p>
    
  </div>
  )
}

const App = () => {

  const course={
  name:'Half Stack application development',  
  
  parts:[
  {part:'Fundamentals of React',ejercicio:10},
  {part:'Using props to pass data',ejercicio:2},
  {part:'State of a component',ejercicio:14}
  ]

}

  return (
    <div>
      <Header course={course} />
      <Content course={course}/>
      <Total course={course} />
    </div>
  )
}

const nombre=["ana","maria"]

const saludo=nombre.map(x=>`<li>${x+"hola"}</li>`)
console.log(saludo)

export default App
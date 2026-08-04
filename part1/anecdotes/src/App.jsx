import { useState } from 'react'

const Button=({text,onClick})=>{
    return(
    <button onClick={onClick}>{text}</button>
 )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const[pos,actualizar_pos]=useState(0)
  const[votos,actualizar_votos]=useState(Array(8).fill(0))

  const pocicion_voto_anecdota=()=>{
    const nueva= Math.floor(Math.random() * anecdotes.length)
    actualizar_pos(nueva)
  }

  const votar_anecdota=()=>{
    const copia =[...votos]
    copia[pos]=copia[pos]+1
    actualizar_votos(copia)
  }

  // Busca el índice de la anécdota con la mayor cantidad de votos (1.14)
  const masVotada = votos.indexOf(Math.max(...votos))

  return(
    <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[pos]}</p>
        <p>tiene {votos[pos]} votos</p>
        <Button onClick={votar_anecdota} text={"votar"}></Button>
        <Button onClick={pocicion_voto_anecdota} text={"cambiar"}></Button>

        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[masVotada]}</p>
        <p>tiene {votos[masVotada]} votos</p>
    </div> 
  )

}

export default App
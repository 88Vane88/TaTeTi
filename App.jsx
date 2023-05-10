import './App.css'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import {Square} from './components/Square'
import { TURNS} from './constants'
import { checkWinner } from './logic/board'
import { Winner } from './components/Winner'
import { checkEndGame } from './logic/checkEndGame'


function App() {

const [board, setBoard]= useState(()=>{
  //se renderiza una sola vez
  const boardFromStorage=window.localStorage.getItem('board') //recupero el board del storage
  return boardFromStorage //si hay storage
  ? JSON.parse(boardFromStorage) //agarra valor inicial del estado
  : Array(9).fill(null) // y sino devuelvo esto por defecto
})
    
const [turn, setTurn]=useState(()=>{
  const turnFromStorage=window.localStorage.getItem('turn') //recupero el turn del storage
  return turnFromStorage ?? TURNS.X // si es null o undefined utilizo por defecto x
}) // PARA SABER TURNO. EMPIEZA X

const [winner, setWinner]=useState(null) //null no hay ganador


const resetGame=()=>{
  setBoard(Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)

//reseteamos esto sino queda todo guardado
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}

const updateBoard=(index)=>{
//no actualizamos esta posición si ya tiene algo o si hay un ganador
  if(board[index] || winner) return 
// actualizar el tablero
  const newBoard=[...board]
  newBoard[index]=turn /* se guarda x u o */
  setBoard(newBoard)
//cambiar el turno
  const newTurn=turn === TURNS.X ? TURNS.O : TURNS.X /* si x ya jugó, juega o u viceversa */
  setTurn(newTurn)/* cada vez que se actualiza estado le paso newTurn */
//guardar partida
window.localStorage.setItem('board', JSON.stringify(newBoard))
window.localStorage.setItem('turn',newTurn)
//revisar si hay ganador
  const newWinner=checkWinner(newBoard)
  if(newWinner){
    confetti()
    setWinner(newWinner)
  } else if (checkEndGame(newBoard)){
    setWinner(false) //empate
  }
}

  return (
      <main className='board'>
        <h1> JUEGO: TRES EN RAYA </h1>
        <button onClick={resetGame}> Reset </button>
        <section className='game'>
          {
            board.map((square, index)=>{
             return(
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
                >
                  {square}
                </Square>
            )}
          )}
        </section>
        <section className='turn'>
          <Square isSelected={turn=== TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn=== TURNS.O}>{TURNS.O}</Square>
        </section>
        
        <Winner resetGame={resetGame} winner={winner}/>

      </main>

  )
}

export default App

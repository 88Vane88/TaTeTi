import { WINNER_COMBOS } from "../constants"


export const checkWinner = (boardToCheck)=>{
  /* revisamos todas las combinaciones ganadoras */
    for (const combo of WINNER_COMBOS){ /* para cada combinación */
      const [a, b, c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    return null /* no hay ganador */
  }
  
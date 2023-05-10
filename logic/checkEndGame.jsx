export const checkEndGame=(newBoard)=>{
  //revisamos si hay empate si no hay mas espacios vacíos
  return newBoard.every((square)=>square !== null)
}
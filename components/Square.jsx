export const Square=({children /* si queremos mostrar x/o */,isSelected,  updateBoard, index})=> {
  const className=`square ${isSelected ? 'is-selected' : ''}`
  
  /* cuando usuario hace click en div cambia */
  const handleClick=()=>{
  updateBoard(index) /* index-->para saber donde apreto usuario */
}

  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

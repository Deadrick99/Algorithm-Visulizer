import React, { useState } from "react";
import { useEffect } from "react";
import "./Node.css";
 function Node(props)  {
   const [isFinish,setIsFinish] = useState(false); 
   const [isStart,setIsStart] = useState(false); 
   const [isWall,setIsWall] = useState(false); 
    const {
      row,
      col,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      onClick,
    } = props;
    useEffect(() =>{
      setIsFinish(props.isFinish);
      setIsStart(props.isStart);
      setIsWall(props.isWall);
    },[props,isWall])
    return (
      <div
        id={`node-${props.row}-${props.col}`}
        className={isStart ? 'node node-start':isFinish?'node node-finish' : isWall ?'node node-wall' : 'node '}
        onMouseDown={() =>onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        onClick ={()=> onClick(row,col)}
//
        >
  </div>
    );
  }

export default Node;

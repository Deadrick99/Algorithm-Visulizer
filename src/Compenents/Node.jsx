import React from "react";


import "./Node.css";

 function Node({node,onClick,onMouseDown,onMouseEnter,onMouseUp})  {
   
      const row = node.row;
      const col= node.col;
      const isVisitedAnim= node.isVisitedAnim;
      const isShortest= node.isShortest;
      const isWall= node.isWall;
      const isStart= node.isStart;
      const isFinish= node.isFinish;
      const isFastVisited= node.isFastVisited;
      const isFastShortest= node.isFastShortest;


      return(
      <div
        id={`node-${row}-${col}`}
        className={isStart ? 'node node-start':isFinish?'node node-finish' : isWall ?'node node-wall' : isShortest? "node node-shortest-path" :isVisitedAnim? "node node-visited": isFastVisited?"node node-fast-visited": isFastShortest?"node node-fast-shortest": 'node '}
        onMouseDown={() =>onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        onClick ={()=> onClick(row,col)}
        >
  </div>
    );

  }


export default Node;

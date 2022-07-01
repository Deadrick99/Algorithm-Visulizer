import React, { useState } from "react";
import { getNodesInShortestPathOrder } from "../Algorithms/dijkstra";
import{setFinish} from "./Node";
import "./Algo.css";
import Node from "./Node";
import dijkstra from "../Algorithms/dijkstra";
import Header from "./Header";
import {FaPlay} from "react-icons/fa";
var startNodeCol = 15;
var startNodeRow= 10;
var finalNodeCol = 35;
var finalNodeRow = 10;
var nodeType = "";

export default function Algo()  {
  const [grid, setGrid] = useState(initGrid);
  const [mouseIsPressed,setMouseIsPressed] = useState(false);
    return (
      <div className="body">
      <Header className = "Header" onClick={(type,typeVal)=>handleHeaderClick(type,typeVal)}></Header> 
        <div className="grid">         
          {Array.from(grid).map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="row">
                {row.map((node, nodeIdx) => {
                  const { isStart, isFinish, row, col, isWall } = node;
                    return(
                    <Node
                      key={nodeIdx}
                      col={col}
                      row={row}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => handleMouseEnter(row, col, mouseIsPressed)}
                      onMouseUp={() => handleMouseUp()}
                      onClick = {(row,col) => handleGridClick(row,col)}
                    ></Node>
                    )
                  
                })}
                
              </div>
              
            );
          })}
           <button className="startButton" onClick={() => visualizeDijkstra()}>
          <FaPlay size="1rem" align-self="center" />
        </button>
        </div>
       
        </div>
    );
  

  function handleMouseDown(row, col) {
 
      const newGrid = getNewGrid(grid, row, col);
       console.log("up")
        setGrid(newGrid);
        setMouseIsPressed(true);
    }
 
  
  function handleMouseEnter(row, col,mouseIsPressed) {
     if (!mouseIsPressed) {
     return;}
       const newGrid = getNewGrid(grid, row, col);
       setGrid(newGrid);
    }
  function handleMouseUp() {
    setMouseIsPressed(false);
  }
  function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    console.log(visitedNodesInOrder,nodesInShortestPathOrder)
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);

        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);

    }
  }
  function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 25 * i);
    }
  }
  function visualizeDijkstra() {
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finalNodeRow][finalNodeCol];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    console.log(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    console.log(nodesInShortestPathOrder);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  function handleHeaderClick(type,typeVal){
    if(type === "ALGORITHM"){

    }
    else if(type === "NODE"){
      if(typeVal ==="WALL"){
        if (nodeType=== "")
        nodeType = typeVal;
        else
        nodeType="";
      }
      else if(typeVal ==="START"){
        if (nodeType=== "")
        nodeType = typeVal;
        else
        nodeType="";
      }
      else if(typeVal ==="FINISH"){
        if (nodeType=== "")
        nodeType = typeVal;
        else
        nodeType="";
      }
    }

  }
  function handleGridClick(row,col){

   if((grid[row][col].isStart !== true || grid[row][col].isFinish !== true) && nodeType === "START"){
      const newGrid = getNewGrid(grid, row, col);
      setGrid(newGrid);
    }
    if((grid[row][col].isFinish !== true || grid[row][col].isStart !== true) && nodeType === "FINISH"){
      const newGrid = getNewGrid(grid, row, col);
      setGrid(newGrid);
    }

}

function initGrid() {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const nodesRow = [];
    for (let col = 0; col < 50; col++) {
      nodesRow.push(createNode(col, row));
    }
    grid.push(nodesRow);
  }
  return grid;
};
function createNode  (col, row) {
  const flase =false;
  return {
    col,
    row,
    isStart: row === startNodeRow && col === startNodeCol,
    isFinish: row === finalNodeRow && col === finalNodeCol,
    distance: Infinity,
    isVisited: false,
    isWall: false,

    previousNode: null,
  };
};

 function getNewGrid  (grid, row, col) {
  var newGrid = grid.slice();
  var node = newGrid[row][col];
 if(nodeType==="WALL" && node.isWall === true){
   node.isWall =false;
   
}
 else if(nodeType==="WALL"&&(node.isStart !== true|| node.isFinish !== true))
 {
    console.log("wall")
    node.isWall = true;
 }

   else if(nodeType==="FINISH"){
    if(finalNodeCol !== col || finalNodeRow !== row){
      newGrid[finalNodeRow][finalNodeCol].isFinish=false;
      node.isFinish=true;
  finalNodeCol = col;
  finalNodeRow = row;
}
}
   else if(nodeType==="START"){
   if(startNodeCol !== col || startNodeRow !== row){
      newGrid[startNodeRow][startNodeCol].isStart=false;
    node.isStart =true;
  startNodeCol = col;
  startNodeRow = row;
}
   }

  newGrid[row][col] = node;
  return newGrid;
};
}
//TODO: figure out grid shit

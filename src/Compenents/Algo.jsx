import React, { useState } from "react";
import { getNodesInShortestPathOrder } from "../Algorithms/dijkstra";
import "./Algo.css";
import Node from "./Node";
import dijkstra from "../Algorithms/dijkstra";
import Header from "../Header/Header";
import RecursiveDivision from "../Algorithms/RecursiveDivision";

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
                  //const { isStart, isFinish, row, col, isWall, isShortest,isVisitedAnim } = node;
                    return(
                     <Node key= {nodeIdx} node = {node} 
                      onMouseDown ={(row, col) => handleMouseDown(row, col)}
                      onMouseEnter ={(row, col) => handleMouseEnter(row, col,mouseIsPressed)}
                      onMouseUp={() => handleMouseUp()}
                      onClick = {(row,col) => handleGridClick(row,col)}></Node>
                    )

                    
                  
                })}
                
              </div>
              
            );
          })}
           <button className="startButton" onClick={() => visualizeDijkstra()}>
          Start
        </button>
        <button onClick={()=>visualizeRecursiveDivisionMaze()}>click</button>
        </div>
        </div>
    );
  
  function visualizeRecursiveDivisionMaze(){
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finalNodeRow][finalNodeCol];
    const visitedNodesInOrder = RecursiveDivision(grid, startNode, finishNode);
    animateMaze(visitedNodesInOrder);
  }     
  function animateMaze(visitedNodesInOrder){
    for (let i =0; i<visitedNodesInOrder.length; i++){
        setTimeout(()=>{
          if(grid[visitedNodesInOrder[i].row][visitedNodesInOrder[i].col].isStart === false && grid[visitedNodesInOrder[i].row][visitedNodesInOrder[i].col].isFinish===false){
          grid[visitedNodesInOrder[i].row][visitedNodesInOrder[i].col].isWall =true;
          }
          else{
            console.log("hi")
          }
          const newGrid = grid.slice();
          setGrid(newGrid);
        },25*i)
    }
  }     
  function handleMouseDown(row, col) {
 
      const newGrid = getNewGrid(grid, row, col);
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
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);

        return;
      }
      setTimeout(() => {
        grid[visitedNodesInOrder[i].row][visitedNodesInOrder[i].col].isVisitedAnim =true;
        grid[visitedNodesInOrder[i].row][visitedNodesInOrder[i].col].isStart =false;
        grid[visitedNodesInOrder[i].row][visitedNodesInOrder[i].col].isFinish =false
        const newGrid = grid.slice();
        setGrid(newGrid);
      }, 10 * i);

    }
  }
  function animateShortestPath(nodesInShortestPathOrder) {
    console.log(nodesInShortestPathOrder);
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        grid[nodesInShortestPathOrder[i].row][nodesInShortestPathOrder[i].col].isShortest =true;
        grid[nodesInShortestPathOrder[i].row][nodesInShortestPathOrder[i].col].isStart =false;
        grid[nodesInShortestPathOrder[i].row][nodesInShortestPathOrder[i].col].isFinish =false
        const newGrid = grid.slice();
        setGrid(newGrid);
      }, 10 * i);
    }
  }
  function visualizeDijkstra() {
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finalNodeRow][finalNodeCol];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  function handleHeaderClick(type,typeVal){
    if(type === "ALGORITHM"){

    }
    else if(type === "NODE"){
      nodeType = typeVal;
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
  const node = {
       col,
       row,
       isStart:row === startNodeRow && col === startNodeCol,
       isFinish:row === finalNodeRow && col === finalNodeCol,
       isWall:false,
       isShortest: false,
       isVisitedAnim : false,
       previousNode:null,
       distance: Infinity,
 }
  return (node);
  
};

 function getNewGrid (grid, row, col)  {
  
  var newGrid = [...grid];
  var node = newGrid[row][col];

  if(nodeType==="WALL" && node.isWall === true){
    node.isWall =false;
 }
else if(nodeType==="WALL"&&(node.isStart !== true|| node.isFinish !== true))
  {
     node.isWall = true;
  }
    else if(nodeType==="FINISH"){
     if((finalNodeCol !== col || finalNodeRow !== row) && node.isWall=== false){
      newGrid[finalNodeRow][finalNodeCol].isFinish=false;
      node.isFinish=true;
   finalNodeCol = col;
   finalNodeRow = row;
 }
 }
   if(nodeType==="START"){
   if((startNodeCol !== col || startNodeRow !== row) && node.isWall=== false){

    newGrid[startNodeRow][startNodeCol].isStart =!newGrid[startNodeRow][startNodeCol].isStart;
    node.isStart= !node.isStart;
  startNodeCol = col;
  startNodeRow = row;
}
    
   }

  newGrid[row][col] = node;
  return newGrid;
};
}
//TODO: figure out grid shit

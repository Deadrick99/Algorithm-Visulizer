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
var algoran =false;
var fast=false;

export default function Algo()  {
  const [grid, setGrid] = useState(initGrid);
  const [mouseIsPressed,setMouseIsPressed] = useState(false);
 // const [mazeType, setMazeType] = useState('');
 // const [algoType, setAlgoType] = useState('');
  const [nodeType, setNodeType] = useState('');

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
          {/* <button className="startButton" onClick={() => startHit()}>
          Start
          </button> */}
        </div>
        </div>
    );
    //function to run program whith selected algo and maze type.
    
 
     function visualizeRecursiveDivisionMaze(){
      console.log("visuale recursion");
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finalNodeRow][finalNodeCol];
    const visitedNodesInOrder = RecursiveDivision(grid, startNode, finishNode);
    
    animateMaze(visitedNodesInOrder);
    
  }     
    function animateMaze(visitedNodesInOrder){
      console.log("animate maze");
    for (let i =0; i<visitedNodesInOrder.length; i++){
        setTimeout(()=>{
          if(grid[visitedNodesInOrder[i].row][visitedNodesInOrder[i].col].isStart === false && grid[visitedNodesInOrder[i].row][visitedNodesInOrder[i].col].isFinish===false){
          grid[visitedNodesInOrder[i].row][visitedNodesInOrder[i].col].isWall =true;
          }
          else{
          }
          const newGrid = grid.slice();
          setGrid(newGrid);
        },25*i)
    }
  }     
  function handleMouseDown(row, col) {
      console.log("handle mouse down");
      const newGrid = getNewGrid(grid, row, col);
        setGrid(newGrid);
        setMouseIsPressed(true);
    }
 
  
  function handleMouseEnter(row, col,mouseIsPressed) {
    console.log("handle mouse enter");
     if (!mouseIsPressed) {
     return;}
       const newGrid = getNewGrid(grid, row, col);
       setGrid(newGrid);
    }
  function handleMouseUp() {
    console.log("handle Mouse up");
    setMouseIsPressed(false);
  }
  function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
  console.log("Aniumate Dijkstar");
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
       
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);

        return;
      }
      setTimeout(() => {
       
        grid[visitedNodesInOrder[i].row][visitedNodesInOrder[i].col].isVisitedAnim =true;
        const newGrid = grid.slice();
        setGrid(newGrid);
      }, 10 * i);
      
      const newGrid = grid.slice();
      setGrid(newGrid);
    }
  }
  function animateShortestPath(nodesInShortestPathOrder) {
  
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        grid[nodesInShortestPathOrder[i].row][nodesInShortestPathOrder[i].col].isShortest =true;
        const newGrid = grid.slice();
        setGrid(newGrid);
      }, 10 * i);
    }
    const newGrid = grid.slice();
    setGrid(newGrid);
  }
  function fastAnimate(visitedNodesInOrder, nodesInShortestPathOrder){
      for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {

          fastAnimateShortestPath(nodesInShortestPathOrder);
        return;
      }
 
        grid[visitedNodesInOrder[i].row][visitedNodesInOrder[i].col].isFastVisited =true;
        var newGrid = grid.slice();
        setGrid(newGrid);      
    }
  }
   function fastAnimateShortestPath(nodesInShortestPathOrder) {
    
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      console.log("for")
      grid[nodesInShortestPathOrder[i].row][nodesInShortestPathOrder[i].col].isFastVisited =false;
        grid[nodesInShortestPathOrder[i].row][nodesInShortestPathOrder[i].col].isFastShortest =true;
        var newGrid = grid.slice();
        setGrid(newGrid);
    }
  }
  function visualizeDijkstra() {
    console.log("Visualize Dijkstra");
    algoran = true;
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finalNodeRow][finalNodeCol];
    var visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    if(fast){
    fastAnimate(visitedNodesInOrder, nodesInShortestPathOrder);
    }
    else
    {
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }
    fast = true;
  }
  function handleHeaderClick(type,typeVal){
    console.log("HandleHEaderClick");
    if(type === "ALGORITHM"){
      //setAlgoType(typeVal);
      if (typeVal ==="DIJKSTRA")
      {
        visualizeDijkstra();
        
      }
    }
    else if(type === "NODE"){
      setNodeType(typeVal);
    }
    else if(type ==="Maze"){
     // setMazeType(typeVal);
      if(typeVal === "Recursive Division")
      {
        visualizeRecursiveDivisionMaze();
      }
    }
    else if (type==="CLEAR")
    {
      clearBoard();
      algoran = false;
      fast =false;
    }
      

  }
  function handleGridClick(row,col){
    console.log("handleGridClick");

   if((grid[row][col].isStart !== true || grid[row][col].isFinish !== true) && nodeType === "START"){
      const newGrid = getNewGrid(grid, row, col);
      setGrid(newGrid);
    }
    if((grid[row][col].isFinish !== true || grid[row][col].isStart !== true) && nodeType === "FINISH"){
      const newGrid = getNewGrid(grid, row, col);
      
      setGrid(newGrid);
     
    }

}
function clearBoardNoWalls(){
  console.log("clearboardnowwalls");
 for(let i = 0; i< 20;i++){
 for (let j = 0 ; j<50 ;j++){
 

 grid[i][j].isVisitedAnim =false;
 grid[i][j].isShortest =false;
 grid[i][j].isVisited = false;
 grid[i][j].distance = Infinity;
 grid[i][j].previousNode = null;
 grid[i][j].isFastVisited =false;
 grid[i][j].isFastShortest = false;

  }
 }

 const newGrid = grid.slice();
 setGrid(newGrid);
}
function clearBoard(){
const newGrid = initGrid();
 setGrid(newGrid);
}

function initGrid() {
  console.log("InitGrid");
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
  console.log("createNode");
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
       isFastVisited :false,
       isFastShortest: false,
 }
  return (node);
  
};

 function getNewGrid (grid, row, col)  {
  console.log("getNewGrid");
  var newGrid = [...grid];
  var node = newGrid[row][col];

  if(nodeType==="WALL" && node.isWall === true){
    node.isWall =false;
     if(algoran===true)
      {
        clearBoardNoWalls()
        visualizeDijkstra()
      }
 }
else if(nodeType==="WALL"&&(node.isStart !== true|| node.isFinish !== true))
  {
     node.isWall = true;
      if(algoran===true)
      {
        clearBoardNoWalls()
        visualizeDijkstra()
      }
  }
    else if(nodeType==="FINISH"){
     if((finalNodeCol !== col || finalNodeRow !== row) && node.isWall=== false){
      newGrid[finalNodeRow][finalNodeCol].isFinish=false;
      node.isFinish=true;
      finalNodeCol = col;
      finalNodeRow = row;
       if(algoran===true)
      {
        clearBoardNoWalls()
        visualizeDijkstra()
      }
      }
 }
   else if(nodeType==="START"){
   if((startNodeCol !== col || startNodeRow !== row) && node.isWall=== false){

    newGrid[startNodeRow][startNodeCol].isStart = false;
    node.isStart= true;
  startNodeCol = col;
  startNodeRow = row;
   if(algoran===true)
      {
        clearBoardNoWalls()
        visualizeDijkstra()
      }
}
    
   }

  newGrid[row][col] = node;
  return newGrid;
};
}
//TODO: figure out grid shit

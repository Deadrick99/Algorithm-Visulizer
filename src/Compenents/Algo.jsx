import React, { Component } from "react";
import { getNodesInShortestPathOrder } from "../Algorithms/dijkstra";
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

export default class Algo extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }
  componentDidMount() {
    const grid = initGrid();
    this.setState({ grid });
  }
  handleMouseDown(row, col) {
 
    //if node is a start or finish node dont set = to is wall
    if(this.state.grid[row][col].isStart === true || this.state.grid[row][col].isFinish === true|| nodeType !== "WALL" ){
    }
    else{
     const newGrid = getNewGrid(this.state.grid, row, col);
      // if node is a node is a wall set classname back to node to change background color 
    if(document.getElementById(`node-${newGrid[row][col].row}-${newGrid[row][col].col}`).className ===
    "node node-wall")
    {
      document.getElementById(`node-${newGrid[row][col].row}-${newGrid[row][col].col}`).className =
    "node ";
    }
    //else node is normal node change class name to node-wall to change background color
    else{
    document.getElementById(`node-${newGrid[row][col].row}-${newGrid[row][col].col}`).className =
    "node node-wall";
    }
       this.setState({ grid: newGrid, mouseIsPressed: true });
    }
 
  }
  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;

    if(this.state.grid[row][col].isStart === true || this.state.grid[row][col].isFinish === true || nodeType !== "WALL"){

    }
    else{
      const newGrid = getNewGrid(this.state.grid, row, col);
      if(document.getElementById(`node-${newGrid[row][col].row}-${newGrid[row][col].col}`).className ===
      "node node-wall")
      {
        document.getElementById(`node-${newGrid[row][col].row}-${newGrid[row][col].col}`).className =
      "node ";
      }
      else
      {
      document.getElementById(`node-${newGrid[row][col].row}-${newGrid[row][col].col}`).className =
      "node node-wall";
      }
      this.setState({ grid: newGrid });
    }
  }
  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }
  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    console.log(visitedNodesInOrder,nodesInShortestPathOrder)
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
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
  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 25 * i);
    }
  }
  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finalNodeRow][finalNodeCol];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    console.log(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    console.log(nodesInShortestPathOrder);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  handleHeaderClick(type,typeVal){
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
  handleGridClick(row,col){
    console.log("click");
   if(this.state.grid[row][col].isStart === true || this.state.grid[row][col].isFinish === true || nodeType !== "START"){

    }
    else{
      console.log("start");
      const newGrid = getNewGrid(this.state.grid, row, col);
      if(document.getElementById(`node-${newGrid[row][col].row}-${newGrid[row][col].col}`).className ===
      "node node-start")
      {
        document.getElementById(`node-${newGrid[row][col].row}-${newGrid[row][col].col}`).className =
      "node ";
      }
      else
      {
      document.getElementById(`node-${newGrid[row][col].row}-${newGrid[row][col].col}`).className =
      "node node-start";
      }
      this.setState({ grid: newGrid });
    }
    if(this.state.grid[row][col].isStart === true || this.state.grid[row][col].isFinish === true || nodeType !== "FINISH"){

    }
    else{
      console.log("finish");
      const newGrid = getNewGrid(this.state.grid, row, col);
      if(document.getElementById(`node-${newGrid[row][col].row}-${newGrid[row][col].col}`).className ===
      "node node-finish")
      {
        document.getElementById(`node-${newGrid[row][col].row}-${newGrid[row][col].col}`).className =
      "node ";
      }
      else
      {
      document.getElementById(`node-${newGrid[row][col].row}-${newGrid[row][col].col}`).className =
      "node node-finish";
      }

      this.setState({ grid: newGrid });
    }
  }
  
  render() {

    const { grid, mouseIsPressed } = this.state;
    return (
      <div>
      <Header className = "Header" onClick={(type,typeVal)=>this.handleHeaderClick(type,typeVal)}></Header>
        <div>
         <button className="startButton" onClick={() => this.visualizeDijkstra()}>
          <FaPlay/>
        </button>
        </div>
      
        
        <div className="grid">
         
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="row">
                {row.map((node, nodeIdx) => {
                  const { isStart, isFinish, row, col, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      row={row}
                      isStart={isStart}
                      isFinish={isFinish}
                      iswall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      onClick = {(row,col) => this.handleGridClick(row,col)}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
const initGrid = () => {
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
const createNode = (col, row) => {

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

const getNewGrid = (grid, row, col) => {
  var newGrid = grid.slice();
  var node = newGrid[row][col];
   console.log(newGrid);
 if(nodeType==="WALL"){
    node = {
    ...node,
    isWall: !node.isWall,
  };
}
   else if(nodeType==="FINISH"){
    if(finalNodeCol !== col && finalNodeRow !== row){
      newGrid[finalNodeRow][finalNodeCol].isFinish =false;
    node = {
    ...node,
    isFinsih: !node.isFinish,
  };
  
  finalNodeCol = col;
  finalNodeRow = row;
}
}
   else if(nodeType==="START"){
   if(startNodeCol !== col && startNodeRow !== row){
      newGrid[startNodeRow][startNodeCol].isStart=false;
    node = {
    ...node,
    isStart: !node.isStart,
  };
  
  startNodeCol = col;
  startNodeRow = row;
}
   }

  newGrid[row][col] = node;
    console.log(newGrid,finalNodeCol,finalNodeRow);
  return newGrid;
};

//TODO: figure out grid shit

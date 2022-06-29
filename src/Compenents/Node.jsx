import React, { Component } from "react";
import "./Node.css";
export default class Node extends Component {
  render() {
    const {
         row,
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      onClick,
    } = this.props;
    var extraClassName = "";
    if(isWall===true)
    extraClassName = "node-wall";
    else if (isFinish === true)
    extraClassName = "node-finish";
    else if(isStart === true)
    extraClassName = "node-start";
   
    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        onClick ={()=> onClick(row,col)}
        >
  </div>
    );
  }
}

import React, { Component } from "react";
import classes from "./Header.module.css";
import styles from "./Header.module.css";
import{GiHamburgerMenu} from "react-icons/gi";
import{BiUpArrow} from "react-icons/bi";
import{BiDownArrow} from "react-icons/bi";
export default class Header extends Component {
  render() {
    return (
      <div className={classes.Header}>
        <nav >
          <ul className={classes.HeaderItems}>
            <li className={classes.HeaderAlgo}>
              Algo Visualizer 
            </li>
            <li className={classes.HeaderAlgorithms}>
              <div id="AlgoArrowUp"  className={styles.algohide} onClick={handleHeaderAlgoClick}><BiUpArrow /></div><div id="AlgoArrowDown" className={styles.algoshow} onClick={handleHeaderAlgoClick}><BiDownArrow/></div>Algorithms 
              <ul className={styles.AlgorithmItems} id ="algorithmItems">
                  <li onClick={() => this.props.onClick("ALGORITHM", "DIJKSTRA")}>Dijkstra</li>
              </ul>
            </li>
            <li className={classes.HeaderNodes}>
              <div id="NodeArrowUp"  className={styles.nodehide} onClick={handleHeaderNodeClick}><BiUpArrow /></div><div id="NodeArrowDown" className={styles.nodeshow} onClick={handleHeaderNodeClick}><BiDownArrow/></div>Node Types
              <ul className={classes.NodeItems} id ="nodeItems">
                  <li  onClick={() => this.props.onClick("NODE", "START")} >Start</li>
                  <li  onClick={() => this.props.onClick("NODE", "FINISH")} >Finish</li>
                  <li onClick={() => this.props.onClick("NODE", "WALL")} >Wall</li>

                </ul>
            </li>
            <li className={classes.HeaderHelp}>
              Help
            </li>
            <li className={classes.HeaderIcon}>
              <GiHamburgerMenu/>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
function handleHeaderAlgoClick(){
  var upArrow = document.getElementById("AlgoArrowUp");
  var downArrow = document.getElementById("AlgoArrowDown");
  var items =document.getElementById("algorithmItems");
  console.log(items);
  if(upArrow.className === styles.algohide){
    upArrow.className=styles.algoshow;
    downArrow.className=styles.algohide;
    items.className=styles.AlgorithmItemsshow;
  }
  else{
    upArrow.className=styles.algohide;
    downArrow.className=styles.algoshow;
        items.className=styles.AlgorithmItems;
  }
}
function handleHeaderNodeClick(){
  var upArrow = document.getElementById("NodeArrowUp");
  var downArrow = document.getElementById("NodeArrowDown");
  var items =document.getElementById("nodeItems");
  console.log(items);
  if(upArrow.className === styles.nodehide){
    upArrow.className=styles.nodeshow;
    downArrow.className=styles.nodehide;
    items.className=styles.NodeItemsshow;
  }
  else{
    upArrow.className=styles.nodehide;
    downArrow.className=styles.nodeshow;
        items.className=styles.NodeItems;
  }
}


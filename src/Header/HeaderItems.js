import classes from "./Header.module.css";
import { BiUpArrow } from "react-icons/bi";
import { BiDownArrow } from "react-icons/bi";
import { useState } from "react";
const HeaderItems = (props) => {
  const [isAlgoUp, setIsAlgoUp] = useState(false);
  const [isNodeUp, setIsNodeUp] = useState(false);
  const [isMazeUp, setIsMazeUp] = useState(false);
  const onClick = props.onClick;

  const handleAlgoHeaderClick = () => {
    if (isAlgoUp === false) {
      setIsAlgoUp(true);
      setIsNodeUp(false);
      setIsMazeUp(false);
    } else {
      setIsAlgoUp(false);
    }
  };
  const handleNodeHeaderClick = () => {
    if (isNodeUp === false) {
      setIsNodeUp(true);
      setIsAlgoUp(false);
      setIsMazeUp(false);
    } else {
      setIsNodeUp(false);
    }
  };
  const handleMazeHeaderClick = () => {
    if (isMazeUp === false) {
      setIsMazeUp(true);
      setIsAlgoUp(false);
      setIsNodeUp(false);
    } else {
      setIsMazeUp(false);
    }
  };

  return (
    <ul className={classes.HeaderItems}>
      <li className={classes.HeaderAlgo}>Algo Visualizer</li>
      <li className={classes.HeaderAlgorithms}>
        <div
          className={isAlgoUp ? `${classes.algoshow}` : `${classes.algohide}`}
          onClick={() => handleAlgoHeaderClick()}
        >
          <BiUpArrow />
        </div>
        <div
          className={isAlgoUp ? `${classes.algohide}` : `${classes.algoshow}`}
          onClick={() => handleAlgoHeaderClick()}
        >
          <BiDownArrow />
        </div>
        Algorithms
        <ul
          className={
            !isAlgoUp
              ? `${classes.AlgorithmItems}`
              : `${classes.AlgorithmItemsshow}`
          }
        >
          <li
            onClick={() => {
              onClick("ALGORITHM", "DIJKSTRA");
              props.isMobile && props.closeMobileNav();
              setIsAlgoUp(false);
            }}
          >
            Dijkstra
          </li>
          <li
            onClick={() => {
              onClick("ALGORITHM", "ASTAR");
              props.isMobile && props.closeMobileNav();
              setIsAlgoUp(false);
            }}
          >
            A*
          </li>
        </ul>
      </li>
      <li className={classes.HeaderMazes}>
        <div
          className={isMazeUp ? `${classes.nodesshow}` : `${classes.nodehide}`}
          onClick={() => handleMazeHeaderClick()}
        >
          <BiUpArrow />
        </div>
        <div
          className={isMazeUp ? `${classes.nodehide}` : `${classes.nodeshow}`}
          onClick={() => handleMazeHeaderClick()}
        >
          <BiDownArrow />
        </div>
        Mazes
        <ul
          className={
            !isMazeUp ? `${classes.MazeItems}` : `${classes.MazeItemsshow}`
          }
        >
          <li
            onClick={() => {
              onClick("Maze", "Recursive Division");
              props.isMobile && props.closeMobileNav();
              setIsMazeUp(false);
            }}
          >
            Recursive Division
          </li>
        </ul>
      </li>
      <li className={classes.HeaderNodes}>
        <div
          className={isNodeUp ? `${classes.nodesshow}` : `${classes.nodehide}`}
          onClick={() => handleNodeHeaderClick()}
        >
          <BiUpArrow />
        </div>
        <div
          className={isNodeUp ? `${classes.nodehide}` : `${classes.nodeshow}`}
          onClick={() => handleNodeHeaderClick()}
        >
          <BiDownArrow />
        </div>
        Nodes
        <ul
          className={
            !isNodeUp ? `${classes.NodeItems}` : `${classes.NodeItemsshow}`
          }
        >
          <li
            onClick={() => {
              onClick("NODE", "START");
              props.isMobile && props.closeMobileNav();
              setIsNodeUp(false);
            }}
          >
            Start
          </li>
          <li
            onClick={() => {
              onClick("NODE", "FINISH");
              props.isMobile && props.closeMobileNav();
              setIsNodeUp(false);
            }}
          >
            Finish
          </li>
          <li
            onClick={() => {
              onClick("NODE", "WALL");
              props.isMobile && props.closeMobileNav();
              setIsNodeUp(false);
            }}
          >
            Wall
          </li>
        </ul>
      </li>
      <li
        className={classes.HeaderClear}
        onClick={() => {
          onClick("CLEAR", "NA");
        }}
      >
        Clear
      </li>
    </ul>
  );
};

export default HeaderItems;

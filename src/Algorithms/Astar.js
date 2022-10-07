import MinHeap from "../Compenents/MinHeap.js";

//takes in a grid of Node objects, the start node and endnode for that grid and returns all the nodes the algorithm visited in order
export default function aStar(grid, startNode, finishNode) {
  console.log("astar");
  const heap = new MinHeap();
  const visitedNodesInOrder = [];
  startNode.startDistance = 0;
  startNode.distance =
    Math.abs(finishNode.row - startNode.row) +
    Math.abs(finishNode.col - startNode.col);
  // to create the min heap the the first position must be null(well it makes the math easier) then we build the heap with the start node
  const nodeArray = [null, startNode];
  heap.buildHeap(nodeArray);
  while (heap.list.length > 1) {
    const closestNode = heap.extractMin();
    console.log(closestNode);
    //if closet node is a wall skip it
    if (closestNode.isWall) continue;
    //push node recently visited onto the return array
    visitedNodesInOrder.push(closestNode);
    // console.log(visitedNodesInOrder.length);
    closestNode.isVisited = true;
    //if we reached the finish node return nodesvisited in order

    if (closestNode.isFinish === true) return visitedNodesInOrder;

    //get neighbors of current node
    updateUnvisitedNieghbors(closestNode, grid, heap, finishNode);
    //if our heap is empty weve exhausted all nodes with out finding the finish node return visited nodes
    if (heap.list.length === 1) {
      return visitedNodesInOrder;
    }
  }
}
// function to get neighbors of closest node  for every neighbor it updates that neighbors distance, .previosNode, and isVisited
// prop then inserts that node in heap of nodes to visit
function updateUnvisitedNieghbors(node, grid, heap, finishNode) {
  //console.log("Dijkstra update unvisited");
  const unvisitedNeighbors = getUnvistedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    if (neighbor.isVisited === true) {
      neighbor.prevDistance = neighbor.distance;
      neighbor.startDistance = node.startDistance + 1;
      neighbor.endDist =
        Math.abs(finishNode.row - neighbor.row) +
        Math.abs(finishNode.col - neighbor.col);
      neighbor.distance = neighbor.startDistance + neighbor.endDist;
      neighbor.previousNode = node;
      if (neighbor.prevDistance >= neighbor.distance) {
        heap.insert(neighbor);
      }
    } else {
      neighbor.startDistance = node.startDistance + 1;
      neighbor.endDist =
        Math.abs(finishNode.row - neighbor.row) +
        Math.abs(finishNode.col - neighbor.col);
      neighbor.distance = neighbor.startDistance + neighbor.endDist;
      neighbor.previousNode = node;

      neighbor.isVisited = true;
      heap.insert(neighbor);
    }
  }
}
// gets neighbors of current node that havnt been visited checks for edges of grid
function getUnvistedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) {
    neighbors.push(grid[row - 1][col]);
  }
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}
//returns an array representing the shortest path by starting at the finish node and pushing the previos node onto the stack until we reach the start node
export function getNodesInShortestPathOrder(finishNode) {
  //console.log("Dijkstra shortest path");
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

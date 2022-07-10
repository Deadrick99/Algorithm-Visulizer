const array = [];
function RecursiveDivision(grid, startNode, finishNode) {
  for (let i = 0; i < grid.length; i++) {
    array.push(grid[i][0]);
    array.push(grid[i][49]);
  }
  for (let i = 0; i < grid[0].length; i++) {
    array.push(grid[0][i]);
    array.push(grid[19][i]);
  }
  Maze(grid, startNode, finishNode, 1, 1, 48, 18, isHorizontal(49, 19));
  return array;
}
function Maze(
  grid,
  startNode,
  finishNode,
  width,
  height,
  widthEnd,
  heightEnd,
  horizontal
) {
  if (widthEnd - width < 3 || heightEnd - height < 3) return;

  //draw walls randomly in vertical direction not to interfere with start or finish node
  if (horizontal) {
    var temp = randomNumber(width, widthEnd);
    var isHole = false;
    function lWall(lWallTemp) {
      console.log("hi");
      if (
        array.find(
          ({ col, row }) => col === lWallTemp - 1 && row === height + 1
        ) === undefined &&
        array.find(
          ({ col, row }) => col === lWallTemp - 1 && row === height
        ) === undefined
      ) {
        console.log("lwall");
        if (
          array.find(
            ({ col, row }) => col === lWallTemp && row === heightEnd + 1
          ) === undefined ||
          array.find(
            ({ col, row }) => col === lWallTemp && row === height - 1
          ) === undefined
        ) {
          isHole = true;
          return false;
        }
        return false;
      }
      return true;
    }
    function rWall(rWallTemp) {
      console.log("hi");
      if (
        array.find(
          ({ col, row }) => col === rWallTemp + 1 && row === height + 1
        ) === undefined &&
        array.find(
          ({ col, row }) => col === rWallTemp + 1 && row === height
        ) === undefined
      ) {
        console.log("rwall");
        if (
          array.find(
            ({ col, row }) => col === rWallTemp && row === heightEnd + 1
          ) === undefined ||
          array.find(
            ({ col, row }) => col === rWallTemp && row === height - 1
          ) === undefined
        ) {
          isHole = true;
          return false;
        }
        return false;
      }
      return true;
    }
    while (
      temp === startNode.col ||
      temp === finishNode.col ||
      lWall(temp) === true ||
      rWall(temp) === true
    ) {
      temp = randomNumber(width, widthEnd);
    }
    var tem = randomNumber(height, heightEnd);

    if (isHole === true) {
      if (
        array.find(({ col, row }) => col === temp && row === heightEnd + 1) ===
        undefined
      ) {
        tem = heightEnd;
      } else {
        tem = height;
      }
    }
    for (let i = height; i <= heightEnd; i++) {
      if (i !== tem) {
        array.push(grid[i][temp]);
      }
    }
    const lWidth = temp + 1;
    const rWidthEnd = temp - 1;
    Maze(
      grid,
      startNode,
      finishNode,
      lWidth,
      height,
      widthEnd,
      heightEnd,
      isHorizontal(widthEnd - lWidth, heightEnd - height)
    );
    Maze(
      grid,
      startNode,
      finishNode,
      width,
      height,
      rWidthEnd,
      heightEnd,
      isHorizontal(rWidthEnd - width, heightEnd - height)
    );
  }
  if (!horizontal) {
    let vtemp = randomNumber(height, heightEnd);
    function tWall(tWallTemp) {
      console.log("hi");
      if (
        array.find(
          ({ col, row }) => col === width + 1 && row === tWallTemp + 1
        ) === undefined &&
        array.find(({ col, row }) => col === width && row === tWallTemp + 1) ===
          undefined
      ) {
        console.log("twall");
        console.log(widthEnd);
        console.log(width);
        console.log(height);
        console.log(heightEnd);
        console.log(tWallTemp);
        if (
          array.find(
            ({ col, row }) => col === widthEnd + 1 && row === tWallTemp
          ) === undefined ||
          array.find(
            ({ col, row }) => col === width - 1 && row === tWallTemp
          ) === undefined
        ) {
          isHole = true;
          return false;
        }
        return false;
      }
      return true;
    }
    function bWall(bWallTemp) {
      console.log(
        array.find(({ col, row }) => col === width + 1 && row === bWallTemp - 1)
      );
      console.log(
        array.find(({ col, row }) => col === width && row === bWallTemp - 1)
      );

      if (
        array.find(
          ({ col, row }) => col === width + 1 && row === bWallTemp - 1
        ) === undefined &&
        array.find(({ col, row }) => col === width && row === bWallTemp - 1) ===
          undefined
      ) {
        console.log("bwall");
        if (
          array.find(
            ({ col, row }) => col === widthEnd + 1 && row === bWallTemp
          ) === undefined ||
          array.find(
            ({ col, row }) => col === width - 1 && row === bWallTemp
          ) === undefined
        ) {
          isHole = true;
          return false;
        }
        return false;
      }
      return true;
    }
    while (
      vtemp === startNode.row ||
      vtemp === finishNode.row ||
      tWall(vtemp) === true ||
      bWall(vtemp) === true
    ) {
      vtemp = randomNumber(height, heightEnd);
    }
    var vtem = randomNumber(width, widthEnd);
    if (isHole === true) {
      if (
        array.find(({ col, row }) => col === widthEnd + 1 && row === vtemp) ===
        undefined
      ) {
        vtem = widthEnd;
      } else {
        vtem = width;
      }
    }
    for (let i = width; i <= widthEnd; i++) {
      if (i !== vtem) {
        array.push(grid[vtemp][i]);
      }
    }
    const bHeightEnd = vtemp - 1;
    const tHeight = vtemp + 1;
    Maze(
      grid,
      startNode,
      finishNode,
      width,
      tHeight,
      widthEnd,
      heightEnd,
      isHorizontal(widthEnd - width, heightEnd - tHeight)
    );

    Maze(
      grid,
      startNode,
      finishNode,
      width,
      height,
      widthEnd,
      bHeightEnd,
      isHorizontal(widthEnd - width, bHeightEnd - height)
    );
  }
}
function isHorizontal(width, height) {
  if (width > height) return true;
  return false;
}
function randomNumber(min, max) {
  var rand = Math.floor(Math.random() * (max - min)) + min;
  console.log(rand);
  return rand;
}
export default RecursiveDivision;

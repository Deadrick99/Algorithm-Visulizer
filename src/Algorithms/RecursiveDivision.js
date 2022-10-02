function RecursiveDivision(grid, startNode, finishNode) {
  const array = [];
  for (let i = 0; i < grid.length; i++) {
    array.push(grid[i][0]);
    array.push(grid[i][49]);
  }
  for (let i = 0; i < grid[0].length; i++) {
    array.push(grid[0][i]);
    array.push(grid[19][i]);
  }
  Maze(grid, startNode, finishNode, 1, 1, 48, 18, isHorizontal(49, 19), array);
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
  horizontal,
  array
) {
  if (widthEnd - width < 2 || heightEnd - height < 2) return;

  //draw walls randomly in vertical direction not to interfere with start or finish node
  if (horizontal) {
    var temp = randomNumber(width, widthEnd);
    var isHole = false;
    function lWall(lWallTemp) {
      if (
        array.find(
          ({ col, row }) => col === lWallTemp - 1 && row === height + 1
        ) === undefined &&
        array.find(
          ({ col, row }) => col === lWallTemp - 1 && row === height
        ) === undefined
      ) {
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
      if (
        array.find(
          ({ col, row }) => col === rWallTemp + 1 && row === height + 1
        ) === undefined &&
        array.find(
          ({ col, row }) => col === rWallTemp + 1 && row === height
        ) === undefined
      ) {
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
    while (lWall(temp) === true || rWall(temp) === true) {
      temp = randomNumber(width, widthEnd);
    }
    var tem = randomNumber(height, heightEnd);
    var tem2 = null;
    if (isHole === true) {
      if (
        array.find(({ col, row }) => col === temp && row === heightEnd + 1) ===
        undefined
      ) {
        tem = heightEnd;
        if (
          array.find(({ col, row }) => col === temp && row === height - 1) ===
          undefined
        ) {
          tem2 = height;
        }
      } else tem = height;
    }
    for (let i = height; i <= heightEnd; i++) {
      if (i !== tem && i !== tem2) {
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
      isHorizontal(widthEnd - lWidth, heightEnd - height),
      array
    );
    Maze(
      grid,
      startNode,
      finishNode,
      width,
      height,
      rWidthEnd,
      heightEnd,
      isHorizontal(rWidthEnd - width, heightEnd - height),
      array
    );
  }
  if (!horizontal) {
    let vtemp = randomNumber(height, heightEnd);
    function tWall(tWallTemp) {
      if (
        array.find(
          ({ col, row }) => col === width + 1 && row === tWallTemp + 1
        ) === undefined &&
        array.find(({ col, row }) => col === width && row === tWallTemp + 1) ===
          undefined
      ) {
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
      if (
        array.find(
          ({ col, row }) => col === width + 1 && row === bWallTemp - 1
        ) === undefined &&
        array.find(({ col, row }) => col === width && row === bWallTemp - 1) ===
          undefined
      ) {
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
    while (tWall(vtemp) === true || bWall(vtemp) === true) {
      vtemp = randomNumber(height, heightEnd);
    }
    var vtem = randomNumber(width, widthEnd);
    var vtem2 = null;
    if (isHole === true) {
      if (
        array.find(({ col, row }) => col === widthEnd + 1 && row === vtemp) ===
        undefined
      ) {
        vtem = widthEnd;
        if (
          array.find(({ col, row }) => col === width - 1 && row === vtemp) ===
          undefined
        ) {
          vtem2 = width;
        }
      } else {
        vtem = width;
      }
    }
    for (let i = width; i <= widthEnd; i++) {
      if (i !== vtem && i !== vtem2) {
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
      isHorizontal(widthEnd - width, heightEnd - tHeight),
      array
    );

    Maze(
      grid,
      startNode,
      finishNode,
      width,
      height,
      widthEnd,
      bHeightEnd,
      isHorizontal(widthEnd - width, bHeightEnd - height),
      array
    );
  }
}
function isHorizontal(width, height) {
  if (width > height) return true;
  return false;
}
function randomNumber(min, max) {
  var rand = Math.floor(Math.random() * (max - min)) + min;
  return rand;
}
export default RecursiveDivision;

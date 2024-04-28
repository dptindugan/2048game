let board;
let score = 0;
let rows = 4;
let columns = 4;

// create a function to set the gameboard
function setGame() {
  // initialize the 4x4 game board with all tiles set to zero
  board = [
    [0, 0, 0, 0],
    [0, 2048, 2048, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  // to create the board game on the HTML
  // the first loop is to create the rows, the second loop is to create the columns
  // this is for the row
  for (let r = 0; r < rows; r++) {
    // this will be the column for each row
    for (let c = 0; c < columns; c++) {
      // create a div element representing tiles
      // Think of this as making small box for each cell on the board.
      let tile = document.createElement("div");

      tile.id = r.toString() + "-" + c.toString();
      let num = board[r][c];

      updateTile(tile, num);
      // append the tile to the game board container
      // this means placing the tile inside the grid, in the right column and right row
      // document.getElementById("board")
      document.getElementById("board").append(tile);
    }
  }

  setTwo();
  setTwo();

  /*
  board.forEach((row, r) => {
    row.forEach((column, c) => {
      let tile = document.createElement("div");
      tile.setAttribute("id", `${r}-${c}`);
      let num = board[r][c];
      updateTile(tile, num);
      document.querySelector("#board").append(tile)
    })
  }) 
  // */
}

// function to update the apperance of the tile based on its number/value
function updateTile(tile, num) {
  // clear the tile
  tile.innerText = "";
  tile.classList.value = "";
  // CSS class named tile is added to the classlist of the tile, this will be for styling the tiles.
  tile.classList.value = "tile";

  if (num > 0) {
    tile.innerText = num.toString();
    if (num <= 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192");
    }
  }
}

// Event that triggers when the web page finishes loading.
window.onload = function () {
  setGame();
};

// function that handle the user's keyboard input when they press certain arrowkeys
// 'e' represents the event object, which contains information about the event occured
function handleSlide(e) {
  const { code } = e;
  const validKeys = [
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "KeyW",
    "KeyA",
    "KeyS",
    "KeyD",
  ];

  if (validKeys.includes(code)) {
    e.preventDefault();

    if (code == "ArrowLeft" || code == "KeyA") {
      slideLeft();
    }

    if (code == "ArrowRight" || code == "KeyD") {
      slideRight();
    }

    if (code == "ArrowDown" || code == "KeyS") {
      slideDown();
    }

    if (code == "ArrowUp" || code == "KeyW") {
      slideUp();
    }

    setTwo();
    checkWin();

    if (hasLost()) {
      // setTimeout to delay alert

      setTimeout(() => {
        alert("Game Over! You have lost the game. Game will restart");
        alert("Click any arrow key to restart");
      }, 100);
    }
  }
}

// when any key is pressed, the handleSlide function is called to handle the keypress.
document.addEventListener("keydown", handleSlide);
// document.addEventListener("keyup", checkWinCondition);

function slideLeft() {
  console.log("left");

  // iterate through each row;

  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;

    // update the id of the tile
    // for each tile in the row, the code finds the corresponding HTML element by its

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());

      let num = board[r][c];
      updateTile(tile, num);
    }
  }

  /*
  board.forEach((row, r) => {
    board[i] = slide(row)

    row.forEach((col, c) => {
      let tile = document.getElementById(`${r}-${c}`);

      let num = board[r][c];
      updateTile(tile, num);
    })
  })

  // */
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];

    // reverses the order of elements in the row, effectively making the
    // tiles slide to the right as if the board was mirrored
    row.reverse(); // reverse the array
    row = slide(row);
    row.reverse();

    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
  console.log("You pressed Right!");
}

function slideDown() {
  console.log("Down");
  for (let c = 0; c < columns; c++) {
    let column = [board[0][c], board[1][c], board[2][c], board[3][c]];

    column.reverse();
    column = slide(column);
    column.reverse();

    for (let r = 0; r < rows; r++) {
      board[r][c] = column[r];

      let tile = document.getElementById(r.toString() + "-" + c.toString());

      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  console.log("Up");

  for (let c = 0; c < columns; c++) {
    let column = [board[0][c], board[1][c], board[2][c], board[3][c]];

    column = slide(column);

    // update the id of the tile

    for (let r = 0; r < rows; r++) {
      board[r][c] = column[r];

      let tile = document.getElementById(r.toString() + "-" + c.toString());

      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function filterZero(row) {
  return row.filter((num) => num != 0);
}

function slide(row) {
  row = filterZero(row);

  // iterate through the row to check for adjacent equal numbers
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
    }
  }

  row = filterZero(row);

  while (row.length < columns) {
    row.push(0);
  }

  return row;

  /*
    row.forEach((col, i) => {
      if(col == row[i + 1])
        row[i] *= 2;
        row[i + 1] = 0;
    })

    row = filterZero(row);
    while(row.length < columns) {
      row.push(0)
    }
  // */
}

// this function will check whether the board has empty tile or none
// boolean value
function hasEmptyTile() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        return true;
      }
    }
  }
  return false;
}

function setTwo() {
  // check the hasEmptyTile boolean result, if hasEmptyTile is false the set two will now proceed.

  if (!hasEmptyTile()) return;

  let found = false;

  while (!found) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);

    if (board[r][c] == 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());

      tile.innerText = 2;
      tile.classList.add("x2");

      // Set the found variable to true to break the loop;
      found = true;
    }
  }
}

let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;

// create a function to check if the user has the 2048 tile
function checkWin() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 2048 && !is2048Exist) {
        alert("You win! You got the 2048!");
        is2048Exist = true;
      } else if (board[r][c] == 4096 && !is4096Exist) {
        alert("You win! You got the 4096!");
        is4096Exist = true;
      } else if (board[r][c] == 8192 && !is8192Exist) {
        alert("Victory! You have reached 8192! you are incredibly awesome!");
        is8192Exist = true;
      }
    }
  }

  /*
  board.forEach((row, r) => {
    if(row.includes(2048) && !is2048Exist) {
      alert('You win! You got the 2048!')
      is2048Exist = true;      
    } 
    if(row.includes(4096) && !is4096Exist) {
      alert('You win! You got the 4096!');
      is4096Exist = true;
    }
    if(row.includes(8192) && !is8192Exist) {
      alert("Victory! You have reached 8192! you are incredibly awesome!");
      is8192Exist = true;
    }
  })
  // */
}

// Create a function to check if the user lost the game
// boolean value
function hasLost() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] === 0) {
      }

      const currentTile = board[r][c];
      // Check adjacent cells (up, down, left, right) for possible merging

      if (
        (r > 0 && currentTile === board[r - 1][c]) ||
        (r < rows - 1 && currentTile === board[r + 1][c]) ||
        (c > 0 && currentTile === board[r][c - 1]) ||
        (c < columns - 1 && currentTile === board[r][c + 1])
      ) {
        return false;
      }
    }
  }

  //  No possible moves left of empty title, user has lost
  return true;
}

function checkWinCondition() {
  hasLost();
  checkWin();
}

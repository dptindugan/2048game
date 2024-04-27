let board;
let score = 0;
let rows = 4;
let columns = 4;

// create a function to set the gameboard
function setGame() {
  // initialize the 4x4 game board with all tiles set to zero
  board = [
    [2, 0, 2, 4],
    [0, 0, 4, 0],
    [0, 8, 0, 0],
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

    if(code == "ArrowLeft" || code == "KeyA") {
      slideLeft();
    }

    if(code == "ArrowRight" || code == "KeyD") {
      slideRight();
    }

    if(code == "ArrowDown" || code == "KeyS") {
      slideDown();
    }

    if(code == "ArrowUp" || code == "KeyW") {
      slideUp();
    }

  }
}

// when any key is pressed, the handleSlide function is called to handle the keypress.
document.addEventListener("keydown", handleSlide);

function slideLeft() {
  console.log('left')

  // iterate through each row;

  for(let r=0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;

    // update the id of the tile
    // for each tile in the row, the code finds the corresponding HTML element by its 

    for(let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());

      let num = board[r][c];
      updateTile(tile, num)
    }
  }



  /*
  board.forEach((row, index) => {
    board[i] = slide(row)
  })

  // */
}

function slideRight() {
  
  console.log('right')
}


function slideDown() {
  console.log('Down')
  
}

function slideUp() {
  console.log('Up')

}

function filterZero(row) {
  return row.filter(num => !num);
}

function slide(row) {
  row = filterZero(row);

  // iterate through the row to check for adjacent equal numbers
  for(let i = 0; i < row.length - 1; i ++) {
    if(row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
    }

  }

  row = filterZero(row);

  while(row.length < columns) {
    row.push(0)
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
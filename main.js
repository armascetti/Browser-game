/*----------------- Constants -----------------*/

let gameArray = [
  null, null, null, null, null, null, null,
  null, null, null, null, null, null, null,
  null, null, null, null, null, null, null,
  null, null, null, null, null, null, null,
  null, null, null, null, null, null, null,
  0, 0, 0, 0, 0, 0, 0
]

const winningCombos = [
  [0, 1, 2, 3],
  [41, 40, 39, 38],
  [7, 8, 9, 10],
  [34, 33, 32, 31],
  [14, 15, 16, 17],
  [27, 26, 25, 24],
  [21, 22, 23, 24],
  [20, 19, 18, 17],
  [28, 29, 30, 31],
  [13, 12, 11, 10],
  [35, 36, 37, 38],
  [6, 5, 4, 3],
  [0, 7, 14, 21],
  [41, 34, 27, 20],
  [1, 8, 15, 22],
  [40, 33, 26, 19],
  [2, 9, 16, 23],
  [39, 32, 25, 18],
  [3, 10, 17, 24],
  [38, 31, 24, 17],
  [4, 11, 18, 25],
  [37, 30, 23, 16],
  [5, 12, 19, 26],
  [36, 29, 22, 15],
  [6, 13, 20, 27],
  [35, 28, 21, 14],
  [0, 8, 16, 24],
  [41, 33, 25, 17],
  [7, 15, 23, 31],
  [34, 26, 18, 10],
  [14, 22, 30, 38],
  [27, 19, 11, 3],
  [35, 29, 23, 17],
  [6, 12, 18, 24],
  [28, 22, 16, 10],
  [13, 19, 25, 31],
  [21, 15, 9, 3],
  [20, 26, 32, 38],
  [36, 30, 24, 18],
  [5, 11, 17, 23],
  [37, 31, 25, 19],
  [4, 10, 16, 22],
  [2, 10, 18, 26],
  [39, 31, 23, 15],
  [1, 9, 17, 25],
  [40, 32, 24, 16],
  [9, 17, 25, 33],
  [8, 16, 24, 32],
  [11, 17, 23, 29],
  [12, 18, 24, 30],
  [1, 2, 3, 4],
  [5, 4, 3, 2],
  [8, 9, 10, 11],
  [12, 11, 10, 9],
  [15, 16, 17, 18],
  [19, 18, 17, 16],
  [22, 23, 24, 25],
  [26, 25, 24, 23],
  [29, 30, 31, 32],
  [33, 32, 31, 30],
  [36, 37, 38, 39],
  [40, 39, 38, 37],
  [7, 14, 21, 28],
  [8, 15, 22, 29],
  [9, 16, 23, 30],
  [10, 17, 24, 31],
  [11, 18, 25, 32],
  [12, 19, 26, 33],
  [13, 20, 27, 34],
]



/*------------- Variables (state) -------------*/


let isWinner, currentPlayer, gameSquare


/*--------- Cached Element References ---------*/

const gameGrid = document.querySelector("#Grid")
const resetBtn = document.querySelector("#resetbutton")
const messageEl = document.querySelector("#message")
const lightDarkBtn = document.querySelector("#light-dark-button")


/*-------------- Event Listeners --------------*/


//resetBtn.addEventListener('click', initializeBoard)
//lightDarkBtn.addEventListener("click", toggleLightDark)


/*----------------- Functions -----------------*/

//use a for loop to create smaller divs inside a large div
//use another for loop to access the innerArray index 
// created a div, event listener, and gave it a className all in the function 
//access the gameArray index and grabbing the nested arrays that inside the gameAray. setting the value of each div thats in the innerArray of the gameArray 
//create and appending to the gameGrid 
function initializeBoard() {
  for (let innerArray = 0; innerArray < 42; innerArray++) {
    let gameSquare = document.createElement("div");
    gameSquare.addEventListener('click', whosTurn)
    gameSquare.className = "square"
    gameSquare.value = gameArray[innerArray]
    gameGrid.appendChild(gameSquare)
  }
  currentPlayer = 1
}


//including in the function if the innerArray index is equal to 0 that player can click on the square 
function whosTurn() {
  const currentGameBoardState = Array.from(document.getElementsByClassName("square")) //getting the exact current game play state. 
  const currentSquare = this
  if (currentPlayer === 1 && currentSquare.value === 0) {
    currentMoveLogic(currentSquare, "red", currentGameBoardState)  //call the function, pass in the current div that is clicked, pass in the color of player, & 
  } else if (currentPlayer === -1 && currentSquare.value === 0) {
    currentMoveLogic(currentSquare, "yellow", currentGameBoardState)
  }
}//onclick of each square 

//if you ever do it more than once can create a function for it. 
function currentMoveLogic(currentSquare, playerColor, currentGameBoardState) {
  setValidMove(currentSquare, "validMove")
  toggleColor(currentSquare, playerColor)
  setPlayerValue(currentSquare, currentPlayer)
  unlockNewSquare(currentGameBoardState)
  setValidMove(currentSquare, "")
  togglePlayer()
}


//helper functions
function togglePlayer() {
  currentPlayer = currentPlayer * -1
}

function setPlayerValue(square, currentPlayer) {
  square.value = currentPlayer
}


function setValidMove(square, value) {
  square.innerText = value
}

function toggleColor(square, color) {
  square.style.background = color
}


//unlock the squares on the board
function unlockNewSquare(currentGameBoardState) {
  for (let i = 7; i < currentGameBoardState.length; i++) {
    if (currentGameBoardState[i].innerText === "validMove") {
      gameArray[i - 7] = 0;
    }
  }
  //create a function that will iterate through the array keys and set them to each value on the current board
  renderBoard()
}


function renderBoard() {
  let getDOM = document.getElementsByClassName("square")
  for (let i = 0; i < getDOM.length; i++) {
    getDOM[i].value = gameArray[i]
  }
  console.log(getDOM)
}


//winning logic 
function checkEachComboForWin(combo, currentGameBoardState) {
  let counterPlayTwo = 0;
  let counterPlayOne = 0;
  for (let i = 0; i < winningCombos.length; i++) {
    for (let index = 0; index < combo.length; index++) {
      const element = combo[index];
      //if the current gameboard state has a 1 or -1 at any of the combos we have a winner!
      if (currentGameBoardState[element].value === -1) {
        counterPlayTwo++;
      } else if (currentGameBoardState[element].value === 1) {
        counterPlayOne++;
      }
    }
  }
  displayWinner(counterPlayOne, counterPlayTwo)
}



function displayWinner(counterPlayOne, counterPlayTwo) {
  if (counterPlayOne === 4) {
    messageEl.innerText = `Player One Wins!`
  } else if (counterPlayTwo === 4) {
    messageEl.innerText = `Player two Wins!`
  } else {
    return;
  }
}

initializeBoard();



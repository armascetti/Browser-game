/*----------------- Constants -----------------*/

let gameArray = [
  null, null, null, null, null, null, null,
  null, null, null, null, null, null, null,
  null, null, null, null, null, null, null,
  null, null, null, null, null, null, null,
  null, null, null, null, null, null, null,
  0, 0, 0, 0, 0, 0, 0
]


let winningCombos = [
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
  [13, 20, 27, 34]
]

/*------------- Variables (state) -------------*/


let isWinner, currentPlayer, gameSquare


/*--------- Cached Element References ---------*/

const gameGrid = document.querySelector("#Grid")
const resetBtn = document.querySelector("#resetButton")
const messageEl = document.querySelector("#message")


/*-------------- Event Listeners --------------*/


resetBtn.addEventListener('click', resetBoard)


/*----------------- Functions -----------------*/

function initializeBoard() {
  for (let innerArray = 0; innerArray < 42; innerArray++) {
    let gameSquare = document.createElement("div");
    gameSquare.addEventListener('click', currentMove)
    gameSquare.className = "square"
    gameSquare.value = gameArray[innerArray]
    gameGrid.appendChild(gameSquare)
  }
  currentPlayer = 1
}


function renderBoardValues() {
  const currentGameBoardState = Array.from(document.getElementsByClassName("square"))
  for (let i = 0; i < currentGameBoardState.length; i++) {
    currentGameBoardState[i].value = gameArray[i]
  }
}


function currentMove() {
  const currentGameBoardState = Array.from(document.getElementsByClassName("square"))
  this.id = 'validMoveFlag'
  if (currentPlayer === 1 && this.value === 0) {
    this.style.background = "red"
    unlockNewSquare(currentGameBoardState)
    checkForWinner(currentGameBoardState)
    togglePlayer()
  } else if (currentPlayer === -1 && this.value === 0) {
    this.style.background = "yellow"
    unlockNewSquare(currentGameBoardState)
    checkForWinner(currentGameBoardState)
    togglePlayer()
  }
  this.removeAttribute('id');
}


function togglePlayer() {
  currentPlayer = currentPlayer * -1
}


function unlockNewSquare(currentGameBoardState) {
  for (let i = 7; i < currentGameBoardState.length; i++) {
    if (currentGameBoardState[i].id === 'validMoveFlag') {
      gameArray[i - 7] = 0
      gameArray[i] = currentPlayer
    }
  }
  renderBoardValues(currentGameBoardState)
}


function checkForWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    const currentWinCombo = winningCombos[i]
    checkWinningCombo(currentWinCombo)
  }
}

function checkWinningCombo(combo) {
  let counterPlayerOne = 0
  let counterPlayerTwo = 0
  for (let i = 0; i < combo.length; i++) {
    if (gameArray[combo[i]] === 1) {
      counterPlayerOne++
    } else if (gameArray[combo[i]] === -1) {
      counterPlayerTwo++
    }
  }
  displayWinner(counterPlayerOne, counterPlayerTwo)
}


function displayWinner(counterPlayerOne, counterPlayerTwo) {
  if (counterPlayerOne === 4) {
    messageEl.innerText = `Player One Wins!`
  } else if (counterPlayerTwo === 4) {
    messageEl.innerText = `Player two Wins!`
  } else {
    return
  }
}

function resetBoard() {
  for (let i = 0; i < gameArray.length; i++) {
    if (i > 0 && i < 35) {
      gameArray[i] = null
    } else if (i > 34) {
      gameArray[i] = 0
    }
  }
  renderBoardValues()
  resetColorsOnBoard()
  messageEl.innerText = "Click the Circles. Four in a Row WINS!"
}

function resetColorsOnBoard() {
  const currentGameBoardState = Array.from(document.getElementsByClassName("square"))
  currentGameBoardState.forEach(element => element.style.background = "white");
}

function toggleLightMode() {
  let element = document.body;
  element.classList.toggle("dark-mode");
}

initializeBoard()
renderBoardValues()
checkDarkPref()


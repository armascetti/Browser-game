/*----------------- Constants -----------------*/





/*------------- Variables (state) -------------*/

let isWinner, currentPlayer, gameSquare



/*--------- Cached Element References ---------*/

const gameGrid = document.querySelector("#Grid")
//const resetBtn = document.querySelector("#reset-button")
const messageEl = document.querySelector("#message")


/*-------------- Event Listeners --------------*/

//resetBtn.addEventListener('click', initializeBoard)


/*----------------- Functions -----------------*/
function initializeBoard() {
  for (let index = 0; index < 42; index++) {
    let gameSquare = document.createElement("div");
    gameSquare.addEventListener('click', playGame)
    gameSquare.style.width = "100px";
    gameSquare.style.height = "100px";
    gameSquare.style.background = "white";
    gameSquare.style.borderRadius = "80px";
    gameGrid.appendChild(gameSquare)
  }
  currentPlayer = 1
}



function playGame() {
  if (currentPlayer === 1) {
    this.style.background = "red";
    togglePlayer();
  } else {
    this.style.background = "yellow";
    togglePlayer();
  }
}

//helper function to toggle the players turns 
function togglePlayer() {
  currentPlayer = currentPlayer * -1
}


//run game below
initializeBoard();

/*----------------- Constants -----------------*/

let gameArray = [

  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [0, 0, 0, 0, 0, 0, 0]

]

/*------------- Variables (state) -------------*/

let isWinner, currentPlayer, gameSquare

/*--------- Cached Element References ---------*/

const gameGrid = document.querySelector("#Grid")
//const resetBtn = document.querySelector("#reset-button")
const messageEl = document.querySelector("#message")


/*-------------- Event Listeners --------------*/


//resetBtn.addEventListener('click', initializeBoard)



/*----------------- Functions -----------------*/

//use a for loop to create smaller divs inside a large div
//use another for loop to access the innerArray index 
  // created a div, event listener, and gave it a className all in the function 
// line 46 is to access the gameArray index and grabbing the nested arrays that inside the gameAray. setting the value of each div thats in the innerArray of the gameArray 
//create and appending to the gameGrid 

function initializeBoard() {
  for (let index = 0; index < gameArray.length; index++){
   for (let innerArray = 0; innerArray < 7; innerArray++) {
      let gameSquare = document.createElement("div");
    gameSquare.addEventListener('click', playGame)
    gameSquare.className = "square"  
    gameSquare.value = gameArray[index][innerArray]
    gameGrid.appendChild(gameSquare)      
    }   
  } 
  currentPlayer = 1
}

//including in the function if the innerArray index is equal to 0 that player can click on the square 
function playGame() {
  console.log(this.value)
  if (currentPlayer === 1 && this.value === 0) {
    this.style.background = "red";
    this.value = null
    togglePlayer();
  } else if (currentPlayer === -1 && this.value === 0) {
    this.style.background = "yellow";
    this.value = null 
    togglePlayer();
  }
}


//helper function to toggle the players turns 
function togglePlayer() {
  currentPlayer = currentPlayer * -1
}


//run game below
initializeBoard();
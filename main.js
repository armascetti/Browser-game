/*----------------- Constants -----------------*/







/*------------- Variables (state) -------------*/

 let isWinner, currentPlayer, gameSquare




/*--------- Cached Element References ---------*/

const gameGrid = document.getElementById("Grid")



/*-------------- Event Listeners --------------*/





/*----------------- Functions -----------------*/
function initializeBoard(){
  for (let index = 0; index < 42; index++) {
  let gameSquare = document.createElement("div");
  gameSquare.addEventListener('click', playGame)  
  gameSquare.style.width = "100px";
  gameSquare.style.height = "100px";
  gameSquare.style.background = "white";
  gameSquare.style.borderRadius = "50px"; 
  gameGrid.appendChild(gameSquare)  
  }
}

function playGame(){
  alert('Im clicked')
  for(let i =0; i < gameSquare.length; i++){
    gameSquare[i]
    console.log(gameSquare[i])
  }
}




//run game below
initializeBoard();
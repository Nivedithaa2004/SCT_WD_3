const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const modeSelect = document.getElementById("mode");

let cells = [];
let currentPlayer = "X";
let gameActive = true;
let gameState = ["","","","","","","","",""];

const winPatterns = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

function createBoard(){
board.innerHTML="";
gameState = ["","","","","","","","",""];

for(let i=0;i<9;i++){

let cell=document.createElement("div");
cell.classList.add("cell");
cell.dataset.index=i;

cell.addEventListener("click",handleClick);

board.appendChild(cell);

}

cells=document.querySelectorAll(".cell");

statusText.textContent="Player X's Turn";
}

function handleClick(e){

const index=e.target.dataset.index;

if(gameState[index]!=="" || !gameActive) return;

makeMove(index,currentPlayer);

if(checkWinner()) return;

currentPlayer=currentPlayer==="X"?"O":"X";

statusText.textContent=`Player ${currentPlayer}'s Turn`;

if(modeSelect.value==="computer" && currentPlayer==="O"){

setTimeout(computerMove,500);

}

}

function makeMove(index,player){

gameState[index]=player;

cells[index].textContent=player;

}

function checkWinner(){

for(let pattern of winPatterns){

let [a,b,c]=pattern;

if(gameState[a] &&
gameState[a]===gameState[b] &&
gameState[a]===gameState[c]){

statusText.textContent=`Player ${gameState[a]} Wins!`;

gameActive=false;

return true;

}

}

if(!gameState.includes("")){

statusText.textContent="Game Draw!";

gameActive=false;

return true;

}

return false;

}

function computerMove(){

let emptyCells=gameState
.map((val,i)=>val===""?i:null)
.filter(v=>v!==null);

let randomIndex=emptyCells[Math.floor(Math.random()*emptyCells.length)];

makeMove(randomIndex,"O");

if(!checkWinner()){

currentPlayer="X";

statusText.textContent="Player X's Turn";

}

}

restartBtn.addEventListener("click",()=>{

gameActive=true;

currentPlayer="X";

createBoard();

});

createBoard();
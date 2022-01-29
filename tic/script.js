let origBoard;
let huPlayer = 'O';
let aiPlayer = 'X';
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [6, 4, 2],
  [2, 5, 8],
  [1, 4, 7],
  [0, 3, 6]
];



const cells = document.querySelectorAll('.cell');
startGame();

function selectSym(sym) {
  huPlayer = sym;
  aiPlayer = sym === 'O' ? 'X' : 'O';
  origBoard = Array.from(Array(9).keys());
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', turnClick, false);
  }
  if (aiPlayer === 'X') {

    turn(bestSpot(), aiPlayer);
  }
  document.querySelector('.selectSym').style.display = "none";
}


function fu0() {

  if (document.getElementById("0").innerHTML == "X" || document.getElementById("0").innerHTML == "O") {
    document.querySelector('.tt').style.display = "block";
  } else {
    document.querySelector('.tt').style.display = "none";
  }
}

function fu1() {

  if (document.getElementById("1").innerHTML == "X" || document.getElementById("1").innerHTML == "O") {
    document.querySelector('.tt').style.display = "block";
  } else {
    document.querySelector('.tt').style.display = "none";
  }
}

function fu2() {

  if (document.getElementById("2").innerHTML == "X" || document.getElementById("2").innerHTML == "O") {
    document.querySelector('.tt').style.display = "block";
  } else {
    document.querySelector('.tt').style.display = "none";
  }
}

function fu3() {

  if (document.getElementById("3").innerHTML == "X" || document.getElementById("3").innerHTML == "O") {
    document.querySelector('.tt').style.display = "block";
  } else {
    document.querySelector('.tt').style.display = "none";
  }
}

function fu4() {

  if (document.getElementById("4").innerHTML == "X" || document.getElementById("4").innerHTML == "O") {
    document.querySelector('.tt').style.display = "block";
  } else {
    document.querySelector('.tt').style.display = "none";
  }
}

function fu5() {

  if (document.getElementById("5").innerHTML == "X" || document.getElementById("5").innerHTML == "O") {
    document.querySelector('.tt').style.display = "block";
  } else {
    document.querySelector('.tt').style.display = "none";
  }
}

function fu6() {

  if (document.getElementById("6").innerHTML == "X" || document.getElementById("6").innerHTML == "O") {
    document.querySelector('.tt').style.display = "block";
  } else {
    document.querySelector('.tt').style.display = "none";
  }
}

function fu7() {

  if (document.getElementById("7").innerHTML == "X" || document.getElementById("7").innerHTML == "O") {
    document.querySelector('.tt').style.display = "block";
  } else {
    document.querySelector('.tt').style.display = "none";
  }
}

function fu8() {

  if (document.getElementById("8").innerHTML == "X" || document.getElementById("8").innerHTML == "O") {
    document.querySelector('.tt').style.display = "block";
  } else {
    document.querySelector('.tt').style.display = "none";
  }
}








function fu() {
  document.querySelector('.tt').style.display = "none";


}

function startGame() {

  document.querySelector('.endgame').style.display = "none";
  document.querySelector('.endgame .text').innerText = "";
  document.querySelector('.selectSym').style.display = "block";
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
  }
}

function turnClick(square) {
  if (typeof origBoard[square.target.id] === 'number') {
    turn(square.target.id, huPlayer);
    if (!checkWin(origBoard, huPlayer) && !checkTie())
      turn(bestSpot(), aiPlayer);
  }
}

function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerHTML = player;
  let gameWon = checkWin(origBoard, player);
  if (gameWon) gameOver(gameWon);
  checkTie();
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = {
        index: index,
        player: player
      };
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player === huPlayer ? "blue" : "red";
  }
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', turnClick, false);
  }
  declareWinner(gameWon.player === huPlayer ? "You win!" : "You lose");
}

function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
  return origBoard.filter((elm, i) => i === elm);
}

function bestSpot() {
  return minimax(origBoard, aiPlayer).index;
}

function checkTie() {
  if (emptySquares().length === 0) {
    for (cell of cells) {
      cell.style.backgroundColor = "green";
      cell.removeEventListener('click', turnClick, false);
    }
    declareWinner("Tie game");
    return true;
  }
  return false;
}

function minimax(newBoard, player) {
  var availSpots = emptySquares(newBoard);
  

  if (checkWin(newBoard, huPlayer)) {
    return {
      score: -10
    };
  } else if (checkWin(newBoard, aiPlayer)) {
    return {
      score: 10
    };
  } else if (availSpots.length === 0) {
    return {
      score: 0
    };
  }

  var moves = [];
  for (let i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;
    
    if (player === aiPlayer)
      move.score = minimax(newBoard, huPlayer).score;
     
    else
      move.score = minimax(newBoard, aiPlayer).score;
    newBoard[availSpots[i]] = move.index;
    
    if ((player === aiPlayer && move.score === 10) || (player === huPlayer && move.score === -10))
      return move;
    else
      moves.push(move);
  }
  

  let bestMove, bestScore;
  if (player === aiPlayer) {
    bestScore = -1000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    bestScore = 1000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  

  return moves[bestMove];
}
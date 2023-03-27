var board = ['', '', '', '', '', '', '', '', ''];
var humanPlayer = 'X';
var computerPlayer = 'O';
var currentPlayer = humanPlayer;

// add event listeners to each square
for (var i = 0; i < board.length; i++) {
  document.getElementById(i).addEventListener('click', function() {
    if (board[this.id] === '') {
      board[this.id] = humanPlayer;
      this.innerHTML = humanPlayer;
      this.style.color = 'black';
      this.style.backgroundColor = '#e3e3e3';
      currentPlayer = computerPlayer;
      checkForGameEnd();
      if (currentPlayer === computerPlayer) {
        computerMove();
      }
    }
  });
}

// function to make the computer's move
function computerMove() {
  setTimeout(function() {
    var bestScore = -Infinity;
    var bestMove;
    for (var i = 0; i < board.length; i++) {
      // check if the square is available
      if (board[i] === '') {
        // make the move
        board[i] = computerPlayer;
        // calculate the score for this move using minimax algorithm
        var score = minimax(board, 0, false);
        // undo the move
        board[i] = '';
        // update the best move if necessary
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    // make the best move
    board[bestMove] = computerPlayer;
    document.getElementById(bestMove).innerHTML = computerPlayer;
    document.getElementById(bestMove).style.color = '#0083fb';
    document.getElementById(bestMove).style.backgroundColor = '#e3e3e3';
    currentPlayer = humanPlayer;
    checkForGameEnd();

  }, 0); // delay of 1 second
}

// minimax algorithm to choose the best move for the computer player
function minimax(board, depth, isMaximizingPlayer) {
  if (checkForWinner(computerPlayer)) {
    return 1;
  } else if (checkForWinner(humanPlayer)) {
    return -1;
  } else if (checkForTie()) {
    return 0;
  }
  if (isMaximizingPlayer) {
    var bestScore = -Infinity;
    for (var i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = computerPlayer;
        var score = minimax(board, depth + 1, false);
        board[i] = '';
        bestScore = Math.max(bestScore, score);
      }
    }
    return bestScore;
  } else {
    var bestScore = Infinity;
    for (var i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = humanPlayer;
        var score = minimax(board, depth + 1, true);
        board[i] = '';
        bestScore = Math.min(bestScore, score);
      }
    }
    return bestScore;
  }
}

// check if the game has ended
function checkForGameEnd() {
  if (checkForWinner(humanPlayer)) {
    document.getElementById('message').innerHTML = 'You win!';
    disableSquares();
  } else if (checkForWinner(computerPlayer)) {
    document.getElementById('message').innerHTML = 'Computer wins!';
    disableSquares();
  } else if (checkForTie()) {
    document.getElementById('message').innerHTML = 'Tie game!';
    disableSquares();
  }
}

// check if there is a winner
function checkForWinner(player) {
  // check rows
  for (var i = 0; i < 9; i += 3) {
    if (board[i] === player && board[i+1] === player && board[i+2] === player) {
      return true;
    }
  }
  // check columns
  for (var i = 0; i < 3; i++) {
    if (board[i] === player && board[i+3] === player && board[i+6] === player) {
      return true;
    }
  }
  // check diagonals
  if (board[0] === player && board[4] === player && board[8] === player) {
    return true;
  }
  if (board[2] === player && board[4] === player && board[6] === player) {
    return true;
  }
  return false;
}
// check if there is a tie
function checkForTie() {
  for (var i = 0; i < board.length; i++) {
    if (board[i] === '') {
      return false;
    }
 }
  return true;
}

// disable all squares
function disableSquares() {
  for (var i = 0; i < board.length; i++) {
    document.getElementById(i).removeEventListener('click', function() {
      if (board[this.id] === '') {
        board[this.id] = humanPlayer;
        this.innerHTML = humanPlayer;
        this.style.color = 'black';
        this.style.backgroundColor = '#e3e3e3';
        currentPlayer = computerPlayer;
        checkForGameEnd();
        if (currentPlayer === computerPlayer) {
          computerMove();
        }
      }
    });
  }
}
function clearBoard() {
  for (var i = 0; i < board.length; i++) {
    board[i] = '';
    document.getElementById(i).innerHTML = '?';
    document.getElementById(i).style.color = 'black'; // set color to black
    document.getElementById(i).style.backgroundColor = ''; // set color to none 

    document.getElementById(i).disabled = false;
  }
  document.getElementById('message').innerHTML = '';
}
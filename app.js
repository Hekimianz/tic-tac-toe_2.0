const domElems = (() => {
  const board = document.getElementById("main-cont");
  const squares = document.getElementsByClassName("game-square");
  const markers = document.getElementsByClassName("marker");
  const btnStart = document.getElementById("btn-start");
  const form = document.getElementById("game-start");
  const inputName = document.getElementById("input-name");
  const inputMarkerX = document.getElementById("input-markerX");
  const inputMarkerO = document.getElementById("input-markerO");
  const gameEnd = document.getElementById("game-end");
  const gameEndSpan = document.getElementById("game-end-span");
  const btnRestart = document.getElementById("btn-restart");
  return {
    board,
    squares,
    markers,
    btnStart,
    inputName,
    inputMarkerO,
    inputMarkerX,
    form,
    gameEnd,
    gameEndSpan,
    btnRestart,
  };
})();
const addEventToNodes = (evn, nodelst, func) => {
  for (let i = 0; i < nodelst.length; i += 1) {
    nodelst[i].addEventListener(evn, func);
  }
};

const delEventFromNodes = (evn, nodelst, func) => {
  for (let i = 0; i < nodelst.length; i += 1) {
    nodelst[i].removeEventListener(evn, func);
  }
};

const gameBoard = (() => [" ", " ", " ", " ", " ", " ", " ", " ", " "])();

const displayBoard = () => {
  for (let i = 0; i < gameBoard.length; i += 1) {
    domElems.markers[i].innerText = gameBoard[i];
  }
};
displayBoard();

const Player = (name, marker) => ({ name, marker });

// eslint-disable-next-line no-unused-vars
const game = (() => {
  let player1;
  let player2;
  let currentPlayer;
  domElems.btnStart.addEventListener("click", () => {
    if (domElems.inputName.value !== "") {
      domElems.board.style.display = "grid";
      domElems.btnRestart.style.display = "initial";
      domElems.form.style.display = "none";
      if (domElems.inputMarkerO.checked) {
        player1 = Player(domElems.inputName.value, "O");
        player2 = Player("Computer", "X");
      } else if (domElems.inputMarkerX.checked) {
        player1 = Player(domElems.inputName.value, "X");
        player2 = Player("Computer", "O");
      }
      currentPlayer = player1;
    }
  });

  const squaresArr = Array.prototype.slice.call(domElems.squares);
  addEventToNodes("click", domElems.squares, function check() {
    // check if square is already taken
    if (gameBoard[squaresArr.indexOf(this)] === " ") {
      gameBoard[squaresArr.indexOf(this)] = currentPlayer.marker;
      // checks whos turn it is
      switch (currentPlayer) {
        case player1:
          currentPlayer = player2;
          break;
        case player2:
          currentPlayer = player1;
          break;
        default:
          break;
      }
      displayBoard();
    }
    // check if gameover
    const topRow = JSON.stringify(gameBoard.slice(0, 3));
    const midRow = JSON.stringify(gameBoard.slice(3, 6));
    const botRow = JSON.stringify(gameBoard.slice(6, 9));
    const threeX = JSON.stringify(["X", "X", "X"]);
    const threeO = JSON.stringify(["O", "O", "O"]);
    const xWins = function () {
      if (player1.marker === "X") {
        domElems.gameEndSpan.innerText = `${player1.name} Wins!`;
      } else {
        domElems.gameEndSpan.innerText = "You lose!";
      }
      domElems.gameEnd.style.display = "initial";
      delEventFromNodes("click", domElems.squares, check);
    };
    const oWins = function () {
      if (player1.marker === "O") {
        domElems.gameEndSpan.innerText = `${player1.name} Wins!`;
      } else {
        domElems.gameEndSpan.innerText = "You lose!";
      }
      domElems.gameEnd.style.display = "initial";
    };
    // X Wins Conditions
    if (topRow === threeX || midRow === threeX || botRow === threeX) {
      xWins();
    } else if (
      (gameBoard[0] === "X" && gameBoard[3] === "X" && gameBoard[6] === "X") ||
      (gameBoard[1] === "X" && gameBoard[4] === "X" && gameBoard[7] === "X") ||
      (gameBoard[2] === "X" && gameBoard[5] === "X" && gameBoard[8] === "X")
    ) {
      xWins();
    } else if (
      (gameBoard[2] === "X" && gameBoard[4] === "X" && gameBoard[6] === "X") ||
      (gameBoard[0] === "X" && gameBoard[4] === "X" && gameBoard[8] === "X")
    ) {
      xWins();
    }
    // O Wins Conditions
    else if (topRow === threeO || midRow === threeO || botRow === threeO) {
      oWins();
    } else if (
      (gameBoard[0] === "O" && gameBoard[3] === "O" && gameBoard[6] === "O") ||
      (gameBoard[1] === "O" && gameBoard[4] === "O" && gameBoard[7] === "O") ||
      (gameBoard[2] === "O" && gameBoard[5] === "O" && gameBoard[8] === "O")
    ) {
      oWins();
    } else if (
      (gameBoard[2] === "O" && gameBoard[4] === "O" && gameBoard[6] === "O") ||
      (gameBoard[0] === "O" && gameBoard[4] === "O" && gameBoard[8] === "O")
    ) {
      oWins();
    }
    domElems.btnRestart.addEventListener("click", () => {
      for (let i = 0; i < gameBoard.length; i += 1) {
        domElems.markers[i].innerText = " ";
        gameBoard[i] = " ";
      }
      domElems.gameEndSpan.innerText = "";
      domElems.gameEnd.style.display = "none";
      addEventToNodes("click", domElems.squares, check);
      currentPlayer = player1;
    });
  });
})();

const domElems = (() => {
  const board = document.getElementById("main-cont");
  const squares = document.getElementsByClassName("game-square");
  const markers = document.getElementsByClassName("marker");
  const btnStart = document.getElementById("btn-start");
  const form = document.getElementById("game-start");
  const inputName = document.getElementById("input-name");
  const inputMarkerX = document.getElementById("input-markerX");
  const inputMarkerO = document.getElementById("input-markerO");
  return {
    board,
    squares,
    markers,
    btnStart,
    inputName,
    inputMarkerO,
    inputMarkerX,
    form,
  };
})();
const addEventToNodes = (evn, nodelst, func) => {
  for (let i = 0; i < nodelst.length; i++) {
    nodelst[i].addEventListener(evn, func);
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

const game = (() => {
  let player1;
  let player2;
  let currentPlayer;
  domElems.btnStart.addEventListener("click", () => {
    if (domElems.inputName.value !== "") {
      domElems.board.style.display = "grid";
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
  addEventToNodes("click", domElems.squares, function () {
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
    // X Wins Conditions
    if (topRow === threeX || midRow === threeX || botRow === threeX) {
      console.log("X Wins!");
    } else if (
      (gameBoard[0] === "X" && gameBoard[3] === "X" && gameBoard[6] === "X") ||
      (gameBoard[1] === "X" && gameBoard[4] === "X" && gameBoard[7] === "X") ||
      (gameBoard[2] === "X" && gameBoard[5] === "X" && gameBoard[8] === "X")
    ) {
      console.log("X wins!");
    } else if (
      (gameBoard[2] === "X" && gameBoard[4] === "X" && gameBoard[6] === "X") ||
      (gameBoard[0] === "X" && gameBoard[4] === "X" && gameBoard[8] === "X")
    ) {
      console.log("X Wins!");
    }
    // O Wins Conditions
    else if (topRow === threeO || midRow === threeO || botRow === threeO) {
      console.log("O Wins!");
    } else if (
      (gameBoard[0] === "O" && gameBoard[3] === "O" && gameBoard[6] === "O") ||
      (gameBoard[1] === "O" && gameBoard[4] === "O" && gameBoard[7] === "O") ||
      (gameBoard[2] === "O" && gameBoard[5] === "O" && gameBoard[8] === "O")
    ) {
      console.log("O wins!");
    } else if (
      (gameBoard[2] === "O" && gameBoard[4] === "O" && gameBoard[6] === "O") ||
      (gameBoard[0] === "O" && gameBoard[4] === "O" && gameBoard[8] === "O")
    ) {
      console.log("O Wins!");
    }
  });
})();

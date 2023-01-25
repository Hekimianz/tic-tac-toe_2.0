const domElems = (() => {
  const board = document.getElementById("main-cont");
  const squares = document.getElementsByClassName("game-square");
  const markers = document.getElementsByClassName("marker");
  const btnStart = document.getElementById("btn-start");
  const form = document.getElementById("game-start");
  const inputName = document.getElementById("input-name");
  const gameEnd = document.getElementById("game-end");
  const gameEndSpan = document.getElementById("game-end-span");
  const btnRestart = document.getElementById("btn-restart");
  const selectorX = document.getElementById("selectX");
  const selectorO = document.getElementById("selectO");
  return {
    board,
    squares,
    markers,
    btnStart,
    inputName,
    form,
    gameEnd,
    gameEndSpan,
    btnRestart,
    selectorO,
    selectorX,
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
  let selectedMarker;
  domElems.selectorO.addEventListener("click", () => {
    domElems.selectorO.classList.add("selected");
    domElems.selectorX.classList.remove("selected");
    domElems.selectorO.classList.remove("unselected");
    domElems.selectorO.classList.remove("markSelector");
    domElems.selectorX.classList.add("unselected");
    domElems.selectorX.classList.add("markSelector");
    selectedMarker = "O";
  });
  domElems.selectorX.addEventListener("click", () => {
    domElems.selectorX.classList.add("selected");
    domElems.selectorO.classList.remove("selected");
    domElems.selectorX.classList.remove("unselected");
    domElems.selectorX.classList.remove("markSelector");
    domElems.selectorO.classList.add("unselected");
    domElems.selectorO.classList.add("markSelector");
    selectedMarker = "X";
  });
  let player1;
  let player2;
  let currentPlayer;
  domElems.btnStart.addEventListener("click", () => {
    if (domElems.inputName.value !== "" && selectedMarker !== undefined) {
      domElems.board.style.display = "grid";
      domElems.btnRestart.style.display = "initial";
      domElems.form.style.display = "none";
      if (selectedMarker === "O") {
        player1 = Player(domElems.inputName.value, "O");
        player2 = Player("Computer", "X");
      } else if (selectedMarker === "X") {
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
        domElems.gameEnd.style.background = "#faff61be";
      } else {
        domElems.gameEndSpan.innerText = "You lose!";
        domElems.gameEnd.style.background = "#FFDEABbe";
      }
      domElems.gameEnd.style.display = "flex";
      delEventFromNodes("click", domElems.squares, check);
    };
    const oWins = function () {
      if (player1.marker === "O") {
        domElems.gameEndSpan.innerText = `${player1.name} Wins!`;
        domElems.gameEnd.style.background = "#faff61be";
      } else {
        domElems.gameEndSpan.innerText = "You lose!";
        domElems.gameEnd.style.background = "#FFDEABbe";
      }
      domElems.gameEnd.style.display = "flex";
    };
    // X Wins Conditions
    if (topRow === threeX) {
      xWins();
      domElems.squares[0].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[1].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[2].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
    } else if (midRow === threeX) {
      xWins();
      domElems.squares[3].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[4].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[5].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
    } else if (botRow === threeX) {
      xWins();
      domElems.squares[6].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[7].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[8].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
    } else if (
      gameBoard[0] === "X" &&
      gameBoard[3] === "X" &&
      gameBoard[6] === "X"
    ) {
      xWins();
      domElems.squares[0].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[3].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[6].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
    } else if (
      gameBoard[1] === "X" &&
      gameBoard[4] === "X" &&
      gameBoard[7] === "X"
    ) {
      xWins();
      domElems.squares[1].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[4].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[7].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
    } else if (
      gameBoard[2] === "X" &&
      gameBoard[5] === "X" &&
      gameBoard[8] === "X"
    ) {
      xWins();
      domElems.squares[2].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[5].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[8].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
    } else if (
      gameBoard[2] === "X" &&
      gameBoard[4] === "X" &&
      gameBoard[6] === "X"
    ) {
      xWins();
      domElems.squares[2].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[4].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[6].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
    } else if (
      gameBoard[0] === "X" &&
      gameBoard[4] === "X" &&
      gameBoard[8] === "X"
    ) {
      xWins();
      domElems.squares[0].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[4].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[8].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
    }
    // O Wins Conditions
    else if (topRow === threeO) {
      oWins();
      domElems.squares[0].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[1].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[2].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
    } else if (midRow === threeO) {
      oWins();
      domElems.squares[3].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[4].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[5].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
    } else if (botRow === threeO) {
      oWins();
      domElems.squares[6].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[7].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[8].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
    } else if (
      gameBoard[0] === "O" &&
      gameBoard[3] === "O" &&
      gameBoard[6] === "O"
    ) {
      oWins();
      domElems.squares[0].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[3].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[6].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
    } else if (
      gameBoard[1] === "O" &&
      gameBoard[4] === "O" &&
      gameBoard[7] === "O"
    ) {
      oWins();
      domElems.squares[1].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[4].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[7].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
    } else if (
      gameBoard[2] === "O" &&
      gameBoard[5] === "O" &&
      gameBoard[8] === "O"
    ) {
      oWins();
      domElems.squares[2].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[5].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[8].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
    } else if (
      gameBoard[2] === "O" &&
      gameBoard[4] === "O" &&
      gameBoard[6] === "O"
    ) {
      oWins();
      domElems.squares[2].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[4].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[6].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
    } else if (
      gameBoard[0] === "O" &&
      gameBoard[4] === "O" &&
      gameBoard[8] === "O"
    ) {
      oWins();
      domElems.squares[0].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[4].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
      domElems.squares[8].style.boxShadow =
        "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset";
    }
    domElems.btnRestart.addEventListener("click", () => {
      for (let i = 0; i < gameBoard.length; i += 1) {
        domElems.markers[i].innerText = " ";
        domElems.squares[i].style.boxShadow = "none";
        gameBoard[i] = " ";
      }
      domElems.gameEndSpan.innerText = "";
      domElems.gameEnd.style.display = "none";
      addEventToNodes("click", domElems.squares, check);
      currentPlayer = player1;
    });
  });
})();

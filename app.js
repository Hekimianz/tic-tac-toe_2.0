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
    }
  });

  const squaresArr = Array.prototype.slice.call(domElems.squares);
  addEventToNodes("click", domElems.squares, () => {
    gameBoard[squaresArr.indexOf(this)] = player1.marker;
    displayBoard();
  });
})();

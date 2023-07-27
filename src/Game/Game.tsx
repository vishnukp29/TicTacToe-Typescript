import { useState, useEffect } from "react";
import Square from "./Square";
import { toast } from "react-toastify";

type Scores = {
  [key: string]: number;
};

const initGameState = ["", "", "", "", "", "", "", "", ""];
const initScore: Scores = { X: 0, O: 0 };
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Game = () => {
  const [gameState, setGameState] = useState(initGameState);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [scores, setScores] = useState(initScore);

  useEffect(() => {
    const storedScores = localStorage.getItem("scores");
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  useEffect(() => {
    if (gameState === initGameState) {
      return;
    }
    checkForWinner();
  }, gameState);

  const resetBoard = () => setGameState(initGameState);

  const handleWin = () => {
    // window.alert(`Congrats player ${currentPlayer}! You are the winner!`);
    toast.success(`Congrats player ${currentPlayer}! You are the winner!`);

    const newPlayerScore = scores[currentPlayer] + 1;
    const newScores = { ...scores };
    newScores[currentPlayer] = newPlayerScore;
    setScores(newScores);
    localStorage.setItem("scores", JSON.stringify(newScores));
    resetBoard();
  };

  const handleDraw = () => {
    // window.alert("The game ended in a draw");
    toast.info("The game ended in a draw")
    resetBoard();
  };

  const checkForWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winningCombos.length; i++) {
      const winCombo = winningCombos[i];

      let a = gameState[winCombo[0]];
      let b = gameState[winCombo[1]];
      let c = gameState[winCombo[2]];

      if ([a, b, c].includes("")) {
        continue;
      }

      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      setTimeout(() => handleWin(), 500);
      return;
    }

    if (!gameState.includes("")) {
      setTimeout(() => handleDraw(), 500);
      return;
    }

    changePlayer();
  };

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleCellClick = (event: any) => {
    const cellindex = event.target.getAttribute("data-cell-index");

    const currentValue = gameState[cellindex];
    if (currentValue) {
      return;
    }

    const newValues = [...gameState];
    newValues[cellindex] = currentPlayer;
    setGameState(newValues);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-cyan-900 to-fuchsia-800 overflow-hidden">
      <div className="container mx-auto p-2 text-slate-800 ">
        <h1 className="text-center text-5xl mb-4 font-display text-white">
          Tic Tac Toe
        </h1>
        <div>
          <div className="grid grid-cols-3 gap-3 mx-auto w-80 lg:w-96">
            {gameState.map((player, index) => (
              <Square
                key={index}
                onClick={handleCellClick}
                {...{ index, player }}
              />
            ))}
          </div>
          <div className="mx-auto flex flex-col w-80 lg:w-96 text-2xl text-serif border p-2 mt-5 bg-white rounded-md">
            <div className="flex justify-center items-center bg-slate-200 py-1 rounded">
              <p className="text-gray-900 text-lg font-semibold ">
                Next Player: <span>{currentPlayer}</span>
              </p>
            </div>
            <div className="flex justify-between mt-3">
              <p className="text-gray-900 text-lg font-semibold">
                Player X: <span>{scores["X"]} Wins</span>
              </p>
              <p className="text-gray-900 text-lg font-semibold">
                Player O: <span>{scores["O"]} Wins</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Game;

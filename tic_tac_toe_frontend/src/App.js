import React, { useMemo, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import { calculateWinner, isDraw } from "./utils/game";

const INITIAL_SQUARES = Array(9).fill(null);

// PUBLIC_INTERFACE
function App() {
  /** Main Tic Tac Toe app container. */
  const [squares, setSquares] = useState(INITIAL_SQUARES);
  const [xIsNext, setXIsNext] = useState(true);

  const winnerInfo = useMemo(() => calculateWinner(squares), [squares]);
  const draw = useMemo(() => isDraw(squares), [squares]);

  const currentPlayer = xIsNext ? "X" : "O";
  const gameOver = Boolean(winnerInfo.winner) || draw;

  const statusText = winnerInfo.winner
    ? `Winner: ${winnerInfo.winner}`
    : draw
      ? "Draw — no more moves!"
      : `Turn: ${currentPlayer}`;

  // PUBLIC_INTERFACE
  function handlePlay(index) {
    /** Place current player's mark in the chosen square if allowed. */
    if (gameOver) return;
    if (squares[index] !== null) return;

    const nextSquares = squares.slice();
    nextSquares[index] = currentPlayer;

    setSquares(nextSquares);
    setXIsNext((prev) => !prev);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    /** Resets the game state to a new, empty board. */
    setSquares(INITIAL_SQUARES);
    setXIsNext(true);
  }

  return (
    <div className="App">
      <main className="ttt-shell">
        <header className="ttt-header">
          <h1 className="ttt-title">Tic Tac Toe</h1>
          <p className="ttt-subtitle">Local two-player • Retro classic</p>
        </header>

        <section className="ttt-panel" aria-label="Game panel">
          <div
            className={[
              "ttt-status",
              winnerInfo.winner ? "ttt-status--win" : "",
              draw ? "ttt-status--draw" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            role="status"
            aria-live="polite"
            data-testid="status"
          >
            {statusText}
          </div>

          <Board
            squares={squares}
            onPlay={handlePlay}
            disabled={gameOver}
            winningLine={winnerInfo.line}
          />

          <div className="ttt-controls">
            <button type="button" className="ttt-btn" onClick={handleReset}>
              {gameOver ? "New Game" : "Reset"}
            </button>
          </div>
        </section>

        <footer className="ttt-footer">
          <span className="ttt-hint">
            Tip: First to connect three wins. Winning squares light up.
          </span>
        </footer>
      </main>
    </div>
  );
}

export default App;

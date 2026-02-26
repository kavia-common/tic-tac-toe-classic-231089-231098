import React from "react";
import Square from "./Square";

// PUBLIC_INTERFACE
export default function Board({ squares, onPlay, disabled, winningLine }) {
  /** 3x3 tic-tac-toe board grid. */

  return (
    <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
      {squares.map((value, idx) => {
        const isHighlighted = Array.isArray(winningLine) ? winningLine.includes(idx) : false;

        return (
          <Square
            key={idx}
            index={idx}
            value={value}
            onClick={() => onPlay(idx)}
            disabled={disabled || value !== null}
            highlight={isHighlighted}
          />
        );
      })}
    </div>
  );
}

import React from "react";

// PUBLIC_INTERFACE
export default function Square({ value, onClick, disabled, highlight, index }) {
  /** A single tic-tac-toe square button. */
  const label = value ? `Square ${index + 1}, ${value}` : `Square ${index + 1}, empty`;

  return (
    <button
      type="button"
      className={[
        "ttt-square",
        value ? `ttt-square--${value.toLowerCase()}` : "",
        highlight ? "ttt-square--highlight" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {value}
    </button>
  );
}

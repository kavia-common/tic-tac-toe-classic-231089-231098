/**
 * Game utilities for Tic Tac Toe.
 */

export const WINNING_LINES = Object.freeze([
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
]);

// PUBLIC_INTERFACE
export function calculateWinner(squares) {
  /**
   * Calculates winner for the given squares array.
   * @param {Array<"X"|"O"|null>} squares - length 9 array.
   * @returns {{winner: ("X"|"O"|null), line: number[]|null}} Winner and winning line indices.
   */
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return { winner: null, line: null };
}

// PUBLIC_INTERFACE
export function isDraw(squares) {
  /**
   * Returns true if the game is a draw (board full and no winner).
   * @param {Array<"X"|"O"|null>} squares
   * @returns {boolean}
   */
  const { winner } = calculateWinner(squares);
  if (winner) return false;
  return squares.every((sq) => sq !== null);
}

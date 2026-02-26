import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

function getSquares() {
  // Squares are buttons with aria-label "Square N, ..."
  return screen.getAllByRole("button", { name: /Square \d+,/i });
}

test("initially renders an empty board and X to play", () => {
  render(<App />);

  const squares = getSquares();
  expect(squares).toHaveLength(9);

  // Empty board: each square has no text content.
  squares.forEach((sq) => expect(sq).toHaveTextContent(""));

  expect(screen.getByTestId("status")).toHaveTextContent("Turn: X");
});

test("placing marks alternates X then O", () => {
  render(<App />);

  const squares = getSquares();
  fireEvent.click(squares[0]);
  expect(squares[0]).toHaveTextContent("X");
  expect(screen.getByTestId("status")).toHaveTextContent("Turn: O");

  fireEvent.click(squares[1]);
  expect(squares[1]).toHaveTextContent("O");
  expect(screen.getByTestId("status")).toHaveTextContent("Turn: X");
});

test("win detection works and disables further moves", () => {
  render(<App />);

  const squares = getSquares();

  // X wins across top row: 0,1,2
  fireEvent.click(squares[0]); // X
  fireEvent.click(squares[3]); // O
  fireEvent.click(squares[1]); // X
  fireEvent.click(squares[4]); // O
  fireEvent.click(squares[2]); // X -> win

  expect(screen.getByTestId("status")).toHaveTextContent("Winner: X");

  // Attempt another click after game over should do nothing.
  fireEvent.click(squares[5]);
  expect(squares[5]).toHaveTextContent("");
});

test("draw detection works", () => {
  render(<App />);

  const squares = getSquares();

  // Fill board with no winner (classic draw pattern)
  // X O X
  // X O O
  // O X X
  const moves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const sequence = ["X", "O", "X", "O", "X", "O", "X", "O", "X"]; // actual marks are controlled by app turn
  // We'll click in an order that yields draw:
  // X:0 O:1 X:2 O:4 X:3 O:5 X:7 O:6 X:8  (no 3-in-row)
  const clickOrder = [0, 1, 2, 4, 3, 5, 7, 6, 8];
  clickOrder.forEach((i) => fireEvent.click(squares[i]));

  expect(screen.getByTestId("status")).toHaveTextContent("Draw");
  // Board full
  moves.forEach((i) => expect(squares[i].textContent).not.toEqual(""));
  // Sanity: sequence length check to avoid unused var lint? (no-op)
  expect(sequence).toHaveLength(9);
});

test("reset/new game clears the board", () => {
  render(<App />);

  const squares = getSquares();
  fireEvent.click(squares[0]);
  fireEvent.click(squares[1]);
  expect(squares[0]).toHaveTextContent("X");
  expect(squares[1]).toHaveTextContent("O");

  fireEvent.click(screen.getByRole("button", { name: /reset/i }));

  const squaresAfter = getSquares();
  squaresAfter.forEach((sq) => expect(sq).toHaveTextContent(""));
  expect(screen.getByTestId("status")).toHaveTextContent("Turn: X");
});

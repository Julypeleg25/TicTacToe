import { useCallback, useState } from "react";
import usePlayerStore from "../stores/usePlayerStore";
import { Player, players } from "../utils/TicTacToeTypes";
import Square from "./Square";

const squareValues: number[] = Array(9)
  .fill(0)
  .map((_, i) => i + 1);

const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const initBoardState: Record<number, null | Player> = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
  9: null,
};

const Board = () => {
  const { player, setPlayer, resetPlayer } = usePlayerStore();
  const [board, setBoard] =
    useState<Record<number, null | Player>>(initBoardState);

  const isPlayerWon = useCallback(() => {
    return winningCombinations.some((combination) =>
      combination.every((index) => board[index] === player)
    );
  }, [board, player, setBoard]);

  const onSquareClick = useCallback(
    (value: number) => {
      if (board[value] !== null) return;
      setBoard((prev) => ({ ...prev, [value]: player }));
      if (isPlayerWon()) {
        alert(`Player ${player} won! PLAY AGAIN?`);
        resetPlayer();
        setBoard(initBoardState);

        return;
      }
      setPlayer(player === players.X ? players.O : players.X);
    },
    [board, isPlayerWon, player, setPlayer]
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 120px)",
        gridTemplateRows: "repeat(3, 120px)",
      }}
    >
      {Object.entries(board).map(([key, value]) => (
        <Square
          key={key}
          squareKey={Number(key)}
          disabled={value !== null}
          value={value}
          onClick={() => onSquareClick(Number(key))}
        />
      ))}
    </div>
  );
};

export default Board;

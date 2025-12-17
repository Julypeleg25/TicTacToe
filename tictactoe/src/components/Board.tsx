import { useCallback, useState } from "react";
import usePlayerStore from "../stores/usePlayerStore";
import { Player, players } from "../utils/TicTacToeTypes";
import Square from "./Square";
import Modal from "./Modal";

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
  const [winner, setWinner] = useState<Player | null>(null);
  const [showModal, setShowModal] = useState(false);

  const checkWin = useCallback(
    (boardState: Record<number, null | Player>, player: Player) => {
      return winningCombinations.some((combination) =>
        combination.every((index) => boardState[index] === player)
      );
    },
    []
  );

  const isBoardFull = useCallback(
    (boardState: Record<number, null | Player>) => {
      return Object.values(boardState).every((v) => v !== null);
    },
    []
  );

  const onSquareClick = useCallback(
    (value: number) => {
      if (board[value] !== null || winner) return;

      setBoard((prev) => {
        const nextBoard = { ...prev, [value]: player };

        if (checkWin(nextBoard, player)) {
          setWinner(player);
          setShowModal(true);
        } else if (isBoardFull(nextBoard)) {
          setShowModal(true);
        } else {
          setPlayer(player === players.X ? players.O : players.X);
        }

        return nextBoard;
      });
    },
    [board, player, winner, setPlayer, checkWin, isBoardFull]
  );

  const handlePlayAgain = () => {
    resetPlayer();
    setBoard({ ...initBoardState });
    setWinner(null);
    setShowModal(false);
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 120px)",
          gridTemplateRows: "repeat(3, 120px)",
          gap: "5px",
        }}
      >
        {Object.entries(board).map(([key, value]) => (
          <Square
            key={key}
            squareKey={Number(key)}
            disabled={value !== null}
            value={value as Player}
            onClick={() => {
              onSquareClick(Number(key));
            }}
          />
        ))}
      </div>
      <div style={{ marginTop: "20px", fontSize: "24px" }}>{player} Play</div>

      {showModal && <Modal winner={winner} handlePlayAgain={handlePlayAgain} />}
    </div>
  );
};

export default Board;

import { useCallback, useState } from "react";
import usePlayerStore from "../stores/usePlayerStore";
import { Player } from "../utils/types";
import Square from "./Square";
import { DEFAULT_PLAYER, players } from "../utils/consts";
import { Box, Button } from "@mui/material";

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
  const { player, setPlayer } = usePlayerStore();
  const [board, setBoard] =
    useState<Record<number, null | Player>>(initBoardState);
  const [winner, setWinner] = useState<Player | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>();

  const statusMessage = () => {
    if (!isGameOver) {
      return `Next turn: ${player}`;
    } else if (isGameOver && winner) {
      return `Winner: ${player}`;
    }

    return "Draw!";
  };

  const checkWin = useCallback(
    (boardState: Record<number, null | Player>, player: Player) => {
      return winningCombinations.some((combination) =>
        combination.every((index) => boardState[index] === player),
      );
    },
    [],
  );

  const isBoardFull = useCallback(
    (boardState: Record<number, null | Player>) => {
      return Object.values(boardState).every((value) => value !== null);
    },
    [],
  );

  const onSquareClick = useCallback(
    (value: number) => {
      if (board[value] !== null || winner) return;

      setBoard((prev) => {
        const nextBoard = { ...prev, [value]: player };

        if (checkWin(nextBoard, player)) {
          setWinner(player);
          setIsGameOver(true);
        } else if (isBoardFull(nextBoard)) {
          setIsGameOver(true);
        } else {
          setPlayer(player === players.X ? players.O : players.X);
        }

        return nextBoard;
      });
    },
    [board, player, winner, setPlayer, checkWin, isBoardFull],
  );

  const handlePlayAgain = () => {
    setPlayer(DEFAULT_PLAYER);
    setBoard({ ...initBoardState });
    setWinner(null);
    setIsGameOver(false);
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
            disabled={value !== null||isGameOver}
            value={value as Player}
            onClick={() => {
              onSquareClick(Number(key));
            }}
          />
        ))}
      </div>
      <Box
        sx={[
          {
            marginTop: "20px",
            fontSize: "24px",
            display: "flex",
            justifySelf: "center",
            justifyContent: "center",
          },
          winner && {
            borderColor: "primary.main",
            boxShadow: 6,
            transform: "scale(1.02)",
            borderRadius: 2,
            width: "150px",
          },
        ]}
      >
        {statusMessage()}
      </Box>

      {isGameOver && (
        <Button
          variant="contained"
          color="success"
          onClick={handlePlayAgain}
          sx={{ minWidth: 120, mt: 5 }}
        >
          Play Again
        </Button>
      )}
    </div>
  );
};

export default Board;

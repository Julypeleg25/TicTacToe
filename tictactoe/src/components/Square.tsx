import { Player, PlayerToImageSrc } from "../utils/TicTacToeTypes";

interface SquareProps {
  value: Player | null;
  squareKey: number;
  onClick: () => void;
  disabled?: boolean;
}

const Square = (props: SquareProps) => {
  return (
    <div
      style={{
        pointerEvents: props.disabled ? "none" : "auto",
        width: "120px",
        height: "120px",
        border: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "50px",
        cursor: "pointer",
      }}
      onClick={props.onClick}
    >
      {props.value && (
        <img
          width={"80px"}
          height={"80px"}
          src={PlayerToImageSrc[props.value]}
        />
      )}
    </div>
  );
};

export default Square;

interface SquareProps {
  value: number;
  onClick: () => void;
}

const Square = (props: SquareProps) => {
  return (
    <div
      style={{
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
      {props.value}
    </div>
  );
};

export default Square;

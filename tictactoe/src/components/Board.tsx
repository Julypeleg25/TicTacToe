import Square from "./Square";

const squareValues: number[] = Array(9)
  .fill(0)
  .map((_, i) => i + 1);

const Board = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 120px)",
        gridTemplateRows: "repeat(3, 120px)",
      }}
    >
      {squareValues.map((value) => (
        <Square
          key={value}
          value={value}
          onClick={() => alert("Square clicked!"+value)}
        />
      ))}
    </div>
  );
};

export default Board;

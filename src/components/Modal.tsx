interface ModalProps {
  winner: string | null;
  handlePlayAgain: () => void;
}

const Modal = (props: ModalProps) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "8px",
          textAlign: "center",
          minWidth: "300px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          {props.winner ? `Player ${props.winner} won!` : "It's a draw!"}
        </h2>
        <button
          onClick={props.handlePlayAgain}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Modal;

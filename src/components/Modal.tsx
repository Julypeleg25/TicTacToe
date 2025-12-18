import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

interface ModalProps {
  winner: string | null;
  handlePlayAgain: () => void;
}

const WinModal = (props: ModalProps) => {
  return (
    <Dialog
      open={true}
      onClose={props.handlePlayAgain}
      aria-labelledby="winner-dialog-title"
      PaperProps={{
        sx: {
          minWidth: 280,
          borderRadius: 2,
          p: 2,
          textAlign: "center",
        },
      }}
    >
      <DialogTitle id="winner-dialog-title">
        {props.winner ? `Player ${props.winner} won!` : "It's a draw!"}
      </DialogTitle>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          variant="contained"
          color="success"
          onClick={props.handlePlayAgain}
          sx={{ minWidth: 120 }}
        >
          Play Again
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WinModal;
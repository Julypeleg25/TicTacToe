import { create } from "zustand";
import { Player, playerArray } from "../utils/TicTacToeTypes";

interface PlayerState {
  player: Player;
  setPlayer: (player: Player) => void;
  resetPlayer: () => void;
}

const DEFAULT_PLAYER = playerArray[0] as Player;

const usePlayerStore = create<PlayerState>((set) => ({
  player: DEFAULT_PLAYER,
  setPlayer: (player) => set({ player }),
  resetPlayer: () => set({ player: DEFAULT_PLAYER }),
}));

export default usePlayerStore;

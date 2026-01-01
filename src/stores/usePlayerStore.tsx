import { create } from "zustand";
import { Player } from "../utils/types";
import { DEFAULT_PLAYER } from "../utils/consts";

interface PlayerState {
  player: Player;
  setPlayer: (player: Player) => void;
}


const usePlayerStore = create<PlayerState>((set) => ({
  player: DEFAULT_PLAYER,
  setPlayer: (player) => set({ player }),
}));

export default usePlayerStore;

import { Player } from "./types";
import xMark from '../assets/xMark.png';
import circleMark from '../assets/circleMark.png';

export const players = {
  X: "X",
  O: "O",
} as const;

export const playerArray: Player[] = [players.X, players.O];

export const DEFAULT_PLAYER = playerArray[0] as Player;


export const playerToImageSrcMap: Record<Player, string> = {
  [players.X]: xMark,
  [players.O]: circleMark,
};


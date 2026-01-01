import xMark from '@/assets/xMark.png';
import circleMark from '@/assets/circleMark.png';

export const players = {
  X: "X",
  O: "O",
} as const;
export type Player = (typeof players)[keyof typeof players];

export const PlayerToImageSrc: Record<Player, string> = {
  [players.X]: xMark,
  [players.O]: circleMark,
};

export const playerArray: Player[] = [players.X, players.O];

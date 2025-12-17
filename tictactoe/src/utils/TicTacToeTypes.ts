export const Player = {
  X: "X",
  O: "O",
} as const;
export type Player = (typeof Player)[keyof typeof Player];

export const PlayerToImageSrc: Record<Player, string> = {
  [Player.X]: "assets/xMark.png",
  [Player.O]: "assets/oMark.png",
};

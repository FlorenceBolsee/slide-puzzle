const X = "--x";
const Y = "--y";

type PieceRaw = {
  src: string;
  win: number;
};

type PieceRender = PieceRaw & {
  position: number;
};

export { X, Y, PieceRaw, PieceRender };

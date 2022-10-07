import React from "react";
import { X, Y, PieceRender } from "./variables";

const Piece = ({ piece, freeSpot, handleClick }: PieceProps) => {
  const getRowAndCol = (position: number) => {
    const currentPosition = position - 1;
    return {
      col: currentPosition % 3,
      row: (currentPosition - (currentPosition % 3)) / 3,
    };
  };

  const { col, row } = getRowAndCol(piece.position);
  const styling = {};
  styling[X] = `${col * 100}px`;
  styling[Y] = `${row * 100}px`;

  const checkIfMovable = (
    position: number,
    direction: string,
    target: string
  ) => {
    const currentFreeSpot = getRowAndCol(freeSpot);
    const currentPiece = getRowAndCol(position);
    if (currentFreeSpot[direction] === currentPiece[direction]) {
      if (currentPiece[target] === currentFreeSpot[target] + 1) {
        return 1;
      }
      if (currentPiece[target] === currentFreeSpot[target] - 1) {
        return -1;
      }
    }
  };

  const movableY = checkIfMovable(piece.position, "col", "row");
  const movableX = checkIfMovable(piece.position, "row", "col");

  return (
    <button
      className="puzzle-piece-container"
      data-win={piece.win}
      data-y={movableY}
      data-x={movableX}
      style={styling}
      onClick={(event) => handleClick(event)}
    >
      <img
        alt=""
        className="puzzle-piece"
        src={piece.src}
        height="100"
        width="100"
      />
    </button>
  );
};

type PieceProps = {
  piece: PieceRender;
  freeSpot: number;
  handleClick: (event: React.MouseEvent) => void;
  key: number;
};

export default Piece;

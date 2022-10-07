import Piece from "./Piece";
import { PieceRender } from "./variables";

const Puzzle = ({ pieces, solved, handleClick, freeSpot }) => {
  return (
    <div className={`puzzle-board ${!solved ? "unsolved" : ""}`}>
      {pieces.map((piece: PieceRender, i: number) => {
        return (
          <Piece
            piece={piece}
            freeSpot={freeSpot}
            key={i}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
};

export default Puzzle;

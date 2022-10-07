import { useState, useEffect, StrictMode } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { movablePieces, missingPiece, shuffle } from "./puzzleInit";
import Puzzle from "./Puzzle";
import { X, Y, PieceRender } from "./variables";

const App = () => {
  const [freeSpot, setFreeSpot] = useState(9);
  const [pieces, setPieces] = useState<PieceRender[]>([]);
  const [solvable, setSolvable] = useState(false);
  const [solved, setSolved] = useState(false);
  const [moveCount, setMoveCount] = useState(0);

  useEffect(() => {
    if (!solvable) {
      findSolvable();
    }
  }, [solved]); //eslint-disable-line

  useEffect(() => {
    function checkIfSolved() {
      if (
        !pieces.find((piece: PieceRender) => piece.win != piece.position) &&
        !solved
      ) {
        const completePuzzle = [
          ...pieces,
          {
            src: missingPiece.src,
            position: 9,
            win: 9,
          },
        ];
        setPieces(completePuzzle);
        setSolved(true);
      }
    }
    if (solvable) {
      checkIfSolved();
    }
  }, [pieces, solved, solvable, freeSpot]);

  function findSolvable() {
    const solvablePuzzle = shuffle(movablePieces);
    setTimeout(() => {
      setPieces(solvablePuzzle);
      setSolvable(true);
    }, 1000);
  }

  const handleMove = (
    target: HTMLElement,
    pieces: PieceRender[],
    piece: number,
    direction: string,
    move: number
  ) => {
    const currentPosition = parseInt(
      getComputedStyle(target).getPropertyValue(direction),
      10
    );
    const currentMove = move * 100;
    const currentPieces = pieces;
    target.style.setProperty(direction, `${currentPosition - currentMove}px`);
    const oldPosition = currentPieces[piece].position;
    currentPieces[piece].position = freeSpot;

    setFreeSpot(oldPosition);
    setPieces(currentPieces);
    setMoveCount(moveCount + 1);
  };

  const handleClick = (event: React.MouseEvent) => {
    if (solved) return;

    const currentTarget = event.currentTarget as HTMLButtonElement;
    const currentImage = currentTarget.querySelector("img");
    const currentImageSrc = currentImage ? currentImage.src : "";
    const currentPieces = [...pieces];
    const currentPiece = pieces.findIndex(
      (el: { src: string }) => el.src === currentImageSrc
    );
    const { x, y } = currentTarget.dataset;

    if (x) {
      handleMove(
        currentTarget,
        currentPieces,
        currentPiece,
        X,
        parseInt(x, 10)
      );
    }

    if (y) {
      handleMove(
        currentTarget,
        currentPieces,
        currentPiece,
        Y,
        parseInt(y, 10)
      );
    }
  };

  const boundHandleClick = handleClick.bind(this);

  const reset = () => {
    setFreeSpot(9);
    setPieces([]);
    setSolvable(false);
    setSolved(false);
    setMoveCount(0);
  };

  return (
    <div className="puzzle">
      {solvable && pieces.length ? (
        <div>
          <Puzzle
            pieces={pieces}
            solved={solved}
            freeSpot={freeSpot}
            handleClick={boundHandleClick}
          />
          <div className="puzzle-info">
            <span>Move count: {moveCount}</span>
            {solved ? (
              <span className="puzzle-win">
                Finished!
                <button className="puzzle-start" onClick={reset}>
                  <FontAwesomeIcon icon={faArrowsRotate} />
                </button>
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div className="puzzle-loading">
          <svg
            id="mainSVG"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 600"
          >
            <g id="whole" fill="#033E69" stroke="#033E69" strokeWidth="2">
              <circle cx="328" cy="300" r="13" />
              <circle cx="364" cy="300" r="13" />
              <circle cx="400" cy="300" r="13" />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
};

// ========================================

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);

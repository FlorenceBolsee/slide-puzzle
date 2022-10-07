const getInvCount = (arr: number[]) => {
  let inv_count = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = i + 1; j < 9; j++) {
      if (arr[j] > 0 && arr[i] > 0 && arr[i] > arr[j]) {
        inv_count += 1;
      }
    }
  }
  return inv_count;
};

const isSolvable = (puzzle: PiecesRender[]) => {
  if (puzzle.length) {
    const checkSolvable = puzzle.map((piece) => {
      return piece.win;
    });
    checkSolvable.push(0);
    // Count inversions in given 8 puzzle
    const invCount = getInvCount(checkSolvable);
    // return true if inversion count is even.
    return invCount % 2 == 0 && invCount > 15;
  }
};

const renderPuzzle = (puzzleRaw: PiecesRaw[]) => {
  return puzzleRaw.map((piece, i) => {
    return {
      src: piece.src,
      position: i + 1,
      win: piece.win,
    };
  });
};

const movablePieces = [
  {
    src: "https://live.staticflickr.com/65535/52387921049_5fb3e93a1f_o.png",
    win: 1,
  },
  {
    src: "https://live.staticflickr.com/65535/52386687432_7373548d82_o.png",
    win: 2,
  },
  {
    src: "https://live.staticflickr.com/65535/52388042875_b69e357d52_o.png",
    win: 3,
  },
  {
    src: "https://live.staticflickr.com/65535/52387921064_22e58e8a09_o.png",
    win: 4,
  },
  {
    src: "https://live.staticflickr.com/65535/52387855433_a029a4e0d4_o.png",
    win: 5,
  },
  {
    src: "https://live.staticflickr.com/65535/52386687457_7d228c5eff_o.png",
    win: 6,
  },
  {
    src: "https://live.staticflickr.com/65535/52387855458_d1a6b2979a_o.png",
    win: 7,
  },
  {
    src: "https://live.staticflickr.com/65535/52387855473_2349e25a7d_o.png",
    win: 8,
  },
];
const missingPiece = {
  src: "https://live.staticflickr.com/65535/52387616076_b2641e769a_o.png",
  win: 9,
};
const shuffle = (pieces: PiecesRaw[]) => {
  let renderShuffle: PiecesRender[] = [];
  while (!isSolvable(renderShuffle)) {
    const shuffled = pieces.sort(() => {
      return Math.random() - 0.5;
    });
    renderShuffle = renderPuzzle(shuffled);
  }
  return renderShuffle;
};

type PiecesRaw = {
  src: string;
  win: number;
};

type PiecesRender = {
  src: string;
  win: number;
  position: number;
};

export { movablePieces, missingPiece, shuffle };

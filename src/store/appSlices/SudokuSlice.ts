import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ClickedSudoku = {
  rowIndex: number | null;
  index: number | null;
};

type SudokuState = {
  clickedSudoku: ClickedSudoku;
  rows: number[][];
  originRows: number[][];
  numbers: number[][];
  numberIsValid: boolean[][];
  isSolving: boolean;
  isSolveClickAnimate: boolean;
  isSolveClicked: boolean;
  solvingTime: number;
  isResetClickAnimate: boolean;
  numberAnimate: string[][];
  isGenerateClickAnimate: boolean;
  numberOfGenerate: number;
  isGenerated: boolean;
  isSendEmailClickAnimate: boolean;
  isSendingEmail: boolean;
};

const initialState: SudokuState = {
  clickedSudoku: { rowIndex: null, index: null },
  rows: Array(9)
    .fill(0)
    .map(() => new Array(9).fill(0)),
  originRows: Array(9)
    .fill(0)
    .map(() => new Array(9).fill(0) as number[]),
  numbers: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  numberIsValid: Array(3)
    .fill(0)
    .map(() => new Array(3).fill(true) as boolean[]),
  isSolving: false,
  isSolveClickAnimate: false,
  isSolveClicked: false,
  solvingTime: 0,
  isResetClickAnimate: false,
  numberAnimate: Array(3)
    .fill(0)
    .map(() => new Array(3).fill('none') as string[]),
  isGenerateClickAnimate: false,
  numberOfGenerate: 10,
  isGenerated: false,
  isSendEmailClickAnimate: false,
  isSendingEmail: false,
};

const sudokuSlice = createSlice({
  name: 'sudoku',
  initialState,
  reducers: {
    setClickedSudoku(state, action: PayloadAction<ClickedSudoku>) {
      state.clickedSudoku = action.payload;
    },
    setRows(state, action: PayloadAction<number[][]>) {
      state.rows = action.payload;
    },
    setOriginRows(state, action: PayloadAction<number[][]>) {
      state.originRows = action.payload;
    },
    setNumbers(state, action: PayloadAction<number[][]>) {
      state.numbers = action.payload;
    },
    setNumberIsValid(state, action: PayloadAction<boolean[][]>) {
      state.numberIsValid = action.payload;
    },
    setIsSolving(state, action: PayloadAction<boolean>) {
      state.isSolving = action.payload;
    },
    setIsSolveClickAnimate(state, action: PayloadAction<boolean>) {
      state.isSolveClickAnimate = action.payload;
    },
    setIsSolveClicked(state, action: PayloadAction<boolean>) {
      state.isSolveClicked = action.payload;
    },
    setSolvingTime(state, action: PayloadAction<number>) {
      state.solvingTime = action.payload;
    },
    setIsResetClickAnimate(state, action: PayloadAction<boolean>) {
      state.isResetClickAnimate = action.payload;
    },
    setNumberAnimate(state, action: PayloadAction<string[][]>) {
      state.numberAnimate = action.payload;
    },
    setIsGenerateClickAnimate(state, action: PayloadAction<boolean>) {
      state.isGenerateClickAnimate = action.payload;
    },
    setNumberOfGenerate(state, action: PayloadAction<number>) {
      state.numberOfGenerate = action.payload;
    },
    setIsGenerated(state, action: PayloadAction<boolean>) {
      state.isGenerated = action.payload;
    },
    setIsSendEmailClickAnimate(state, action: PayloadAction<boolean>) {
      state.isSendEmailClickAnimate = action.payload;
    },
    setIsSendingEmail(state, action: PayloadAction<boolean>) {
      state.isSendingEmail = action.payload;
    },
  },
});

export const sudokuActions = sudokuSlice.actions;
export default sudokuSlice.reducer;

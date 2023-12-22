import { configureStore } from '@reduxjs/toolkit';

import sudokuReducer from './appSlices/SudokuSlice';
import formReducer from './appSlices/FormSlice';

export const store = configureStore({
  reducer: {
    sudoku: sudokuReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

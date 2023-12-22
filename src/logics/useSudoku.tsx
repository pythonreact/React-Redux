import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useReduxDispatch, useReduxSelector } from '../store/ReduxTypes';
import { sudokuActions } from '../store/appSlices/SudokuSlice';
import TableSudoku from '../components/sudoku/TableSudoku';
import TableNumbers from '../components/sudoku/TableNumbers';
import TableMeta from '../components/sudoku/TableMeta';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import axios, { AxiosError } from 'axios';

export const useSudoku = () => {
  const dispatch = useReduxDispatch();
  const rows = useReduxSelector((state) => state.sudoku.rows);
  const numbers = useReduxSelector((state) => state.sudoku.numbers);
  const numberIsValid = useReduxSelector((state) => state.sudoku.numberIsValid);
  const clickedSudoku = useReduxSelector((state) => state.sudoku.clickedSudoku);
  const isSolving = useReduxSelector((state) => state.sudoku.isSolving);
  const isSolveClicked = useReduxSelector((state) => state.sudoku.isSolveClicked);
  const solvingTime = useReduxSelector((state) => state.sudoku.solvingTime);
  const numberAnimate = useReduxSelector((state) => state.sudoku.numberAnimate);
  const numberOfGenerate = useReduxSelector((state) => state.sudoku.numberOfGenerate);

  const { t } = useTranslation(['home', 'form', 'sudoku']);
  const textSolveError = t('solveError', { ns: ['sudoku'] });
  const textSudokuSolved = t('sudokuSolved', { ns: ['sudoku'] });
  const textAxiosFailed = t('axiosFailed', { ns: ['sudoku'] });
  const textAxiosError = t('axiosError', { ns: ['sudoku'] });
  const textAxiosSuccess = t('axiosSuccess', { ns: ['sudoku'] });

  const timeValueRef = useRef(Date.now());
  const [init, setInit] = useState(false);
  const rows_ = useRef(rows);

  const modifyArray = (
    array: boolean[][] | number[][] | string[][],
    i: number,
    j: number,
    newValue: boolean | number | string,
  ): any => {
    return array.map((innerArray, index) => {
      if (index === i)
        return innerArray.map((item, index) => {
          if (index === j) return newValue;
          return item;
        });
      return innerArray;
    });
  };

  const existingNumbers = useCallback((Rows: number[][], rowIndex: number, index: number) => {
    const set = new Set();
    Rows.map((row, rowIndex_) => {
      row.map((item, index_) => {
        if (rowIndex_ === rowIndex) set.add(item);
        if (index_ === index) set.add(item);
      });
    });
    const rowIndex_ = rowIndex - (rowIndex % 3);
    const index_ = index - (index % 3);

    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++) set.add(Rows[i + rowIndex_][j + index_]);
    set.delete(0);
    return Array.from(set).sort() as number[];
  }, []);

  const validate = (rowIndex: number, index: number) => {
    let arrayNumberIsValid = [...numberIsValid];
    for (let i = 1; i < 10; i++) {
      const m = i % 3;
      const y = i < 4 ? 0 : i < 7 ? 1 : 2;
      const x = m === 0 ? 2 : m - 1;
      if (!existingNumbers(rows, rowIndex, index).includes(i)) {
        arrayNumberIsValid = modifyArray(arrayNumberIsValid, y, x, true);
      } else arrayNumberIsValid = modifyArray(arrayNumberIsValid, y, x, false);
    }
    dispatch(sudokuActions.setNumberIsValid(arrayNumberIsValid));
  };

  const chooseInput = (rowIndex: number, index: number, value: number) => {
    const arrayRows = modifyArray(rows, rowIndex, index, value) as number[][];
    dispatch(sudokuActions.setRows(arrayRows));
    dispatch(
      sudokuActions.setClickedSudoku({
        rowIndex: null,
        index: null,
      }),
    );

    if (value !== 0 && !arrayRows.some((row) => row.includes(0))) toast.success(textSudokuSolved);
  };

  const onSudokuClick = (rowIndex: number, index: number) => {
    const hasValue = rows[rowIndex][index] !== 0;
    const isClicked = clickedSudoku.rowIndex === rowIndex && clickedSudoku.index === index;
    dispatch(
      sudokuActions.setClickedSudoku({
        rowIndex: !isClicked ? rowIndex : null,
        index: !isClicked ? index : null,
      }),
    );
    if (hasValue) {
      chooseInput(rowIndex, index, 0);
    }
    validate(rowIndex, index);
    if (isSolveClicked) dispatch(sudokuActions.setIsSolveClicked(false));
    if (solvingTime > 0) dispatch(sudokuActions.setSolvingTime(0));
    if (!init) setInit(true);
  };

  const onNumberClick = (rowIndex: number, index: number) => {
    const arrayNumberAnimate = modifyArray(numberAnimate, rowIndex, index, 'on');
    dispatch(sudokuActions.setNumberAnimate(arrayNumberAnimate));
  };

  const onNumber = (rowIndex: number, index: number) => {
    const arrayNumberAnimate = modifyArray(numberAnimate, rowIndex, index, 'none');
    dispatch(sudokuActions.setNumberAnimate(arrayNumberAnimate));

    const arrayNumberIsValid = modifyArray(numberIsValid, rowIndex, index, false);
    dispatch(sudokuActions.setNumberIsValid(arrayNumberIsValid));
    chooseInput(
      clickedSudoku.rowIndex as number,
      clickedSudoku.index as number,
      numbers[rowIndex][index],
    );

    if (!init) setInit(true);
  };

  const solveSudoku = useCallback(
    async (rowIndex: number, index: number): Promise<boolean> => {
      if (rowIndex === 8 && index === 9) return true;
      if (index === 9) {
        rowIndex++;
        index = 0;
      }
      if (rows_.current[rowIndex][index] !== 0) {
        return solveSudoku(rowIndex, index + 1);
      }

      const existing = existingNumbers(rows_.current, rowIndex, index);
      for (let num = 1; num < 10; num++) {
        if (!existing.includes(num)) {
          rows_.current[rowIndex][index] = num;
          if (await solveSudoku(rowIndex, index + 1)) return true;
        }
        rows_.current[rowIndex][index] = 0;
      }
      return false;
    },
    [existingNumbers],
  );

  const onSolveClick = () => {
    dispatch(sudokuActions.setIsSolveClickAnimate(true));
  };

  const onSolve = () => {
    dispatch(sudokuActions.setIsSolveClickAnimate(false));
    dispatch(sudokuActions.setIsSolving(true));
    dispatch(sudokuActions.setIsSolveClicked(true));
    dispatch(sudokuActions.setOriginRows(structuredClone(rows)));
    dispatch(
      sudokuActions.setNumberIsValid(
        Array(3)
          .fill(0)
          .map(() => new Array(3).fill(false) as boolean[]),
      ),
    );
    if (!init) setInit(true);
    rows_.current = structuredClone(rows);
  };

  const onResetClick = () => {
    dispatch(sudokuActions.setIsResetClickAnimate(true));
  };

  const onReset = () => {
    dispatch(sudokuActions.setIsResetClickAnimate(false));
    dispatch(
      sudokuActions.setRows(
        Array(9)
          .fill(0)
          .map(() => new Array(9).fill(0) as number[]),
      ),
    );
    dispatch(
      sudokuActions.setOriginRows(
        Array(9)
          .fill(0)
          .map(() => new Array(9).fill(0) as number[]),
      ),
    );
    dispatch(
      sudokuActions.setNumberIsValid(
        Array(3)
          .fill(0)
          .map(() => new Array(3).fill(true) as boolean[]),
      ),
    );
    dispatch(
      sudokuActions.setClickedSudoku({
        rowIndex: null,
        index: null,
      }),
    );
    dispatch(sudokuActions.setIsSolving(false));
    dispatch(sudokuActions.setIsSolveClicked(false));
    dispatch(sudokuActions.setIsSolveClickAnimate(false));
    dispatch(sudokuActions.setSolvingTime(0));
    dispatch(sudokuActions.setIsGenerated(false));
    setInit(true);
  };

  const onSendEmailClick = () => {
    dispatch(sudokuActions.setIsSendEmailClickAnimate(true));
  };

  const axiosSendEmail = async (sudoku: string) => {
    const token = '';
    let isError = false;
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://httpbin.org/post',
        data: sudoku ? sudoku : null,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      const data = await response.data;
      isError = false;
      toast.success(textAxiosSuccess);
      return data;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401 && isError === false) {
        isError = true;
        try {
          // await Token refreshing
          // return axiosSendEmail(sudoku);
        } catch (error) {
          const errorResponse = `${error ? error : textAxiosError}`;
          toast.error(errorResponse);
          return errorResponse;
        }
      } else {
        isError = false;
        const errorResponse = `${err.message ? err.message : textAxiosFailed}`;
        toast.error(errorResponse);
        return errorResponse;
      }
    }
  };

  const onSendEmail = async () => {
    dispatch(sudokuActions.setIsSendEmailClickAnimate(false));
    dispatch(sudokuActions.setIsSendingEmail(true));
    const sudoku = JSON.stringify(rows);
    const response = await axiosSendEmail(sudoku);
    if (response) dispatch(sudokuActions.setIsSendingEmail(false));
  };

  const onGenerateClick = () => {
    dispatch(sudokuActions.setIsGenerateClickAnimate(true));
  };

  const randomValue = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const onGenerate = () => {
    dispatch(sudokuActions.setIsGenerateClickAnimate(false));
    if (rows.some((row) => row.includes(0))) {
      let generatedRows = structuredClone(rows);
      for (let i = 1; i <= numberOfGenerate; i++) {
        let rowIndex: number;
        let index: number;
        let availableNumbers;
        do {
          availableNumbers = new Set();
          do {
            rowIndex = randomValue(0, 8);
            index = randomValue(0, 8);
          } while (rows[rowIndex][index] !== 0);
          for (let num = 1; num < 10; num++) {
            if (!existingNumbers(generatedRows, rowIndex, index).includes(num))
              availableNumbers.add(num);
          }
        } while (Array.from(availableNumbers).length === 0);
        const arrayAvailableNumbers = Array.from(availableNumbers) as number[];

        generatedRows = modifyArray(
          generatedRows,
          rowIndex,
          index,
          arrayAvailableNumbers[randomValue(0, arrayAvailableNumbers.length - 1)],
        );
      }
      dispatch(sudokuActions.setRows(generatedRows));
      dispatch(sudokuActions.setOriginRows(structuredClone(generatedRows)));
    }
    dispatch(sudokuActions.setIsGenerated(true));
  };

  const solvingSudoku = useCallback(async () => {
    const response = await solveSudoku(0, 0);
    if (response) {
      const time = Date.now() - timeValueRef.current;
      dispatch(sudokuActions.setSolvingTime(time));
      dispatch(sudokuActions.setRows(rows_.current));
      dispatch(sudokuActions.setIsSolving(false));
    } else {
      dispatch(sudokuActions.setRows(rows_.current));
      dispatch(sudokuActions.setIsSolving(false));
      toast.error(textSolveError);
    }
  }, [solveSudoku, textSolveError, dispatch]);

  useEffect(() => {
    if (isSolving) {
      timeValueRef.current = Date.now();
      solvingSudoku();
    }
  }, [isSolving, solvingSudoku]);

  useEffect(() => {
    if (init) {
      window.localStorage.setItem('SUDOKU_APP_STATE', JSON.stringify(rows));
      setInit(false);
    }
  }, [init, rows]);

  useEffect(() => {
    const data = window.localStorage.getItem('SUDOKU_APP_STATE');
    if (data !== null) dispatch(sudokuActions.setRows(JSON.parse(data)));
  }, [dispatch]);

  const Table = () => {
    return (
      <>
        <div className=" flex justify-center items-center h-[calc(100vh-(1.7vw+3vh)-7vh)]">
          <div className="mx-10">
            <TableSudoku onSudokuClick={onSudokuClick} />
          </div>
          <div className="mx-10">
            <TableNumbers onNumberClick={onNumberClick} onNumber={onNumber} />
            <TableMeta
              onSolveClick={onSolveClick}
              onSolve={onSolve}
              onResetClick={onResetClick}
              onReset={onReset}
              onSendEmailClick={onSendEmailClick}
              onSendEmail={onSendEmail}
              onGenerateClick={onGenerateClick}
              onGenerate={onGenerate}
            />
          </div>
        </div>
      </>
    );
  };

  return { Table };
};

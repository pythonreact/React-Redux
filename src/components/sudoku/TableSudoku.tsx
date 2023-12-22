import React from 'react';
import { useReduxSelector } from '../../store/ReduxTypes';

type TableSudokuProps = {
  onSudokuClick: (rowIndex: number, index: number) => void;
};

const TableSudoku: React.FC<TableSudokuProps> = ({ onSudokuClick }) => {
  const rows = useReduxSelector((state) => state.sudoku.rows);
  const originRows = useReduxSelector((state) => state.sudoku.originRows);
  const clickedSudoku = useReduxSelector((state) => state.sudoku.clickedSudoku);
  const isSolving = useReduxSelector((state) => state.sudoku.isSolving);

  return (
    <>
      <table className="mt-1">
        <thead />
        <tbody className="border-slate-500 border-[5px] shadow-[7px_7px_0px_rgba(117,110,110,0.5)]">
          {rows.map((row, rowIndex) => {
            const puzzleB = rowIndex === 2 || rowIndex === 5;
            return (
              <tr key={rowIndex}>
                <>
                  {row.map((item, index) => {
                    const puzzleR = index === 2 || index === 5;
                    const isEmpty = item === 0;
                    const isClicked =
                      clickedSudoku.rowIndex === rowIndex && clickedSudoku.index === index;
                    return (
                      <td
                        key={index}
                        className={`${
                          isEmpty
                            ? 'p-[7px] mobile:p-[7px]'
                            : 'text-blue-500 pt-[11px] pl-[11px] pr-[3px] pb-[3px] mobile:pt-[11px] mobile:pl-[9px] mobile:pr-[5px] mobile:pb-[3px]'
                        }
                          ${isEmpty && isSolving && 'text-blue-500'}
                            ${puzzleR && 'border-r-[5px] border-slate-500'}
                            ${puzzleB && 'border-b-[5px] border-slate-500'}
                            `}
                      >
                        <div className="flex justify-center items-center border border-slate-500 cursor-pointer">
                          <button
                            className={`flex items-center justify-center w-[calc(6vh)] h-[calc(6vh)] mobile:w-[calc(1.7vw+1vh)] mobile:h-[calc(1.7vw+1vh)]
                            ${
                              isEmpty &&
                              'shadow-[5px_5px_0px_rgba(117,110,110,0.7)] mobile:shadow-[3px_3px_0px_rgba(117,110,110,0.7)]'
                            }
                                ${isClicked && 'bg-blue-100'}
                                `}
                            onClick={() => onSudokuClick(rowIndex, index)}
                          >
                            {item !== 0 && (
                              <span
                                className={`text-[calc(2.5vh)] mobile:text-[calc(4vh)] ${
                                  originRows[rowIndex][index] !== 0 ? 'text-blue-500' : 'text-black'
                                }`}
                              >
                                {item}
                              </span>
                            )}
                          </button>
                        </div>
                      </td>
                    );
                  })}
                </>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TableSudoku;

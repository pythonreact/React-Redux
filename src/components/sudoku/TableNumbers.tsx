import React from 'react';
import { useTranslation } from 'react-i18next';
import { useReduxSelector } from '../../store/ReduxTypes';

type TableNumbersPropsType = {
  onNumberClick: (rowIndex: number, index: number) => void;
  onNumber: (rowIndex: number, index: number) => void;
};

const TableNumbers: React.FC<TableNumbersPropsType> = ({ onNumberClick, onNumber }) => {
  const numbers = useReduxSelector((state) => state.sudoku.numbers);
  const numberIsValid = useReduxSelector((state) => state.sudoku.numberIsValid);
  const clickedSudoku = useReduxSelector((state) => state.sudoku.clickedSudoku);
  const numberAnimate = useReduxSelector((state) => state.sudoku.numberAnimate);

  const { t } = useTranslation(['home', 'form', 'sudoku']);
  const textAvailable = t('available', { ns: ['sudoku'] });

  return (
    <>
      <div className="flex justify-center mb-[5px] text-[calc(2.5vh)] mobile:text-[calc(1vw+1vh)]">
        {textAvailable}
      </div>
      <table>
        <thead />
        <tbody className="border-slate-500 border-[5px] shadow-[7px_7px_0px_rgba(117,110,110,0.5)]">
          {numbers.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                <>
                  {row.map((item, index) => {
                    const isValid = numberIsValid[rowIndex][index];
                    const isEmptySudoku = clickedSudoku.rowIndex === null;

                    return (
                      <td
                        key={index}
                        className={`${
                          isValid
                            ? 'p-[7px] mobile:p-[7px]'
                            : 'text-red-500 pt-[11px] pl-[11px] pr-[3px] pb-[3px] mobile:pt-[11px] mobile:pl-[9px] mobile:pr-[5px] mobile:pb-[3px]'
                        }`}
                      >
                        <div
                          className={`flex justify-center items-center border border-slate-500
                        ${
                          numberAnimate[rowIndex][index] === 'on' &&
                          'animate-clickOn mobile:animate-clickOnMobile'
                        }`}
                          onAnimationEnd={() => {
                            onNumber(rowIndex, index);
                          }}
                        >
                          <button
                            className={`flex items-center justify-center w-[calc(6vh)] h-[calc(6vh)] mobile:w-[calc(5vh)] mobile:h-[calc(5vh)] disabled:cursor-default 
                              ${
                                isValid &&
                                'shadow-[5px_5px_0px_rgba(117,110,110,0.7)] mobile:shadow-[3px_3px_0px_rgba(117,110,110,0.7)] cursor-pointer'
                              }`}
                            onClick={() => onNumberClick(rowIndex, index)}
                            disabled={isEmptySudoku || !isValid}
                          >
                            {item !== 0 && (
                              <span className="text-[calc(2.5vh)] mobile:text-[calc(4vh)]">
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

export default TableNumbers;

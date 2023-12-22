import React from 'react';
import { useTranslation } from 'react-i18next';
import { useReduxSelector } from '../../store/ReduxTypes';

type TableMetaPropsType = {
  onSolveClick: () => void;
  onSolve: () => void;
  onResetClick: () => void;
  onReset: () => void;
  onSendEmailClick: () => void;
  onSendEmail: () => void;
  onGenerateClick: () => void;
  onGenerate: () => void;
};

const TableMeta: React.FC<TableMetaPropsType> = ({
  onSolveClick,
  onSolve,
  onResetClick,
  onReset,
  onSendEmailClick,
  onSendEmail,
  onGenerateClick,
  onGenerate,
}) => {
  const isSolveClickAnimate = useReduxSelector((state) => state.sudoku.isSolveClickAnimate);
  const isSolving = useReduxSelector((state) => state.sudoku.isSolving);
  const isSolveClicked = useReduxSelector((state) => state.sudoku.isSolveClicked);
  const solvingTime = useReduxSelector((state) => state.sudoku.solvingTime);
  const isResetClickAnimate = useReduxSelector((state) => state.sudoku.isResetClickAnimate);
  const isSendEmailClickAnimate = useReduxSelector((state) => state.sudoku.isSendEmailClickAnimate);
  const isSendingEmail = useReduxSelector((state) => state.sudoku.isSendingEmail);
  const isSubscribed = useReduxSelector((state) => state.form.isSubscribed);
  const isGenerateClickAnimate = useReduxSelector((state) => state.sudoku.isGenerateClickAnimate);
  const isGenerated = useReduxSelector((state) => state.sudoku.isGenerated);

  const { t } = useTranslation(['home', 'form', 'sudoku']);
  const textSolve = t('solve', { ns: ['sudoku'] });
  const textSolvedIn = t('solvedIn', { ns: ['sudoku'] });
  const textSolving = t('solving', { ns: ['sudoku'] });
  const textReset = t('reset', { ns: ['sudoku'] });
  const textSendEmail = t('sendEmail', { ns: ['sudoku'] });
  const textGenerate = t('generate', { ns: ['sudoku'] });
  const textSendingEmail = t('sendingEmail', { ns: ['sudoku'] });

  type ButtonsPropsType = {
    isCilckAnimate: boolean;
    onClick: () => void;
    onFunction: () => void;
    spanClassName: string;
    spanItem: string | JSX.Element;
    disabled: boolean | undefined;
  };

  const Buttons = ({
    isCilckAnimate,
    onClick,
    onFunction,
    spanClassName,
    spanItem,
    disabled,
  }: ButtonsPropsType) => {
    return (
      <>
        <div
          className={`flex w-[calc(9vw+7vh)] h-[calc(6vh)] mobile:w-[calc(9vw+8vh)] justify-center items-center border-[2px] border-slate-500 mt-5 
          ${
            isCilckAnimate
              ? 'animate-click mobile:animate-clickMobile'
              : 'shadow-[7px_7px_0px_rgba(117,110,110,0.7)] mobile:shadow-[3px_3px_0px_rgba(117,110,110,0.7)]'
          }`}
          onAnimationEnd={() => {
            onFunction();
          }}
        >
          <button
            className="flex items-center justify-center w-[calc(9vw+7vh)] h-[calc(6vh)] mobile:w-[calc(9vw+8vh)] cursor-pointer disabled:cursor-default"
            onClick={() => onClick()}
            disabled={disabled}
          >
            <div className={spanClassName}>
              <div>{spanItem}</div>
            </div>
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="flex justify-center">
        <Buttons
          isCilckAnimate={isSolveClickAnimate}
          onClick={onSolveClick}
          onFunction={onSolve}
          disabled={isSolving || isSolveClickAnimate || isSolveClicked}
          spanClassName="text-[calc(2.5vh)] mobile:text-[calc(1vw+1vh)]"
          spanItem={
            isSolving ? (
              <div className="flex items-center">
                <span>{textSolving}</span>
                <span className="ml-1 inline-block h-5 w-5 mobile:h-3 mobile:w-3 text-blue-500 animate-spin rounded-full border border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
              </div>
            ) : isSolveClicked ? (
              textSolvedIn + solvingTime + 'ms'
            ) : (
              textSolve
            )
          }
        />
      </div>
      <div className="flex justify-center">
        <Buttons
          isCilckAnimate={isResetClickAnimate}
          onClick={onResetClick}
          onFunction={onReset}
          disabled={isResetClickAnimate}
          spanClassName="text-[calc(2.5vh)] mobile:text-[calc(1vw+1vh)]"
          spanItem={textReset}
        />
      </div>
      <div className="flex justify-center">
        <Buttons
          isCilckAnimate={isGenerateClickAnimate}
          onClick={onGenerateClick}
          onFunction={onGenerate}
          disabled={isSolving || isSolveClickAnimate || isSolveClicked || isGenerated}
          spanClassName="text-[calc(2.5vh)] mobile:text-[calc(1vw+1vh)]"
          spanItem={textGenerate}
        />
      </div>
      <div className="flex justify-center">
        {isSubscribed && (
          <Buttons
            isCilckAnimate={isSendEmailClickAnimate}
            onClick={onSendEmailClick}
            onFunction={onSendEmail}
            disabled={isSolving || isSolveClickAnimate || isSendingEmail}
            spanClassName="text-[calc(2.5vh)] mobile:text-[calc(1vw+1vh)]"
            spanItem={
              isSendingEmail ? (
                <div className="flex items-center">
                  <span>{textSendingEmail}</span>
                  <span className="ml-1 inline-block h-5 w-5 mobile:h-3 mobile:w-3 text-blue-500 animate-spin rounded-full border border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                </div>
              ) : (
                textSendEmail
              )
            }
          />
        )}
      </div>
    </>
  );
};

export default TableMeta;

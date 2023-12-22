import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useReduxDispatch, useReduxSelector } from '../store/ReduxTypes';
import { formActions } from '../store/appSlices/FormSlice';
import { toast } from 'react-toastify';

const Form: React.FC = () => {
  const dispatch = useReduxDispatch();
  const isSubscribed = useReduxSelector((state) => state.form.isSubscribed);
  const isSubscribeAnimate = useReduxSelector((state) => state.form.isSubscribeAnimate);
  const user = useReduxSelector((state) => state.form.user);

  const { t, i18n } = useTranslation(['home', 'form', 'sudoku']);
  const textPlease = t('textPlease', { ns: ['form'] });
  const textName = t('textName', { ns: ['form'] });
  const textEmail = t('textEmail', { ns: ['form'] });
  const textSubscribe = t('textSubscribe', { ns: ['form'] });
  const textSuccesFull = t('textSuccessFull', { ns: ['form'] });
  const textError = t('textError', { ns: ['form'] });

  const [value, setValue] = useState(user);
  const timeoutInstance = useRef<NodeJS.Timeout | null>(null);

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const onSubmit = () => {
    dispatch(formActions.setIsSubscribeAnimate(false));
    if (isValidEmail(user.email) && user.name.length !== 0) {
      dispatch(formActions.setIsSubscribed(true));
      window.localStorage.setItem('SUDOKU_APP_USER', JSON.stringify(user));
      toast.success(`${textSuccesFull}`);
    } else {
      toast.error(`${textError}`);
    }
  };

  const onSubmitClick = () => {
    dispatch(formActions.setIsSubscribeAnimate(true));
  };

  const debounce = (
    eTarget: EventTarget & HTMLInputElement,
    delay: number,
    timeoutInstance: React.MutableRefObject<NodeJS.Timeout | null>,
  ) => {
    if (timeoutInstance.current) clearTimeout(timeoutInstance.current);
    const timeout = setTimeout(() => {
      switch (eTarget.name) {
        case 'name':
          dispatch(formActions.setUserName(eTarget.value));
          break;
        case 'email':
          dispatch(formActions.setUserEmail(eTarget.value));
          break;
        default:
          break;
      }
    }, delay);
    timeoutInstance.current = timeout;
    return () => {
      if (timeoutInstance.current) clearTimeout(timeoutInstance.current);
      timeoutInstance.current = null;
    };
  };

  const onChangeField = (eTarget: EventTarget & HTMLInputElement) => {
    setValue((value) => ({ ...value, [eTarget.name]: eTarget.value }));
    debounce(eTarget, 700, timeoutInstance);
  };

  return (
    <>
      {!isSubscribed && (
        <div className="w-full absolute flex justify-start text-[calc(2.5vh)] items-center bg-gradient-to-r from-pink-500 to-blue-100 h-[calc(7vh)]">
          <div className="ml-5 text-white">{textPlease}</div>
          <div className="ml-5 flex">
            <input
              type="text"
              className={`pl-1 h-[calc(4.6vh)] ${i18n.language === 'en' ? 'ml-5' : 'ml-[16px]'}`}
              name="name"
              value={value.name}
              placeholder={textName}
              onChange={(e) => onChangeField(e.target)}
            ></input>
            <input
              type="text"
              className="ml-5 pl-1 h-[calc(4.6vh)]"
              name="email"
              value={value.email}
              placeholder={textEmail}
              onChange={(e) => onChangeField(e.target)}
            ></input>
            <div
              className={`ml-5 flex border-[2px] border-slate-500 w-[calc(9vw+5vh)] h-[calc(4.6vh)] justify-center items-center bg-white ${
                isSubscribeAnimate ? 'animate-click' : 'shadow-[5px_5px_0px_rgba(117,110,110,0.7)]'
              }`}
              onAnimationEnd={() => {
                onSubmit();
              }}
            >
              <button
                className="flex justify-center items-center w-[calc(9vw+5vh)] h-[calc(4.6vh)] cursor-pointer disabled:cursor-default]"
                onClick={() => onSubmitClick()}
              >
                <span>{textSubscribe}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;

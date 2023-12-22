import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  name: string;
  email: string;
};

type FormState = {
  isSubscribed: boolean;
  isSubscribeAnimate: boolean;
  user: User;
  initAnim: boolean;
  refreshAnim: boolean;
};

const data = window.localStorage.getItem('SUDOKU_APP_USER');
const hasData = data !== null;

const initialState: FormState = {
  isSubscribed: hasData ? true : false,
  isSubscribeAnimate: false,
  user: {
    name: hasData ? JSON.parse(data).name : '',
    email: hasData ? JSON.parse(data).email : '',
  },
  initAnim: false,
  refreshAnim: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setIsSubscribed(state, action: PayloadAction<boolean>) {
      state.isSubscribed = action.payload;
    },
    setIsSubscribeAnimate(state, action: PayloadAction<boolean>) {
      state.isSubscribeAnimate = action.payload;
    },
    setUserName(state, action: PayloadAction<string>) {
      state.user.name = action.payload;
    },
    setUserEmail(state, action: PayloadAction<string>) {
      state.user.email = action.payload;
    },
    setInitAnim(state, action: PayloadAction<boolean>) {
      state.initAnim = action.payload;
    },
    setRefreshAnim(state, action: PayloadAction<boolean>) {
      state.refreshAnim = action.payload;
    },
  },
});

export const formActions = formSlice.actions;
export default formSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export interface Token {
  hideToken: any;
}

const initialState: Token = {
  hideToken: {},
};

export const TokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    handleSetHideToken: (state: Token, action) => ({
      ...state,
      hideToken: action.payload,
    }),
  },
});

export const { handleSetHideToken } = TokenSlice.actions;

export const namespace = 'TokenSlice';

export default TokenSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export interface State {
  balance: number;
}

const initialState: State = {
  balance: 0,
};

export const BalanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    setBalance: (state: State, action: any) => {
      const { balance } = action.payload;

      return {
        ...state,
        balance,
      };
    },
  },
});

export const { setBalance } = BalanceSlice.actions;

export const namespace = 'BalanceSlice';

export default BalanceSlice.reducer;

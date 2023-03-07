import { createSlice } from '@reduxjs/toolkit';

export interface Transaction {
  targetChainId: number;
}

const initialState: Transaction = {
  targetChainId: 0,
};

export const TransactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    handleSetTargetChainId: (state: Transaction, action) => ({
      ...state,
      targetChainId: action.payload,
    }),
  },
});

export const { handleSetTargetChainId } = TransactionSlice.actions;

export const namespace = 'TransactionSlice';

export default TransactionSlice.reducer;

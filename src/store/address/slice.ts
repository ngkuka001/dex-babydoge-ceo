import { createSlice } from '@reduxjs/toolkit';

export interface Address {
  address: string;
  chainId: number | null;
  balance: number;
}

const initialState: Address = {
  address: '',
  chainId: null,
  balance: 0,
};

export const AddressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    loginStart: (state: Address, action: any) => {
      const { address, chainId } = action.payload;
      return {
        ...state,
        address,
        chainId,
      };
    },
    logout: (state: Address) => ({
      ...state,
    }),
    logoutSuccess: (state: Address) => ({
      ...state,
      address: '',
      chainId: null,
    }),
  },
});

export const { loginStart, logout, logoutSuccess } = AddressSlice.actions;

export const namespace = 'AddressSlice';

export default AddressSlice.reducer;

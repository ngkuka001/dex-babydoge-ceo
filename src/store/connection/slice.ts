import { createSlice } from '@reduxjs/toolkit';

export interface Connection {
  isConnectingWallet: boolean;
  isShowConnectModal: boolean;
  isWrongNetwork: boolean;
  connectedWalletType: string;
}

const initialState: Connection = {
  isConnectingWallet: false,
  isShowConnectModal: false,
  isWrongNetwork: false,
  connectedWalletType: '',
};

export const ConnectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    handleSetConnectModal: (state: Connection, action: any) => {
      return {
        ...state,
        isShowConnectModal: action.payload,
      };
    },
    handleSetLoadingMetamask: (state: Connection, action: any) => {
      return {
        ...state,
        isConnectingWallet: action.payload,
      };
    },
    handleSetWrongNetwork: (state: Connection, action: any) => {
      return {
        ...state,
        isWrongNetwork: action.payload,
      };
    },
    handleSetConnectedWalletType: (state: Connection, action: any) => {
      return {
        ...state,
        connectedWalletType: action.payload,
      };
    },
  },
});

export const { handleSetConnectModal, handleSetWrongNetwork, handleSetLoadingMetamask, handleSetConnectedWalletType } =
  ConnectionSlice.actions;

export const namespace = 'ConnectionSlice';

export default ConnectionSlice.reducer;

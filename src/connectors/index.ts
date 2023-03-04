import { UnsupportedChainIdError } from '@web3-react/core';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector';
import {
  WalletConnectConnector,
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
} from '@web3-react/walletconnect-connector';
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import showMessage from 'components/Message';
import {
  BRIDGE_WALLET_CONNECT_URL,
  LIST_NETWORK_RPC_MAINNET,
  LIST_NETWORK_RPC_TESTNET,
  METAMASK_DEEP_LINK,
} from './constants';
import TYPE_CONSTANTS from 'constants/type';
import { getI18n } from 'react-i18next';
import { store } from 'store/configStore';
import { logout } from 'store/address/slice';

export const injected = new InjectedConnector({});
export const walletConnect = new WalletConnectConnector({
  rpc: import.meta.env.DEV ? LIST_NETWORK_RPC_TESTNET : LIST_NETWORK_RPC_MAINNET,
  bridge: BRIDGE_WALLET_CONNECT_URL,
  qrcode: true,
  pollingInterval: 10000,
});

export function getErrorConnectMessage(error: Error, deactivate: any, metamaskNotFound?: any) {
  console.log('error :>> ', error);
  if (error instanceof NoEthereumProviderError) {
    return metamaskNotFound && metamaskNotFound();
  } else if (error instanceof UnsupportedChainIdError) {
    return showMessage(TYPE_CONSTANTS.MESSAGE.ERROR, getI18n().t('message.unsupported_network'));
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return;
  } else {
    console.error(error);
    store.dispatch(logout());
    return;
  }
}

export interface WalletInfo {
  connector?: AbstractConnector;
  name: string;
  description: string;
  href: string | null;
  primary?: true;
  mobile?: true;
  mobileOnly?: true;
  disableIcon: string;
  icon: string;
  deepLink?: string;
}

export enum ConnectorNames {
  MetaMask = 'MetaMask',
  BSC = 'BSC Wallet',
  WalletConnect = 'WalletConnect',
  WalletConnectBsc = 'WalletConnect',
}

export type connectorNames = Extract<
  ConnectorNames,
  ConnectorNames.MetaMask | ConnectorNames.BSC | ConnectorNames.WalletConnect
>;

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: injected,
    name: ConnectorNames.MetaMask,
    icon: '/images/metamask.svg',
    disableIcon: '/images/metamask-disabled.svg',
    description: 'Easy-to-use browser extension.',
    href: null,
    mobile: true,
    deepLink: METAMASK_DEEP_LINK,
  },
  WALLET_CONNECT: {
    connector: walletConnect,
    name: ConnectorNames.WalletConnect,
    icon: '/images/WalletConnect.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    disableIcon: '/images/wallet-connect-disabled.svg',
    href: null,
    mobile: true,
  },
};

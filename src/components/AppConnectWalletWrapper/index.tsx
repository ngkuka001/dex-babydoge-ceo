import { FC, Fragment, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import ModalWrongNetwork from 'components/Modal/components/ModalWrongNetwork';
import ModalConnectWallet from 'components/Modal/components/ModalConnectWallet';

import { handleSetConnectedWalletType } from 'store/connection/slice';
import selectedAddress from 'store/address/selector';
import selectedConnection from 'store/connection/selector';
import { useAppDispatch, useAppSelector } from 'hooks/useStore';
import { useConnectWallet } from 'hooks/useConnectWallet';
import { CHAIN_ID, METAMASK, SUPPORTED_CHAIN_IDS, WALLET_CONNECT } from 'connectors/constants';
import { loginStart, logout } from 'store/address/slice';
import { useChangeNetwork } from 'hooks/walletHook/useChangeNetwork';
import { handleSetTargetChainId } from 'store/transaction/slice';

const AppConnectWalletWrapper: FC<{
  children: any;
}> = ({ children }) => {
  const dispatch = useAppDispatch();

  const { connectInjected, connectWalletConnect } = useConnectWallet();

  const { chainId: web3ChainId, account, active, deactivate } = useWeb3React();

  const { address, chainId } = useAppSelector(selectedAddress.getAddress);
  const connectedWalletType = useAppSelector(selectedConnection.getConnectedWalletType);

  useChangeNetwork();

  useEffect(() => {
    if (address && connectedWalletType && !active) {
      if (connectedWalletType === METAMASK) {
        setTimeout(() => {
          connectInjected();
          dispatch(handleSetConnectedWalletType(METAMASK));
        }, 700);
      }

      if (connectedWalletType === WALLET_CONNECT) {
        setTimeout(() => {
          connectWalletConnect();
          dispatch(handleSetConnectedWalletType(WALLET_CONNECT));
        }, 700);
      }
    }
  }, [address, connectedWalletType, active]);

  useEffect(() => {
    if (
      (address?.toLowerCase() !== account?.toLowerCase() || Number(chainId) !== Number(web3ChainId)) &&
      !!active &&
      !!account &&
      !!web3ChainId
    ) {
      dispatch(loginStart({ address: account, chainId: web3ChainId }));
    }
  }, [active, account, chainId, address, web3ChainId]);

  useEffect(() => {
    if (web3ChainId && !SUPPORTED_CHAIN_IDS.includes(web3ChainId)) {
      dispatch(handleSetTargetChainId(import.meta.env.DEV ? CHAIN_ID.BSC_TEST : CHAIN_ID.BSC));
    }

    if (active && web3ChainId && !SUPPORTED_CHAIN_IDS.includes(web3ChainId)) {
      dispatch(logout());
      deactivate();
    }
  }, [web3ChainId, active]);

  return (
    <Fragment>
      {children}

      {/* <ModalWrongNetwork /> */}
      <ModalConnectWallet />
    </Fragment>
  );
};

export default AppConnectWalletWrapper;

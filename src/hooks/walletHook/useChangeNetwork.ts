import { useWeb3React } from '@web3-react/core';
import { useAppDispatch } from './../useStore';
import { useEffect } from 'react';

import { useAppSelector } from 'hooks/useStore';
import selectTransaction from 'store/transaction/selector';
import selectedAddress from 'store/address/selector';
import { handleSetTargetChainId } from 'store/transaction/slice';
import MetamaskService from 'services/WalletService/MetamaskService';

export const useChangeNetwork = () => {
  const dispatch = useAppDispatch();

  const { library } = useWeb3React();

  const wallet = new MetamaskService().getInstance();

  const { chainId: beforeChangeChainId } = useAppSelector(selectedAddress.getAddress);
  const targetChainId = useAppSelector(selectTransaction.getTargetChainIdLoading);

  const switchNetwork = async () => {
    try {
      const changeNetworkResponse = await wallet.changeNetwork({
        library,
        data: {
          chainId: targetChainId,
        },
      });

      //Reject metamask => change back to change before
      if (changeNetworkResponse === undefined) {
        dispatch(handleSetTargetChainId(beforeChangeChainId));
      }

      //Accepted change network => reset state
      if (changeNetworkResponse) {
        dispatch(handleSetTargetChainId(null));
      }

      return changeNetworkResponse;
    } catch (error: any) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    if (targetChainId && library) {
      switchNetwork();
    }
  }, [targetChainId, library]);

  return {
    switchNetwork,
  };
};

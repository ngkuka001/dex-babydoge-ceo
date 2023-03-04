import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

import MetamaskService from 'services/WalletService/MetamaskService';
import { isNativeToken } from 'services/WalletService/utils';

export const useCheckApproveCurrency = (
  tokenInfo: {
    token: string;
    contract: string;
  },
  isVisible: boolean,
) => {
  const wallet = new MetamaskService().getInstance();

  const { library, account, chainId } = useWeb3React();

  const { token: tokenAddress, contract: exchangeAddress } = tokenInfo || {};

  const [statusApprove, setStatusApprove] = useState(false);
  const [processingApprove, setProcessingApprove] = useState(false);
  const [hasCheckStatusApprove, setHasCheckStatusApprove] = useState(false);

  const getStatusCheckCurrency = async () => {
    let status;

    if (isNativeToken(tokenAddress)) {
      status = true;
    } else {
      status = await wallet.getStatusCheckCurrency({ library, account, data: { exchangeAddress, tokenAddress } });
    }

    setStatusApprove(status);
    setHasCheckStatusApprove(true);
  };

  const handleApproveCurrency = async () => {
    setProcessingApprove(true);

    await wallet.approveCurrency({
      library,
      account,
      data: { exchangeAddress, tokenAddress },
      callback: {
        success: () => setStatusApprove(true),
        failed: () => setStatusApprove(false),
      },
    });

    setProcessingApprove(false);
  };

  useEffect(() => {
    if (account && tokenAddress && isVisible) {
      setHasCheckStatusApprove(false);
      getStatusCheckCurrency();
    }
  }, [chainId, account, tokenAddress, exchangeAddress, isVisible]);

  return { statusApprove, setStatusApprove, handleApproveCurrency, processingApprove, hasCheckStatusApprove };
};

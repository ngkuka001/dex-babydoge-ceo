import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';

import { useAppDispatch } from 'hooks/useStore';
import MetamaskService from 'services/WalletService/MetamaskService';
import { setBalance } from 'store/balance/slice';

const useGetBalance = () => {
  const wallet = new MetamaskService().getInstance();

  const { account, library, chainId } = useWeb3React();

  const [isGettingBalance, setIsGettingBalance] = useState(false);

  const dispatch = useAppDispatch();

  const getBalance = async (tokenAddress: string): Promise<number | undefined> => {
    setIsGettingBalance(true);

    try {
      if (account && chainId) {
        const userBalance = await wallet.getBalance({
          library,
          account,
          data: {
            tokenAddress,
          },
        });

        if (userBalance) {
          const balance = userBalance?.balance || 0;

          dispatch(
            setBalance({
              balance,
            }),
          );

          return new Promise((resolve) => {
            resolve(balance);
          });
        }
      }
    } catch (e) {
    } finally {
      setIsGettingBalance(false);
    }
  };

  return {
    getBalance,
    isGettingBalance,
  };
};

export default useGetBalance;

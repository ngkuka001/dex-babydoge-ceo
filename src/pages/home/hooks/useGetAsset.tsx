import { AddressZero } from '@ethersproject/constants';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { api } from 'services/api';
import MetamaskService from 'services/WalletService/MetamaskService';
import { multiplyValue } from 'services/WalletService/utils';

const useGetAsset = () => {
  const wallet = new MetamaskService().getInstance();

  const [tokenPrice, setTokenPrice] = useState(0);
  const [balance, setBalance] = useState(0);
  const [busdPrice, setBusdPrice] = useState(0);
  const [balances, setBalances] = useState([]);

  const { account, library } = useWeb3React();

  useEffect(() => {
    const getTokenPrice = async (coinPair: string) => {
      try {
        const userBalance = wallet.getBalance({
          library,
          account,
          data: {
            tokenAddress: AddressZero,
          },
        });

        const [busdPriceResponse, coinToBusdPriceResponse, accountBalance] = await Promise.all([
          axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=binance-usd&vs_currencies=usd`),
          axios.get(`https://api.binance.com/api/v3/avgPrice?symbol=${coinPair}`),
          userBalance,
        ]);

        if (busdPriceResponse.status === 200 && coinToBusdPriceResponse.status === 200 && !isEmpty(accountBalance)) {
          const { data: busdPriceData } = busdPriceResponse || {};
          const { data: coinToBusdPrice } = coinToBusdPriceResponse || {};

          const busdPrice = multiplyValue([busdPriceData?.['binance-usd']?.usd, coinToBusdPrice?.price]);
          const tokenPrice = multiplyValue([busdPrice, accountBalance?.balance]);

          setBusdPrice(busdPrice);
          setBalance(accountBalance?.balance);
          setTokenPrice(tokenPrice);
        }
      } catch (e) {
        console.log(e);
      }
    };

    const getAssets = async () => {
      try {
        const response = await axios.post(import.meta.env.VITE_API_URL, {
          address: account,
        });

        if (response?.data?.statusCode === 200) {
          const ownedTokens = response?.data?.body?.balances.filter(({ currency }: any) => currency?.symbol !== 'BNB');
          const getTokensPricePromise = ownedTokens.map(({ currency }: any) =>
            axios.get(`${import.meta.env.VITE_API_PANCAKESWAP}/${currency?.address}`),
          );

          const ownedTokensPrice = await Promise.allSettled(getTokensPricePromise);

          const balances = ownedTokens.map((token: any, index: number) => ({
            ...token,
            currency: {
              ...token?.currency,
              price:
                ownedTokensPrice[index]?.status === 'fulfilled'
                  ? (ownedTokensPrice[index] as any)?.value?.data?.data?.price || 0
                  : 0,
            },
          }));
          setBalances(balances);
        }
      } catch (e) {}
    };

    if (account) {
      getTokenPrice('BNBBUSD');
      getAssets();
    }
  }, [account]);

  return { tokenPrice, balance, busdPrice, balances };
};

export default useGetAsset;

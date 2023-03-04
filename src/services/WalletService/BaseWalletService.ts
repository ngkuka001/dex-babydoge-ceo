import { delay } from './../../utils/index';
import { getEthersJsonProvider } from './utils/index';
import { INIT_UNIT_256, BLOCKCHAIN_TRANSACTION_STATUS } from './constants/index';
import { ethers } from 'ethers';
import { formatUnits } from '@ethersproject/units';

import BridgeAbi from '../../abi/bridge.abi.json';
import TokenAbi from '../../abi/token.abi.json';

import type { BridgeAbi as BridgeAbiType } from '../../abi/types/BridgeAbi';
import type { TokenAbi as TokenAbiType } from '../../abi/types/TokenAbi';

import { DECIMAL_SCALE } from './constants';
import { convertEToNumber, convertPrice, convertToBigNumber, getContract, isNativeToken } from './utils';
import { APP_NETWORKS_SUPPORT, METAMASK } from 'connectors/constants';

export default class BaseWalletService {
  address: string | null;
  needTobeInitiated: any;
  initUnit256: any;

  constructor(props: any) {
    this.address = props?.address;
    this.initUnit256 = INIT_UNIT_256;
  }

  getBalance = async ({
    library,
    account,
    data,
  }: {
    library: any;
    account: string;
    data: {
      tokenAddress: string;
    };
  }) => {
    try {
      if (account) {
        const { tokenAddress } = data || {};
        let balance, balanceFlat, decimals;

        if (isNativeToken(tokenAddress)) {
          const providerBSC = getEthersJsonProvider(import.meta.env.VITE_NETWORK_URL_RPC_BSC);

          balance = await providerBSC?.getBalance(account);
          balanceFlat = formatUnits(balance, 'wei');
          decimals = DECIMAL_SCALE;
        } else {
          const tokenContract = getContract<TokenAbiType>(tokenAddress, TokenAbi, library, account);
          balance = (await tokenContract?.balanceOf(account)) || 0;

          balanceFlat = formatUnits(balance, 'wei');
          decimals = await tokenContract?.decimals();
        }
        return {
          balance: convertEToNumber(balanceFlat, decimals),
        };
      }

      return {
        balance: 0,
      };
    } catch (e) {
      return {
        balance: 0,
      };
    }
  };

  getStatusCheckCurrency = async ({
    library,
    account,
    data,
  }: {
    library: any;
    account: string;
    data: {
      tokenAddress: string;
      exchangeAddress: string;
    };
  }) => {
    try {
      const { tokenAddress, exchangeAddress } = data || {};

      const tokenContract = getContract<TokenAbiType>(tokenAddress, TokenAbi, library, account);
      const allowance = (await tokenContract?.allowance(account, exchangeAddress)) || 0;
      const formatAllowance = convertToBigNumber(formatUnits(allowance, 'wei'));

      return !!formatAllowance;
    } catch (e) {
      return false;
    }
  };

  approveCurrency = async ({
    library,
    account,
    data,
    callback,
  }: {
    library: any;
    account: string;
    data: {
      tokenAddress: string;
      exchangeAddress: string;
    };
    callback: {
      success: () => void;
      failed: () => void;
    };
  }) => {
    try {
      const { tokenAddress, exchangeAddress } = data || {};

      const tokenContract = getContract<TokenAbiType>(tokenAddress, TokenAbi, library, account);

      const response = await tokenContract?.approve(exchangeAddress, this.initUnit256);

      const receipt = await response?.wait();

      if (receipt?.status === BLOCKCHAIN_TRANSACTION_STATUS.SUCCESS) {
        callback && callback.success();
      } else {
        callback && callback.failed();
      }
    } catch (error) {
      callback && callback.failed();
    }
  };

  unClaim = async ({
    library,
    account,
    data,
    callback,
  }: {
    library: any;
    account: string;
    data: {
      tokenAddress: string;
      fromToken: string;
      toToken: string;
      senderAddress: string;
      recipientAddress: string;
      amount: string;
      internalTxId: string;
    };
    callback: {
      processing: (txId: string) => void;
      success: () => void;
      failed: () => void;
    };
  }) => {
    try {
      const { tokenAddress, fromToken, toToken, senderAddress, recipientAddress, amount, internalTxId } = data || {};
      const _addr = [fromToken, toToken, senderAddress, recipientAddress];
      const _data = [convertPrice(amount, DECIMAL_SCALE)];

      console.log({ tokenAddress, account, _addr, _data, internalTxId });

      const tokenContract = getContract<BridgeAbiType>(tokenAddress, BridgeAbi, library, account);
      const response = await tokenContract?.burnToken(_addr, _data, internalTxId);

      if (response?.hash) {
        callback && callback.processing(response.hash);
      }

      const receipt = await response?.wait();

      if (receipt?.status === BLOCKCHAIN_TRANSACTION_STATUS.SUCCESS) {
        callback && callback.success();
      } else {
        callback && callback.failed();
      }
    } catch (error) {
      console.log(error);
      callback && callback.failed();
    }
  };

  claim = async ({
    library,
    account,
    data,
    callback,
  }: {
    library: any;
    account: string;
    data: {
      connectedWalletType: string;
      tokenAddress: string;
      fromToken: string;
      toToken: string;
      senderAddress: string;
      recipientAddress: string;
      amount: string;
      internalTxId: string;
      signer: string;
      signature: string;
    };
    callback: {
      processing: (txId: string) => void;
      success: () => void;
      failed: () => void;
    };
  }) => {
    let timeout;

    try {
      const {
        connectedWalletType,
        tokenAddress,
        fromToken,
        toToken,
        senderAddress,
        recipientAddress,
        amount,
        internalTxId,
        signer,
        signature,
      } = data || {};

      const _addr = [fromToken, toToken, senderAddress, recipientAddress, signer];
      const _data = [convertPrice(amount, DECIMAL_SCALE)];

      console.log({ tokenAddress, account, _addr, _data, internalTxId, signature });

      const tokenContract = getContract<BridgeAbiType>(tokenAddress, BridgeAbi, library, account);
      const response = await tokenContract?.mintToken(_addr, _data, internalTxId, signature);

      if (response?.hash) {
        callback && callback.processing(response.hash);
      }

      if (connectedWalletType === METAMASK) {
        const receipt = await response?.wait();

        if (receipt?.status === BLOCKCHAIN_TRANSACTION_STATUS.SUCCESS) {
          callback && callback.success();
        } else {
          callback && callback.failed();
        }
      } else {
        let finished = false;

        const receipt: any = await Promise.race([
          response?.wait(),
          (async () => {
            return new Promise(async (resolve, reject) => {
              timeout = setTimeout(() => {
                reject();
                return null;
              }, 30000);

              while (!finished) {
                await delay(5000);
                const transaction = await library.getTransaction(response?.hash);

                if (!transaction) {
                  reject();
                  return null;
                }

                if (transaction?.blockHash) {
                  resolve(transaction);
                  return transaction;
                }
              }
            });
          })(),
        ]);
        finished = true;

        if (!receipt) {
          callback && callback.failed();
        }

        if (receipt?.blockHash) {
          callback && callback.success();
        } else {
          callback && callback.failed();
        }
      }
    } catch (error) {
      console.log(error);
      callback && callback.failed();
    } finally {
      timeout && clearTimeout(timeout);
    }
  };

  getTotalSupply = async ({
    data,
  }: {
    data: {
      tokenAddressBSC: string;
      tokenAddressETH: string;
    };
  }) => {
    try {
      const { tokenAddressBSC, tokenAddressETH } = data || {};

      const providerBSC = getEthersJsonProvider(import.meta.env.VITE_NETWORK_URL_RPC_BSC);
      const providerETH = getEthersJsonProvider(import.meta.env.VITE_NETWORK_URL_RPC_ETH);

      const contractBSC = providerBSC && getContract<TokenAbiType>(tokenAddressBSC, TokenAbi, providerBSC);
      const contractETH = providerETH && getContract<TokenAbiType>(tokenAddressETH, TokenAbi, providerETH);

      const [totalSupplyBSC, totalSupplyETH] = await Promise.all([
        contractBSC?.totalSupply(),
        contractETH?.totalSupply(),
      ]);

      return new Promise((resolve, reject) => {
        if (totalSupplyBSC && totalSupplyETH) {
          resolve({ totalSupplyBSC: totalSupplyBSC?.toString(), totalSupplyETH: totalSupplyETH?.toString() });
        } else {
          reject(null);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  signMessage = async ({ library, account }: { library: any; account: string }) => {
    const message = 'test_signature';
    const messageHash = ethers.utils.solidityKeccak256(['string'], [message]);
    const signHashBytes = ethers.utils.arrayify(messageHash);

    const signer = await library.getSigner(account);
    const signature = await signer.signMessage(message);
    return;
    // if (library.provider?.wc) {
    //   const wcMessage = ethers.utils.hexlify(signHashBytes);
    //   const signature = await (library as any).provider.wc.signMessage([account, wcMessage]);
    //   console.log(signature);
    // } else {
    //   const signer = await library.getSigner(account);
    //   const signature = await signer.signMessage(signHashBytes);
    //   console.log(signature);
    // }
  };

  changeNetwork = async ({ library, data }: { library: any; data: { chainId: number | string } }) => {
    if (library?.provider) {
      const { chainId } = data || {};

      try {
        const networkInfo = APP_NETWORKS_SUPPORT[Number(chainId)];
        if (networkInfo) {
          try {
            await library?.provider?.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: networkInfo.details?.chainId }],
            });
            return true;
          } catch (error: any) {
            //Reject metamask
            if (error.code === 4001) {
              return;
            }

            // This error code indicates that the chain has not been added to MetaMask.
            if (error.code === 4902) {
              try {
                await library?.provider?.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      ...(networkInfo.details || {}),
                    },
                  ],
                });
                return true;
              } catch (addError) {
                return false;
              }
            } else {
              return false;
            }
          }
        } else return false;
      } catch (e) {
        return false;
      }
    } else {
      return false;
    }
  };

  addToken = async ({
    library,
    data,
  }: {
    library: any;
    data: {
      tokenType: string;
      tokenAddress: string;
      tokenSymbol: string;
      tokenDecimals: number;
      tokenImage?: string;
    };
  }) => {
    try {
      const { tokenType, tokenAddress, tokenSymbol, tokenDecimals, tokenImage = '' } = data || {};

      if (tokenAddress && library?.provider) {
        await library?.provider?.request({
          method: 'wallet_watchAsset',
          params: {
            type: tokenType,
            options: {
              address: tokenAddress, // The address that the token is at.
              symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: tokenDecimals, // The number of decimals in the token
              image: tokenImage, // A string url of the token logo
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

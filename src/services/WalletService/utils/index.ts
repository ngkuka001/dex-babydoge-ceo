import { CHAIN_INFO } from './../../../connectors/constants';
import { JsonRpcProvider, JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { getAddress } from '@ethersproject/address';
import BigNumber from 'bignumber.js';
import { ValidationError } from 'yup';
import { providers } from 'ethers';

BigNumber.config({
  EXPONENTIAL_AT: 100,
});

// account is optional
const getProviderOrSigner = (
  library: Web3Provider | JsonRpcProvider,
  account?: string,
): Web3Provider | JsonRpcProvider | JsonRpcSigner => {
  return account ? getSigner(library, account) : library;
};

export const isAddress = (address?: string): boolean | ValidationError | Promise<boolean | ValidationError> => {
  try {
    return !!getAddress(address || '');
  } catch {
    return false;
  }
};

export const getSigner = (library: Web3Provider | JsonRpcProvider, account: string): JsonRpcSigner => {
  return library.getSigner(account).connectUnchecked();
};

export function getContract<T extends Contract = Contract>(
  address: string,
  ABI: any,
  library: Web3Provider | JsonRpcProvider,
  account?: string,
): T | null {
  if (!isAddress(address) || isNativeToken(address)) {
    // throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any) as T;
}

export const isNativeToken = (address: string) => {
  return address === AddressZero;
};

export const convertEToNumber = (value: any, number: any) => {
  return new BigNumber(value).toNumber() / new BigNumber(10).pow(number).toNumber();
};

export const convertPrice = (value: string | number, decimalScale: number) => {
  return new BigNumber(value).multipliedBy(new BigNumber(Math.pow(10, decimalScale))).toString();
};

export const dividedPrice = (value: string | number, decimalScale: number) => {
  return new BigNumber(value).dividedBy(new BigNumber(Math.pow(10, decimalScale))).toString();
};

export const addValue = (value: any[]) => {
  return value
    .reduce((acc: string | number, cur: string | number) => {
      return new BigNumber(acc).plus(new BigNumber(cur));
    }, 0)
    .toString();
};

export const multiplyValue = (value: any[]) => {
  return value
    .reduce((acc: string | number, cur: string | number) => {
      return new BigNumber(acc).multipliedBy(new BigNumber(cur));
    }, 1)
    .toString();
};

export const calculatePercentage = (value: string | number, total: string | number) => {
  if (!value || !total) {
    return 0;
  }
  return new BigNumber(value).dividedBy(new BigNumber(total)).multipliedBy(100).decimalPlaces(2).toString();
};

export const getBlockExplorerLink = (chainId: number, txId: string) => {
  return `${CHAIN_INFO?.[chainId]?.url}/tx/${txId}`;
};

export const getBlockExplorerName = (chainId: number) => {
  return CHAIN_INFO?.[chainId]?.explorerName;
};

export const convertToBigNumber = (value: number | string) => {
  return new BigNumber(value).toNumber();
};

export const getEthersJsonProvider = (rpc: string) => {
  return new providers.JsonRpcProvider(rpc);
};

export const isAddressEqual = (address1?: string | null, address2?: string) => {
  return !!address1 && !!address2 && address1?.toLowerCase() === address2?.toLocaleLowerCase();
};

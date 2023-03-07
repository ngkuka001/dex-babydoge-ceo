import BSCLogo from 'resources/svg/binance_logo.svg';
import ETHLogoSwap from 'resources/svg/eth_swap.svg';
import BSCLogoFailed from 'resources/svg/bsc_failed.png';
import ETHLogoFailed from 'resources/svg/eth_failed.png';
import EthereumLogo from 'resources/svg/ethereum_logo.svg';
import PolygonLogo from 'resources/svg/polygon_logo.svg';

import connector from 'utils/connector';

export const BSCMainnetChainId = '0x38';
export const BSCMainnetChainIdDec = 56;
export const BSCTestnetChainId = '0x61';
export const BSCTestnetChainIdDec = 97;

export const EtherMainnetChainIdDec = 1;
export const EtherTestnetChainId = '0x4';
export const EtherTestnetChainIdDec = 4;

export const PolygonMainnetChainIdDec = 137;
export const PolygonTestnetChainId = '0x13881';
export const PolygonTestnetChainIdDec = 80001;

export enum CHAIN_ID {
  BSC = BSCMainnetChainIdDec,
  BSC_TEST = BSCTestnetChainIdDec,
  ETH = EtherMainnetChainIdDec,
  ETH_TEST = EtherTestnetChainIdDec,
  POLYGON = PolygonMainnetChainIdDec,
  POLYGON_TEST = PolygonTestnetChainIdDec,
}

export const LIST_BSC_TESTNET = [
  'https://data-seed-prebsc-1-s1.binance.org:8545/',
  'https://data-seed-prebsc-2-s1.binance.org:8545/',
  'https://data-seed-prebsc-1-s2.binance.org:8545/',
  'https://data-seed-prebsc-2-s2.binance.org:8545/',
  'https://data-seed-prebsc-1-s3.binance.org:8545/',
  'https://data-seed-prebsc-2-s3.binance.org:8545/',
];

export const LIST_NETWORK_RPC_TESTNET: any = {
  [CHAIN_ID.BSC_TEST]: connector.randomRPCTestnet(LIST_BSC_TESTNET),
  [CHAIN_ID.ETH_TEST]: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
};

export const LIST_NETWORK_RPC_MAINNET: any = {
  [CHAIN_ID.BSC]: import.meta.env.VITE_NETWORK_URL_RPC_BSC,
  [CHAIN_ID.ETH]: import.meta.env.VITE_NETWORK_URL_RPC_ETH,
};

export const SUPPORTED_CHAIN_IDS: CHAIN_ID[] = import.meta.env.DEV ? [CHAIN_ID.BSC] : [CHAIN_ID.BSC];

export const BRIDGE_WALLET_CONNECT_URL = 'https://pancakeswap.bridge.walletconnect.org';

export const METAMASK_DEEP_LINK = 'https://metamask.io/download';

export const NETWORK_URL_BSC = 'https://bsc-dataseed.binance.org/';

export const METAMASK = 'metamask';

export const WALLET_CONNECT = 'walletconnect';

type CHAIN_INFO_TYPE = {
  name: string;
  valueString: string;
  icon: string;
  textWarning: string;
  url: string;
  suffixToken: string;
  explorerName: string;
  suffixKey: string;
  shortName: string;
  tokenAddress?: string;
  swapIcon?: string;
  swapFailedIcon?: string;
  key: string;
};

export const CHAIN_INFO: Record<CHAIN_ID, CHAIN_INFO_TYPE> = {
  [BSCMainnetChainIdDec]: {
    name: 'Binance Smart Chain',
    valueString: BSCMainnetChainIdDec.toString(),
    icon: BSCLogo,
    textWarning: 'Binance Smart Chain - Mainnet',
    url: 'https://bscscan.com',
    suffixToken: 'BEP-20',
    explorerName: 'BSCscan',
    suffixKey: '',
    shortName: 'BSC',
    swapIcon: BSCLogo,
    swapFailedIcon: BSCLogoFailed,
    key: 'BSC',
  },
  [BSCTestnetChainIdDec]: {
    name: 'Binance Smart Chain Testnet',
    valueString: BSCTestnetChainIdDec.toString(),
    icon: BSCLogo,
    textWarning: 'Binance Smart Chain - Testnet',
    url: 'https://testnet.bscscan.com',
    suffixToken: 'BEP-20',
    explorerName: 'BSCscan',
    suffixKey: '',
    shortName: 'BSC',
    swapIcon: BSCLogo,
    swapFailedIcon: BSCLogoFailed,
    key: 'BSC',
  },
  [EtherMainnetChainIdDec]: {
    name: 'Ethereum',
    valueString: EtherMainnetChainIdDec.toString(),
    icon: EthereumLogo,
    textWarning: 'Ethereum - Mainnet',
    url: 'https://etherscan.io',
    suffixToken: 'ERC-20',
    explorerName: 'Etherscan',
    suffixKey: '_ETH',
    shortName: 'ETH',
    swapIcon: ETHLogoSwap,
    swapFailedIcon: ETHLogoFailed,
    key: 'ETH',
  },
  [EtherTestnetChainIdDec]: {
    name: 'Ethereum Testnet (Rinkeby)',
    valueString: EtherTestnetChainIdDec.toString(),
    icon: EthereumLogo,
    textWarning: 'Ethereum (Rinkeby) - Testnet',
    url: 'https://rinkeby.etherscan.io',
    suffixToken: 'ERC-20',
    explorerName: 'Etherscan',
    suffixKey: '_ETH',
    shortName: 'ETH',
    swapIcon: ETHLogoSwap,
    swapFailedIcon: ETHLogoFailed,
    key: 'ETH',
  },
  [PolygonMainnetChainIdDec]: {
    name: 'Polygon',
    valueString: PolygonMainnetChainIdDec.toString(),
    icon: PolygonLogo,
    textWarning: 'Polygon - Mainnet',
    url: 'https://polygonscan.com',
    suffixToken: 'ERC-20',
    explorerName: 'Polygonscan',
    suffixKey: '_POL',
    shortName: 'Polygon',
    key: 'POL',
  },
  [PolygonTestnetChainIdDec]: {
    name: 'Polygon Mumbai Testnet',
    valueString: PolygonTestnetChainIdDec.toString(),
    icon: PolygonLogo,
    textWarning: 'Polygon Mumbai - Testnet',
    url: 'https://mumbai.polygonscan.com',
    suffixToken: 'ERC-20',
    explorerName: 'Polygonscan',
    suffixKey: '_POL',
    shortName: 'Polygon',
    key: 'POL',
  },
};

export const APP_NETWORKS_SUPPORT: Record<CHAIN_ID, { details: any }> = {
  [EtherMainnetChainIdDec]: {
    details: {
      chainId: `0x${(+EtherMainnetChainIdDec).toString(16)}`,
      chainName: CHAIN_INFO[EtherMainnetChainIdDec].name,
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: [LIST_NETWORK_RPC_MAINNET[EtherMainnetChainIdDec]],
      blockExplorerUrls: [CHAIN_INFO[EtherMainnetChainIdDec].url],
    },
  },
  [BSCMainnetChainIdDec]: {
    details: {
      chainId: `0x${(+BSCMainnetChainIdDec).toString(16)}`,
      chainName: CHAIN_INFO[BSCMainnetChainIdDec].name,
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: [LIST_NETWORK_RPC_MAINNET[BSCMainnetChainIdDec]],
      blockExplorerUrls: [CHAIN_INFO[BSCMainnetChainIdDec].url],
    },
  },
  [PolygonMainnetChainIdDec]: {
    details: {
      chainId: `0x${(+PolygonMainnetChainIdDec).toString(16)}`,
      chainName: CHAIN_INFO[PolygonMainnetChainIdDec].name,
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: [LIST_NETWORK_RPC_MAINNET[PolygonMainnetChainIdDec]],
      blockExplorerUrls: [CHAIN_INFO[PolygonMainnetChainIdDec].url],
    },
  },

  [EtherTestnetChainIdDec]: {
    details: {
      chainId: `0x${(+EtherTestnetChainIdDec).toString(16)}`,
      chainName: CHAIN_INFO[EtherTestnetChainIdDec].name,
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: [LIST_NETWORK_RPC_TESTNET[EtherTestnetChainIdDec]],
      blockExplorerUrls: [CHAIN_INFO[EtherTestnetChainIdDec].url],
    },
  },
  [BSCTestnetChainIdDec]: {
    details: {
      chainId: `0x${(+BSCTestnetChainIdDec).toString(16)}`,
      chainName: CHAIN_INFO[BSCTestnetChainIdDec].name,
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: [LIST_NETWORK_RPC_TESTNET[BSCTestnetChainIdDec]],
      blockExplorerUrls: [CHAIN_INFO[BSCTestnetChainIdDec].url],
    },
  },
  [PolygonTestnetChainIdDec]: {
    details: {
      chainId: `0x${(+PolygonTestnetChainIdDec).toString(16)}`,
      chainName: CHAIN_INFO[PolygonTestnetChainIdDec].name,
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: [LIST_NETWORK_RPC_TESTNET[PolygonTestnetChainIdDec]],
      blockExplorerUrls: [CHAIN_INFO[PolygonTestnetChainIdDec].url],
    },
  },
};

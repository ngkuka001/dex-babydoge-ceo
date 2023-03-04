/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NETWORK_URL_RPC_BSC: string;
  readonly VITE_NETWORK_URL_RPC_ETH: string;
  readonly VITE_API_KEY: string;
  readonly VITE_API_URL: string;
  readonly VITE_API_PANCAKESWAP: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

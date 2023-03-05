import PublicLayout from 'components/Layout/Public';
import EarnPage from 'pages/earn';
import HomePage from 'pages/home';
import NftPage from 'pages/nft';
import SwapPage from 'pages/swap';
import TradePage from 'pages/trade';

export const ROUTE_URLS = {
  HOME: '/',
  TRANSACTIONS: '/transactions',
  TERM: '/terms-and-conditions',
  POLICY: '/privacy-policy',
  HOW_IT_WORK: '/how-it-works',
  FAQS: '/faqs',
  SWAP: '/swap',
  TRADE: '/trade',
  EARN: '/earn',
  NFT: '/nft',
  WIN: '/win',
};

export enum PAGE_KEYS {
  HOME = 'HOME',
  MY_TRANSACTION = 'MY_TRANSACTION',
  TERM = 'TERM',
  POLICY = 'POLICY',
  HOW_IT_WORK = 'HOW_IT_WORK',
  FAQS = 'FAQS',
  SWAP = 'SWAP',
  TRADE = 'TRADE',
  EARN = 'EARN',
  NFT = 'NFT',
  WIN = 'WIN',
}

const routes = [
  {
    name: PAGE_KEYS.HOME,
    path: ROUTE_URLS.HOME,
    component: HomePage,
    layout: PublicLayout,
    isPrivate: false,
    index: true,
  },
  {
    name: PAGE_KEYS.TRADE,
    path: ROUTE_URLS.TRADE,
    component: TradePage,
    layout: PublicLayout,
    isPrivate: false,
    index: false,
  },
  {
    name: PAGE_KEYS.EARN,
    path: ROUTE_URLS.EARN,
    component: EarnPage,
    layout: PublicLayout,
    isPrivate: false,
    index: false,
  },
  {
    name: PAGE_KEYS.NFT,
    path: ROUTE_URLS.NFT,
    component: NftPage,
    layout: PublicLayout,
    isPrivate: false,
    index: false,
  },
  {
    name: PAGE_KEYS.WIN,
    path: ROUTE_URLS.WIN,
    component: NftPage,
    layout: PublicLayout,
    isPrivate: false,
    index: false,
  },
];
export default routes;

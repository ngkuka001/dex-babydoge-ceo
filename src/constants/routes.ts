import PublicLayout from 'components/Layout/Public';
import HomePage from 'pages/home';
import SwapPage from 'pages/swap';

export const ROUTE_URLS = {
  HOME: '/',
  TRANSACTIONS: '/transactions',
  TERM: '/terms-and-conditions',
  POLICY: '/privacy-policy',
  HOW_IT_WORK: '/how-it-works',
  FAQS: '/faqs',
  SWAP: '/swap',
};

export enum PAGE_KEYS {
  HOME = 'HOME',
  MY_TRANSACTION = 'MY_TRANSACTION',
  TERM = 'TERM',
  POLICY = 'POLICY',
  HOW_IT_WORK = 'HOW_IT_WORK',
  FAQS = 'FAQS',
  SWAP = 'SWAP',
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
    name: PAGE_KEYS.SWAP,
    path: ROUTE_URLS.SWAP,
    component: SwapPage,
    layout: PublicLayout,
    isPrivate: false,
    index: false,
  },
];
export default routes;

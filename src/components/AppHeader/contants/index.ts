import { ROUTE_URLS } from './../../../constants/routes';
import { getI18n } from 'react-i18next';

export type NavigationProps = {
  key: string;
  text: string;
  link: string;
  children: NavigationProps[];
  isComingSoon: boolean;
};

export const renderNavigation = (): NavigationProps[] => [
  {
    key: 'portfolio',
    text: getI18n()?.t('header.portfolio'),
    link: ROUTE_URLS.HOME,
    children: [],
    isComingSoon: false,
  },
  {
    key: 'trade',
    text: 'Trade',
    link: '/trade',
    children: [],
    isComingSoon: false,
  },
  {
    key: 'earn',
    text: 'Earn',
    link: '/earn',
    children: [],
    isComingSoon: false,
  },
  {
    key: 'nft',
    text: 'NFT',
    link: '/nft',
    children: [],
    isComingSoon: false,
  },
  {
    key: 'win',
    text: 'Win',
    link: '/win',
    children: [],
    isComingSoon: false,
  },
];

export const DEFAULT_NAVIGATION = {
  key: '',
  text: '',
  link: '',
  children: [],
};

export const DRAWER_WIDTH = 375;

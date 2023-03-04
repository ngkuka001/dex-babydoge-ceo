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
  // {
  //   key: 'swap',
  //   text: getI18n()?.t('header.swap'),
  //   link: ROUTE_URLS.SWAP,
  //   children: [],
  //   isComingSoon: false,
  // },
  // {
  //   key: 'trade',
  //   text: getI18n()?.t('header.trade'),
  //   link: '',
  //   children: [],
  //   isComingSoon: true,
  // },
  // {
  //   key: 'stake',
  //   text: getI18n()?.t('header.stake'),
  //   link: '',
  //   children: [],
  //   isComingSoon: true,
  // },
];

export const DEFAULT_NAVIGATION = {
  key: '',
  text: '',
  link: '',
  children: [],
};

export const DRAWER_WIDTH = 375;

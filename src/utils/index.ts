import TYPE_CONSTANTS from 'constants/type';

export const convertAddressToDisplayValue = (address?: string | null, lengthBeforeSlice = 6, lengthAfterSlice = 4) => {
  if (!address) {
    return '';
  }

  if (address?.length < lengthBeforeSlice + 5) {
    return address;
  }
  return address
    ? address.slice(0, lengthBeforeSlice) + '...' + address.slice(address.length - lengthAfterSlice, address.length)
    : '';
};

export const isExternalLink = (link?: string) => {
  return !!(link?.includes('http') || link?.includes('https'));
};

export const getParamSort = (sorter: any) => {
  const { order, field: sortField } = sorter;
  const sortType = order && order === 'descend' ? TYPE_CONSTANTS.SORT_FORMAT.DESC : TYPE_CONSTANTS.SORT_FORMAT.ASC;

  const sortParams: {
    sortField?: string;
    sortType?: number;
  } = {
    sortField,
    sortType,
  };

  if (!order) {
    delete sortParams.sortField;
    delete sortParams.sortType;
  }

  return sortParams;
};

export const getNetWorkByChainId = (chainId: number | string | null, listToken: any[] = []) => {
  if (!chainId) return {};

  return listToken.find((item) => item?.chainId === chainId);
};

export const getNetWorkByChainName = (name: string | null, listToken: any[] = []) => {
  if (!name) return {};

  return listToken.find((item) => item?.name === name);
};

export const getFullPathByEndpoint = (endpoint: string) => {
  return `${import.meta.env.VITE_DOMAIN_URL}/${endpoint}`;
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

import { BigNumber } from 'bignumber.js';

export const greaterThanOrEqualTo = (number1: string | number, number2: string | number) => {
  return new BigNumber(number1).isGreaterThanOrEqualTo(new BigNumber(number2));
};

export const formatNumber = (value: string | number) => {
  return new BigNumber(value).toFormat();
};

import TIME_CONSTANTS from 'constants/time';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

export const formatDateRequest = (value: string) => {
  if (isEmpty(value)) return null;
  return moment(value).clone().startOf('days').format(TIME_CONSTANTS.TIME_FORMAT.DATE_FORMAT_REQUEST);
};

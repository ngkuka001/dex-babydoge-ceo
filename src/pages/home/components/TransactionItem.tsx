import { FC } from 'react';
import { Typography } from 'antd';
import { convertAddressToDisplayValue } from 'utils';
import { useTranslation } from 'react-i18next';
import { dividedPrice, getBlockExplorerLink } from 'services/WalletService/utils';
import { CHAIN_ID } from 'connectors/constants';
import NumberFormat from 'components/NumberFormat';
import OpenInNew from 'resources/svg/OpenInNew';
import moment from 'moment';

const { Paragraph } = Typography;

const TRANSACTION_SUCCESS = '1';

const TransactionItem: FC<{ transaction: any }> = ({ transaction }) => {
  const { t } = useTranslation();
  const { timeStamp, hash, txreceipt_status, from, to, value } = transaction || {};

  return (
    <div className="transaction-item">
      <div>
        <Paragraph>{moment(timeStamp * 1000).format('LLL')}</Paragraph>
        <span>{convertAddressToDisplayValue(hash)}</span>
        {txreceipt_status === TRANSACTION_SUCCESS && <Paragraph>{t('common.complete')}</Paragraph>}
      </div>
      <div>
        <a
          href={getBlockExplorerLink(import.meta.env.DEV ? CHAIN_ID.BSC : CHAIN_ID.BSC, hash)}
          target="_blank"
          rel="noreferrer"
        >
          <OpenInNew />
        </a>
        {value !== '0' && (
          <NumberFormat
            displayType="text"
            value={dividedPrice(value, 18) || 0}
            thousandSeparator
            decimalScale={18}
            suffix={` BNB`}
            className="number"
          />
        )}
        <Paragraph>
          {t('common.from')}: {convertAddressToDisplayValue(from)}
        </Paragraph>
        <Paragraph>
          {t('common.to')}: {convertAddressToDisplayValue(to)}
        </Paragraph>
      </div>
    </div>
  );
};

export default TransactionItem;

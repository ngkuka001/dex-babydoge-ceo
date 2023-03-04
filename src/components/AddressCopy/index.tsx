import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Image, Tooltip } from 'antd';

import IconCopy from 'resources/svg/IconCopy';
import IconChecked from 'resources/svg/IconChecked';
import IconOpenInNew from 'resources/svg/open_in_new.svg';

import { convertAddressToDisplayValue } from 'utils';
import { getBlockExplorerLink, getBlockExplorerName } from 'services/WalletService/utils';

const { Paragraph } = Typography;

type AddressCopyType = { address: string; showBlockExplorerLink?: boolean; chainId?: number; txId?: string };

const AddressCopy: FC<AddressCopyType> = ({ address, showBlockExplorerLink, chainId, txId }) => {
  const { t } = useTranslation();

  return (
    <Paragraph copyable={{ text: address, icon: [<IconCopy key="copy" />, <IconChecked key="checked" />] }}>
      {convertAddressToDisplayValue(address)}{' '}
      {showBlockExplorerLink && chainId && txId && (
        <Tooltip
          title={t('common.view_on', {
            explorer: getBlockExplorerName(chainId),
          })}
        >
          <a href={getBlockExplorerLink(chainId, txId)} target="_blank" rel="noreferrer">
            <Image preview={false} alt="" src={IconOpenInNew} />
          </a>
        </Tooltip>
      )}
    </Paragraph>
  );
};

export default AddressCopy;

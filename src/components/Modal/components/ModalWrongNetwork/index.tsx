import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';

import Modal from '../..';
import selectedConnection from 'store/connection/selector';
import { METAMASK } from 'connectors/constants';
import { useAppSelector } from 'hooks/useStore';
import IconWrongNetwork from 'resources/svg/IconWrongNetwork';

const { Paragraph, Title } = Typography;

type ModalWrongNetworkProps = {};

const ModalWrongNetwork: FC<ModalWrongNetworkProps> = () => {
  const { t } = useTranslation();

  const { isWrongNetwork } = useAppSelector(selectedConnection.getConnection);
  const connectedWalletType = useAppSelector(selectedConnection.getConnectedWalletType);

  return (
    <Modal
      visible={isWrongNetwork}
      wrapClassName="modal_wrong_network"
      showCloseIcon={false}
      closable={false}
      destroyOnClose
    >
      <IconWrongNetwork />
      <Title level={5} className="title">
        {t('common.network_notice_title')}
      </Title>
      <Paragraph>
        {t('common.network_notice_desc', {
          wallet: connectedWalletType === METAMASK ? t('common.metamask') : t('common.wallet_connect'),
        })}
      </Paragraph>
    </Modal>
  );
};

export default ModalWrongNetwork;

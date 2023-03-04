import { useTranslation } from 'react-i18next';

import AppButton from '../AppButton';

import { handleSetConnectModal } from 'store/connection/slice';
import { useAppDispatch } from 'hooks/useStore';
import IconWallet from 'resources/svg/IconWallet';
import { FC } from 'react';

const ConnectWalletButton: FC<{ title?: string }> = ({ title = '' }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleShowConnectModal = () => dispatch(handleSetConnectModal(true));

  return (
    <AppButton
      text={
        <>
          {title || t('common.connect_wallet')}{' '}
          <span className="pulse">
            <span></span>
            <span></span>
          </span>
        </>
      }
      onClick={handleShowConnectModal}
    />
  );
};

export default ConnectWalletButton;

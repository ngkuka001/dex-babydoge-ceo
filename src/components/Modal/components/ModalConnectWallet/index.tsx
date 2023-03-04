import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next';
import { Typography, Space, Image } from 'antd';

import Modal from 'components/Modal';
import AppButton from 'components/AppButton';

import { handleSetConnectedWalletType, handleSetConnectModal, handleSetLoadingMetamask } from 'store/connection/slice';
import selectedConnection from 'store/connection/selector';
import { getErrorConnectMessage } from 'connectors';
import { useConnectWallet } from 'hooks/useConnectWallet';
import { useAppDispatch, useAppSelector } from 'hooks/useStore';
import { METAMASK, METAMASK_DEEP_LINK, WALLET_CONNECT } from 'connectors/constants';
import { loginStart, logout } from 'store/address/slice';
import iconMetaMask from 'resources/svg/logo_metamask.svg';
import iconWalletConnect from 'resources/svg/icon_walletconnect.svg';
import IconDownload from 'resources/svg/IconDownload';

declare let window: any;

const { Paragraph, Title } = Typography;

const ModalConnectWallet = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { active, deactivate, account, chainId } = useWeb3React();
  const { isShowConnectModal } = useAppSelector(selectedConnection.getConnection);

  const handleHideModalConnectWallet = () => dispatch(handleSetConnectModal(false));

  const [isShowMetaMask, setIsShowMetaMask] = useState(false);
  const [connectedWalletType, setConnectedWalletType] = useState('');

  const { connectInjected, connectWalletConnect } = useConnectWallet();
  const isEthereum = typeof window !== 'undefined' && !!window?.ethereum?.isMetaMask;

  useEffect(() => {
    if (isShowConnectModal) {
      setIsShowMetaMask(false);
    }
  }, [isShowConnectModal]);

  const handleConnectMetamask = () => {
    connectInjected(() => setIsShowMetaMask(true), setConnectedWalletType(METAMASK));

    if (window.ethereum) {
      handleHideModalConnectWallet();
    }
  };

  const handleConnectWallet = () => {
    handleHideModalConnectWallet();

    connectWalletConnect({
      failed: (err) => {
        dispatch(handleSetLoadingMetamask(false));
        getErrorConnectMessage(err, deactivate);
        dispatch(logout());
        deactivate();
      },
    });

    setConnectedWalletType(WALLET_CONNECT);
  };

  useEffect(() => {
    if (active && account && chainId && connectedWalletType) {
      dispatch(handleSetConnectedWalletType(connectedWalletType));
      dispatch(
        loginStart({
          address: account,
          chainId,
        }),
      );
    }
  }, [connectedWalletType, active, account, chainId]);

  const handleNoMetamask = () => {
    handleHideModalConnectWallet();
    setIsShowMetaMask(false);
    return null;
  };

  const renderConnectWallet = () => (
    <div className="wallet-modal">
      <Title level={5} className="title">
        {t('common.connect_wallet_modal_title')}
      </Title>

      <Space direction="vertical" size={8}>
        <AppButton
          text={
            <>
              <Image preview={false} src={iconMetaMask} alt="" />
              <Paragraph>
                <span>{t('common.metamask')}</span>
                {t('common.connect_metamask')}
              </Paragraph>
            </>
          }
          onClick={handleConnectMetamask}
          variant="connect"
        />
        <AppButton
          onClick={handleConnectWallet}
          text={
            <>
              <Image preview={false} src={iconWalletConnect} alt="" />

              <Paragraph>
                <span>{t('common.wallet_connect')}</span>
                {t('common.connect_wallet_connect')}
              </Paragraph>
            </>
          }
          variant="connect"
        />
      </Space>
    </div>
  );

  return (
    <Modal
      visible={isShowConnectModal}
      onClose={handleHideModalConnectWallet}
      wrapClassName="modal_connect_wallet"
      width={354}
    >
      {!isShowMetaMask ? renderConnectWallet() : handleNoMetamask()}
    </Modal>
  );
};

export default ModalConnectWallet;

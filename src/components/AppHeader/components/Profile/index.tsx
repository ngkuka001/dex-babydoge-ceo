import { FC } from 'react';
import { Dropdown, Menu, Typography, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useWeb3React } from '@web3-react/core';

import { convertAddressToDisplayValue } from 'utils';
import { logout } from 'store/address/slice';
import selectedAddress from 'store/address/selector';

import { useAppDispatch, useAppSelector } from 'hooks/useStore';

import IconLogout from 'resources/svg/IconLogout';
import AddressCopy from 'components/AddressCopy';
import WalletIcon from 'resources/svg/WalletIcon';
import IconArrowDown from 'resources/svg/IconArrowDown';

const { Paragraph } = Typography;
const { Item } = Menu;

type ProfileProps = {
  onClose?: () => void;
};

const Profile: FC<ProfileProps> = ({ onClose }) => {
  const { t } = useTranslation();

  const { deactivate } = useWeb3React();

  const dispatch = useAppDispatch();

  const { address } = useAppSelector(selectedAddress.getAddress);

  const handleOnClose = () => {
    onClose && onClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    deactivate();
    handleOnClose();
  };

  const menu = (
    <Menu className="profile__dropdown" mode="vertical">
      <Item key="3" className="item" onClick={handleLogout}>
        <a>{t('header.disconnect')}</a>
      </Item>
    </Menu>
  );

  return (
    <>
      <Dropdown
        overlay={menu}
        trigger={['click']}
        placement="bottomRight"
        getPopupContainer={(trigger: any): any => trigger.parentElement}
      >
        <Space className="profile" size={10}>
          <WalletIcon />
          <IconArrowDown />
        </Space>
      </Dropdown>

      <div className="profile_mobile">{menu}</div>
    </>
  );
};

export default Profile;

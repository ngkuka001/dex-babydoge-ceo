import { Drawer } from 'antd';
import { useTranslation } from 'react-i18next';
import { DRAWER_WIDTH, NavigationProps, renderNavigation } from 'components/AppHeader/contants';
import MenuOutline from 'resources/svg/MenuOutline';
import IconClose from 'resources/svg/IconClose';
import Navigation from '../Navigation';
import { useModal } from 'components/Modal/hooks';
import ConnectWalletButton from 'components/ConnectWalletButton';
import { useAppSelector } from 'hooks/useStore';
import selectedAddress from 'store/address/selector';
import Profile from '../Profile';

type DrawerProps = {
  currentPage: NavigationProps;
};
const DrawerMenu: React.FC<DrawerProps> = ({ currentPage, ...props }) => {
  const { t } = useTranslation();

  const { visible: visibleDrawer, onOpenModal: onOpenDrawer, onCloseModal: onCloseDrawer } = useModal();

  const { address } = useAppSelector(selectedAddress.getAddress);

  return (
    <div className="header_mobile">
      <MenuOutline onClick={onOpenDrawer} />
      <Drawer visible={visibleDrawer} width={DRAWER_WIDTH} placement="left" onClose={onCloseDrawer} {...props}>
        <div className="drawer__content">
          <Navigation navigation={renderNavigation()} mode="inline" currentPage={currentPage} onClose={onCloseDrawer} />
        </div>
      </Drawer>
    </div>
  );
};

export default DrawerMenu;

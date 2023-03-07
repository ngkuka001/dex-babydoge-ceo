import { FC } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { MenuMode } from 'antd/lib/menu';
import cx from 'classnames';

import { isExternalLink } from 'utils';
import { NavigationProps } from 'components/AppHeader/contants';
import { useTranslation } from 'react-i18next';

const { SubMenu, Item } = Menu;

type NavigationComponentProps = {
  navigation: NavigationProps[];
  mode: MenuMode | undefined;
  currentPage?: any;
  onClose?: () => void;
};

const Navigation: FC<NavigationComponentProps> = ({ navigation, mode, currentPage, onClose }) => {
  const { t } = useTranslation();

  const handleClickLink = () => {
    onClose && onClose();
  };
  const renderLink = (item: any) => {
    const { key, link, text, isComingSoon } = item;

    return (
      <Item
        key={key}
        className={cx({
          active: currentPage?.key === key,
        })}
      >
        {isExternalLink(link) ? (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            onClick={handleClickLink}
            className={cx({
              active: currentPage?.key === key,
            })}
          >
            {text}
            {isComingSoon && <span className="coming-soon">{t('common.coming_soon')}</span>}
          </a>
        ) : (
          <Link
            to={link}
            onClick={handleClickLink}
            className={cx({
              active: currentPage?.key === key,
            })}
          >
            {text}
            {isComingSoon && <span className="coming-soon">{t('common.coming_soon')}</span>}
          </Link>
        )}
      </Item>
    );
  };

  return (
    <Menu mode={mode as any} overflowedIndicator={false} selectedKeys={['']}>
      {navigation.map((nav) => {
        return nav.children.length ? (
          <SubMenu
            key={nav.key}
            popupClassName="submenu"
            title={mode === 'inline' ? nav.text : <span>{nav.text}</span>}
          >
            {nav.children.map((child: any) => renderLink(child))}
          </SubMenu>
        ) : (
          renderLink(nav)
        );
      })}
    </Menu>
  );
};

export default Navigation;

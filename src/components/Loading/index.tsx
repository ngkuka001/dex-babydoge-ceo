import { Spin, Image } from 'antd';
import { FC } from 'react';
import Icon from '@ant-design/icons';

import IconSpin from 'resources/images/loading.png';

const LoadingComponent: FC<any> = ({ children, spinning, icon }) => {
  const antIcon = (
    <Icon
      component={() => <Image width={40} height={40} preview={false} src={IconSpin} alt="" />}
      className="anticon-spin"
    />
  );

  return (
    <Spin spinning={spinning} indicator={icon || antIcon}>
      {children}
    </Spin>
  );
};

export default LoadingComponent;

import { MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames';
import { Button, Image } from 'antd';
import LoadingComponent from 'components/Loading';
import Icon from '@ant-design/icons';
import Loading from 'resources/images/loading_button.png';

declare const ButtonVariants: ['default', 'primary', 'secondary', 'tertiary', 'connect'];
declare type ButtonVariant = typeof ButtonVariants[number];
type AppButtonProps = {
  variant?: ButtonVariant;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  text: ReactNode;
  disabled?: boolean;
  htmlType?: string | any;
  loading?: boolean;
  href?: string;
  block?: boolean;
};

function AppButton({
  variant = 'default',
  prefixIcon,
  suffixIcon,
  text,
  className,
  loading = false,
  ...props
}: AppButtonProps) {
  return (
    <Button
      className={classNames('button', `button--${variant}`, { className: !!className })}
      loading={loading}
      {...props}
    >
      {!loading && (
        <>
          {prefixIcon && <span className="prefix">{prefixIcon}</span>}
          <span>{text}</span>
          {suffixIcon && <span className="suffix">{suffixIcon}</span>}
        </>
      )}
      {loading && (
        <LoadingComponent
          icon={
            <Icon
              component={() => <Image width={24} height={24} preview={false} src={Loading} alt="" />}
              className="anticon-spin"
            />
          }
          spinning={loading}
        ></LoadingComponent>
      )}
    </Button>
  );
}

export default AppButton;

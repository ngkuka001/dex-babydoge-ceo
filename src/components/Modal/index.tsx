import { Fragment, FC } from 'react';
import { Modal, Typography } from 'antd';
import IconClose from 'resources/svg/IconClose';

// import CloseIcon from 'resources/svg/close_modal_icon.svg';

const { Title } = Typography;

const ModalComponent: FC<{
  title?: any;
  onClose?: any;
  showCloseIcon?: boolean;
  visible: boolean;
  width?: number | string;
  maskClosable?: boolean;
  wrapClassName?: string;
  getContainer?: any;
  destroyOnClose?: boolean;
  closable?: boolean;
}> = ({ children, title, onClose, showCloseIcon = true, width, destroyOnClose = true, maskClosable, ...props }) => {
  return (
    <Modal
      footer={null}
      wrapClassName={'modal'}
      width={width ?? 550}
      destroyOnClose={destroyOnClose}
      onCancel={onClose}
      maskClosable={showCloseIcon}
      closeIcon={<IconClose />}
      style={{ top: '20%' }}
      {...props}
    >
      <Fragment>
        <div className="modal-wrap">
          {title && (
            <Title level={5} className="title">
              {title}
            </Title>
          )}
          {children}
        </div>
      </Fragment>
    </Modal>
  );
};

export default ModalComponent;

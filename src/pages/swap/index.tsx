import { Avatar, Button, Card, Col, Form, Input, InputNumber, List, Modal, Radio, Row, Space, Typography } from 'antd';
import AppButton from 'components/AppButton';
import { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import BSCLogo from 'resources/svg/binance_logo.svg';
import ETHLogo from 'resources/svg/ethereum_logo.svg';

// Data test
const currencyData = [
  {
    title: 'BNB',
    desc: 'Binance Token',
    icon: BSCLogo,
  },
  {
    title: 'ETH',
    desc: 'ETH Token',
    icon: ETHLogo,
  },
];

const SwapPage = () => {
  const [form] = Form.useForm();
  const tolerance = Form.useWatch('tolerance', form);
  const custom = Form.useWatch('custom', form);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState(null);
  const [currentSwap, setCurrentSwap] = useState({
    title: 'BNB',
    desc: 'Binance Token',
    icon: BSCLogo,
  });
  const [currentReceive, setCurrentReceive] = useState({
    title: 'ETH',
    desc: 'ETH Token',
    icon: ETHLogo,
  });

  const onValuesChange = (changedValues: any) => {
    if (changedValues?.tolerance) {
      form.setFieldsValue({ custom: changedValues?.tolerance });
    }
    if (changedValues?.custom) {
      form.setFieldsValue({ tolerance: changedValues?.custom });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openModalToken = (type: any) => {
    console.log('open here', type);
    setType(type);
    showModal();
  };

  const onSelectCurrency = (item: any) => {
    console.log({ item });
    type === 'pay' ? setCurrentSwap(item) : setCurrentReceive(item);
    handleCancel();
  };

  const onSubmit = () => {
    const values = form.getFieldsValue();
    console.log({ values });
  };

  return (
    <section className="swap">
      <Card className="swap-container">
        <Space direction="vertical" size={0} className="card-title-wrapper">
          <Typography.Text className="card-title">Swap Trade</Typography.Text>
          <Typography.Text style={{ marginBottom: '24px' }}>Trade token in a instant</Typography.Text>
        </Space>
        <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
          <Form.Item
            className="pay-input"
            name="pay"
            label={
              <Row justify="space-between" style={{ width: '100%' }}>
                <Col>
                  <Typography.Text className="form-label">You pay</Typography.Text>
                </Col>
                <Col>
                  <Typography.Text>Balance: 3.02</Typography.Text>
                </Col>
              </Row>
            }
          >
            <InputNumber
              stringMode
              className="swap-input"
              size="large"
              addonBefore={
                <Button
                  className="btn-currency"
                  icon={<Avatar src={currentSwap.icon} />}
                  onClick={() => openModalToken('pay')}
                >
                  {currentSwap?.title}
                </Button>
              }
            />
          </Form.Item>
          <Row justify="end">
            <Form.Item name="rate">
              <Radio.Group size="small" buttonStyle="solid" className="swap-rate">
                <Radio.Button value="25">25%</Radio.Button>
                <Radio.Button value="50">50%</Radio.Button>
                <Radio.Button value="75">75%</Radio.Button>
                <Radio.Button value="100">MAX</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Row>
          <Form.Item
            name="receive"
            label={
              <Row justify="space-between" style={{ width: '100%' }}>
                <Col>
                  <Typography.Text className="form-label">You Receive</Typography.Text>
                </Col>
                <Col>
                  <Typography.Text>Balance: 0.0</Typography.Text>
                </Col>
              </Row>
            }
          >
            <InputNumber
              stringMode
              className="swap-input"
              size="large"
              addonBefore={
                <Button
                  className="btn-currency"
                  icon={<Avatar src={currentReceive.icon} />}
                  onClick={() => openModalToken('receive')}
                >
                  {currentReceive?.title}
                </Button>
              }
            />
          </Form.Item>
          <Form.Item>
            <div className="swap-price-info">
              <Row justify="space-between">
                <Typography.Text>Price</Typography.Text>
                <Typography.Text>0.01 BNB / BabyDogeCEO</Typography.Text>
              </Row>
              <Row justify="space-between">
                <Typography.Text>Price Impact</Typography.Text>
                <Typography.Text>{`<0.01%`}</Typography.Text>
              </Row>
              <Row justify="space-between">
                <Typography.Text>Minimum Received</Typography.Text>
                <Typography.Text>91.59 BabyDogeCEO</Typography.Text>
              </Row>
            </div>
          </Form.Item>
          <Row justify="space-between">
            <Typography.Text className="form-label">Slippage Tolerance</Typography.Text>
            <Typography.Text>{custom || tolerance}%</Typography.Text>
          </Row>
          <div className="tolerance-wrapper">
            <Form.Item noStyle name="tolerance">
              <Radio.Group className="swap-tolerance" buttonStyle="solid">
                <Radio.Button value="0.1">0.1%</Radio.Button>
                <Radio.Button value="0.5">0.5%</Radio.Button>
                <Radio.Button value="1">1%</Radio.Button>
                <Radio.Button value="3">3%</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item noStyle name="custom">
              <InputNumber className="swap-custom" stringMode precision={2} placeholder="Custom" />
            </Form.Item>
          </div>

          <AppButton block variant="secondary" text="Connect Walelt" onClick={onSubmit} />
        </Form>
      </Card>
      <Modal
        className="swap-modal"
        footer={false}
        title="Select a Token"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space direction="vertical">
          <Typography.Text>Common tokens</Typography.Text>
          <Space>
            {currencyData?.map((currency, index) => (
              <Button
                className="btn-currency"
                key={index}
                ghost
                icon={<Avatar src={currency.icon} />}
                onClick={() => onSelectCurrency(currency)}
              >
                {currency.title}
              </Button>
            ))}
          </Space>
        </Space>
        <List
          className="current-list"
          bordered={false}
          itemLayout="horizontal"
          dataSource={currencyData}
          renderItem={(item) => (
            <List.Item onClick={() => onSelectCurrency(item)}>
              <List.Item.Meta avatar={<Avatar src={item.icon} />} title={item.title} description={item.desc} />
            </List.Item>
          )}
        />
      </Modal>
    </section>
  );
};

export default SwapPage;

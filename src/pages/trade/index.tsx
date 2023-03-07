import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  InputNumber,
  List,
  Modal,
  Radio,
  Row,
  Space,
  Tabs,
  Typography,
} from 'antd';
import AppButton from 'components/AppButton';
import { useState } from 'react';
import BSCLogo from 'resources/svg/binance_logo.svg';
import ETHLogo from 'resources/svg/ethereum_logo.svg';
import CEOLogo from 'resources/svg/babydogeceo.png';
import { SettingOutlined } from '@ant-design/icons';

// Data test
const currencyData = [
  {
    title: 'BNB',
    desc: 'Binance Token',
    icon: BSCLogo,
  },
  {
    title: 'BABYCEO',
    desc: 'BABYCEO Token',
    icon: CEOLogo,
  },
  {
    title: 'ETH',
    desc: 'ETH Token',
    icon: ETHLogo,
  },
];

const TradePage = () => {
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
    title: 'BABYCEO',
    desc: 'BABYCEO Token',
    icon: CEOLogo,
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
      <Row justify="center" style={{ margin: 8 }}>
        <Tabs defaultActiveKey="1" style={{ width: '100%' }}>
          <Tabs.TabPane tab="Swap" key="1">
            <Card className="swap-container">
              <Row justify="space-between" align="middle" className="card-title-wrapper">
                <Typography.Text strong className="card-title">
                  Swap
                </Typography.Text>
                <SettingOutlined
                  style={{
                    color: 'white',
                    cursor: 'pointer',
                  }}
                />
              </Row>
              <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
                <div className="swap-box">
                  <Row justify="space-between" style={{ width: '100%' }}>
                    <Col>
                      <Typography.Text className="form-label">From</Typography.Text>
                    </Col>
                    <Col>
                      <Button
                        className="btn-currency"
                        icon={<Avatar src={currentSwap.icon} />}
                        onClick={() => openModalToken('pay')}
                      >
                        {currentSwap?.title}
                      </Button>
                    </Col>
                  </Row>

                  <Form.Item className="pay-input mt-4" name="pay">
                    <Space>
                      <InputNumber stringMode placeholder="0.00" className="swap-input" size="large" />
                      <Typography.Text strong className="text-primary-color">
                        MAX
                      </Typography.Text>
                    </Space>
                  </Form.Item>
                  <Row justify="space-between" style={{ width: '100%', marginTop: 16 }}>
                    <Col>
                      <Typography.Text className="">≈0.00$</Typography.Text>
                    </Col>
                    <Col>
                      <Typography.Text>Balance: 0 BNB</Typography.Text>
                    </Col>
                  </Row>
                </div>
                <div className="swap-box mt-4">
                  <Row justify="space-between" style={{ width: '100%' }}>
                    <Col>
                      <Typography.Text className="form-label">To</Typography.Text>
                    </Col>
                    <Col>
                      <Button
                        className="btn-currency"
                        icon={<Avatar src={currentReceive.icon} />}
                        onClick={() => openModalToken('receive')}
                      >
                        {currentReceive?.title}
                      </Button>
                    </Col>
                  </Row>

                  <Form.Item className="pay-input mt-4" name="pay">
                    <Space>
                      <InputNumber stringMode placeholder="0.00" className="swap-input" size="large" />
                      <Typography.Text strong className="text-primary-color">
                        MAX
                      </Typography.Text>
                    </Space>
                  </Form.Item>
                  <Row justify="space-between" style={{ width: '100%', marginTop: 16 }}>
                    <Col>
                      <Typography.Text className="">≈0.00$</Typography.Text>
                    </Col>
                    <Col>
                      <Typography.Text>Balance: 0 BABYCEO</Typography.Text>
                    </Col>
                  </Row>
                </div>

                {/* <Row justify="end">
            <Form.Item name="rate">
              <Radio.Group size="small" buttonStyle="solid" className="swap-rate">
                <Radio.Button value="25">25%</Radio.Button>
                <Radio.Button value="50">50%</Radio.Button>
                <Radio.Button value="75">75%</Radio.Button>
                <Radio.Button value="100">MAX</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Row> */}
                <Form.Item>
                  <div className="swap-price-info mt-4">
                    <Typography.Text strong className="text-primary-color" style={{ fontSize: 20 }}>
                      1 BNB ≈ 0.00 BABYCEO
                    </Typography.Text>
                    <Row justify="space-between">
                      <Typography.Text>Expected output</Typography.Text>
                      <Typography.Text className="text-primary-color">0.00 BABYCEO</Typography.Text>
                    </Row>
                    <Row justify="space-between">
                      <Typography.Text>Liquidity provider fee</Typography.Text>
                      <Typography.Text className="text-primary-color">0.0025 %</Typography.Text>
                    </Row>
                    <Row justify="space-between">
                      <Typography.Text>Minimum received</Typography.Text>
                      <Typography.Text className="text-primary-color">0.00 BABYCEO</Typography.Text>
                    </Row>
                    <Row justify="space-between">
                      <Typography.Text>Price impact</Typography.Text>
                      <Typography.Text style={{ color: 'green' }}>≈ 0.00%</Typography.Text>
                    </Row>
                  </div>
                </Form.Item>
                {/* <Row justify="space-between">
            <Typography.Text className="form-label">Slippage Tolerance</Typography.Text>
            <Typography.Text>{custom || tolerance}%</Typography.Text>
          </Row> */}
                {/* <div className="tolerance-wrapper">
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
          </div> */}

                <AppButton block variant="secondary" text="CONNECT WALLET" onClick={onSubmit} />
              </Form>
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Liquidity" key="2">
            <Card className="swap-container">
              <Row justify="space-between" align="middle" className="card-title-wrapper">
                <Typography.Text strong className="card-title">
                  Liquidity
                </Typography.Text>
              </Row>
              <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
                <Row justify="center">
                  <Avatar size={120} src={CEOLogo} />
                </Row>
                <Row justify="center" className="mt-4">
                  <Typography.Text className="text-primary-color">No liquidity found</Typography.Text>
                </Row>
                <Divider style={{ background: 'rgba(56, 191, 254, 0.2)' }} />
                <Row justify="center">
                  <Typography.Text type="secondary">Do not see a pool you join?</Typography.Text>
                </Row>
                <Button
                  size="large"
                  type="primary"
                  className="btn-primary mt-4"
                  ghost
                  block
                  style={{ borderRadius: 6 }}
                >
                  FIND OTHER BABYCEO TOKENS
                </Button>
                <Divider style={{ background: 'rgba(56, 191, 254, 0.2)' }} />
                <AppButton block variant="secondary" text="ADD LIQUIDITY" onClick={onSubmit} />
              </Form>
            </Card>
          </Tabs.TabPane>
        </Tabs>
      </Row>
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

export default TradePage;

import { CaretRightOutlined, CheckOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Collapse, Row, Space, Typography } from 'antd';
import { FC } from 'react';
import CEOLogo from 'resources/svg/babydogeceo.png';
import ETHLogo from 'resources/svg/ethereum_logo.svg';
import BSCLogo from 'resources/svg/binance_logo.svg';
const { Panel } = Collapse;

const dataFake = [
  { apr: '318.6', liquidity: '219.13', multiplier: '30' },
  { apr: '281.5', liquidity: '337.14', multiplier: '40' },
  { apr: '174.9', liquidity: '573.65', multiplier: '8' },
  { apr: '6.1', liquidity: '829.15', multiplier: '10' },
  { apr: '3.3', liquidity: '46.13', multiplier: '50' },
];

const Farm: FC<any> = () => {
  return (
    <>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        {dataFake.map((item, index) => (
          <Collapse key={index}>
            <Panel
              header={
                <Row align="middle">
                  <Col span={4}>
                    <Space>
                      <Avatar size={32} src={CEOLogo} />
                      <Avatar size={32} src={index % 2 === 0 ? ETHLogo : BSCLogo} />
                    </Space>
                  </Col>
                  <Col span={4}>
                    <Typography.Text>Verified</Typography.Text>
                  </Col>
                  <Col span={4}>
                    <Space size={0} direction="vertical">
                      <Typography.Text type="secondary">EARNED</Typography.Text>
                      <Typography.Text type="secondary">0</Typography.Text>
                    </Space>
                  </Col>
                  <Col span={4}>
                    <Space size={0} direction="vertical">
                      <Typography.Text type="secondary">APR</Typography.Text>
                      <Typography.Text>{item.apr}%</Typography.Text>
                    </Space>
                  </Col>

                  <Col span={4}>
                    <Space size={0} direction="vertical">
                      <Typography.Text type="secondary">LIQUIDITY</Typography.Text>
                      <Typography.Text>${item.liquidity}</Typography.Text>
                    </Space>
                  </Col>
                  <Col span={4}>
                    <Space size={0} direction="vertical">
                      <Typography.Text type="secondary">MULTIPLIER</Typography.Text>
                      <Typography.Text>{item.multiplier}X</Typography.Text>
                    </Space>
                  </Col>
                </Row>
              }
              key="1"
            >
              <Row gutter={16} align="middle" className="mt-4">
                <Col span={4}>
                  <Space direction="vertical">
                    <Row align="middle">
                      <CaretRightOutlined />
                      <Typography.Text> GET BABYCEO</Typography.Text>
                    </Row>
                    <Row align="middle">
                      <CaretRightOutlined />
                      <Typography.Text> VIEW CONTRACT</Typography.Text>
                    </Row>
                    <Row align="middle">
                      <CaretRightOutlined />
                      <Typography.Text> SEE PAIR INFO</Typography.Text>
                    </Row>
                  </Space>
                </Col>
                <Col span={10}>
                  <div className="earn__extra-box">
                    <Typography.Text>BABYCEO EARNED</Typography.Text>
                    <Row justify="space-between" className="mt-4">
                      <Typography.Text>0.00000</Typography.Text>
                      <Button disabled size="large">
                        HARVEST
                      </Button>
                    </Row>
                  </div>
                </Col>
                <Col span={10}>
                  <div className="earn__extra-box">
                    <Typography.Text>BABYCEO EARNED</Typography.Text>
                    <Row justify="space-between">
                      <Button type="primary" size="large" className="mt-4">
                        CONNECT WALLET
                      </Button>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Panel>
          </Collapse>
        ))}
      </Space>
    </>
  );
};

export default Farm;

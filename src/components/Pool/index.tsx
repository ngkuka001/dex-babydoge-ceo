import { CaretRightOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Collapse, Row, Space, Typography } from 'antd';
import { FC } from 'react';
import CEOLogo from 'resources/svg/babydogeceo.png';
import ETHLogo from 'resources/svg/ethereum_logo.svg';
import BSCLogo from 'resources/svg/binance_logo.svg';

const { Panel } = Collapse;

const dataFake = [
  { total: '51.55', apr: '219.13', end: '6.144.666' },
  { total: '14.56', apr: '51.13', end: '11.551.561' },
  { total: '66.14', apr: '78.13', end: '8.145.155' },
  { total: '87.77', apr: '145.13', end: '1.878.891' },
];

const Pool: FC<any> = () => {
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
                      <Avatar size={32} src={index % 2 === 0 ? ETHLogo : BSCLogo} />
                      <Avatar size={32} src={CEOLogo} />
                    </Space>
                  </Col>
                  <Col span={4}>
                    <Space size={0} direction="vertical">
                      <Typography.Text type="secondary">EARN QUARDIAN</Typography.Text>
                      <Typography.Text>STAKE BABYCEO</Typography.Text>
                    </Space>
                  </Col>
                  <Col span={4}>
                    <Space size={0} direction="vertical">
                      <Typography.Text type="secondary">QUARDIAN EARNED</Typography.Text>
                      <Typography.Text>0.0</Typography.Text>
                    </Space>
                  </Col>
                  <Col span={4}>
                    <Space size={0} direction="vertical">
                      <Typography.Text type="secondary">TOTAL STAKED</Typography.Text>
                      <Typography.Text>{item.total} BABYCEO</Typography.Text>
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
                      <Typography.Text type="secondary">ENDS IN</Typography.Text>
                      <Typography.Text>{item.end} BLOCKS</Typography.Text>
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
                    <Typography.Text>BABYBCEO EARNED</Typography.Text>
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
                    <Typography.Text>BABYBCEO EARNED</Typography.Text>
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

export default Pool;

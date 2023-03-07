import { Avatar, Button, Col, Collapse, Row, Space, Typography } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import CEOLogo from 'resources/svg/babydogeceo.png';
import BSCLogo from 'resources/svg/binance_logo.svg';
import ETHLogo from 'resources/svg/ethereum_logo.svg';
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const EarnPage = () => {
  return (
    <section className="earn">
      <Row>
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
          <Row justify="center">
            <Typography.Title>Farms</Typography.Title>
          </Row>
          {[...Array(5)].map((_, index) => (
            <Collapse key={index}>
              <Panel
                header={
                  <Row align="middle">
                    <Col span={4}>
                      <Space>
                        <Avatar size={32} src={CEOLogo} />
                        <Avatar size={32} src={ETHLogo} />
                      </Space>
                    </Col>
                    <Col span={4}>
                      <Typography.Text>Verified</Typography.Text>
                    </Col>
                    <Col span={4}>
                      <Space size={0} direction="vertical">
                        <Typography.Text>EARNED</Typography.Text>
                        <Typography.Text>0</Typography.Text>
                      </Space>
                    </Col>
                    <Col span={4}>
                      <Space size={0} direction="vertical">
                        <Typography.Text>APR</Typography.Text>
                        <Typography.Text>0</Typography.Text>
                      </Space>
                    </Col>

                    <Col span={4}>
                      <Space size={0} direction="vertical">
                        <Typography.Text>LIQUIDITY</Typography.Text>
                        <Typography.Text>0</Typography.Text>
                      </Space>
                    </Col>
                    <Col span={4}>
                      <Space size={0} direction="vertical">
                        <Typography.Text>MULTIPLIER</Typography.Text>
                        <Typography.Text>30X</Typography.Text>
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
                      <Typography.Text>ALIEN EARNED</Typography.Text>
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
                      <Typography.Text>ALIEN EARNED</Typography.Text>
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
      </Row>
    </section>
  );
};

export default EarnPage;

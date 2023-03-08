import { Collapse, Row, Space, Tabs, Typography } from 'antd';
import Farm from 'components/Farm';
import Pool from 'components/Pool';
import { useState } from 'react';
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const EarnPage = () => {
  const [page, setPage] = useState('FARMS');
  const onChange = (key: string) => setPage(key);
  return (
    <section className="earn">
      <Row>
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
          <Row justify="center">
            <Typography.Title>{page}</Typography.Title>
          </Row>

          <Tabs defaultActiveKey="1" centered onChange={onChange}>
            <Tabs.TabPane tab="FARMS" key="FARMS">
              <Farm />
            </Tabs.TabPane>
            <Tabs.TabPane tab="POOLS" key="POOLS">
              <Pool />
            </Tabs.TabPane>
          </Tabs>
        </Space>
      </Row>
    </section>
  );
};

export default EarnPage;

import { Avatar, Button, Col, Image, Row, Space, Typography } from 'antd';
import CEOLogo from 'resources/svg/babydogeceo.png';
import Box from 'resources/images/babydoge-box.png';

const NftPage = () => {
  return (
    <section className="nft">
      <Row align="middle" gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Image preview={false} width={300} src={CEOLogo} />
        </Col>
        <Col xs={24} md={12}>
          <div className="nft__card">
            <div className="nft__card-content">
              <div className="card-title-primary">BABYDOGE CEO</div>
              <div className="card-text-primary">NFT BOX</div>
              <Image className="animate-jump" preview={false} width={400} src={Box} />
              <Row justify="space-between" style={{ width: '100%' }}>
                <span>Amount:</span>
                <span>0/888</span>
              </Row>
              <Row justify="space-between" style={{ width: '100%' }}>
                <span>Price:</span>
                <span>80,000,000 BABYCEO/BOX</span>
              </Row>
              <Button block type="primary" size="large" className="mt-4">
                MINT BOX
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default NftPage;

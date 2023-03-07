import { Typography } from 'antd';
import ConnectWalletButton from 'components/ConnectWalletButton';

import { useAppSelector } from 'hooks/useStore';
import { t } from 'i18next';
import InfiniteScroll from 'react-infinite-scroller';
import selectedAddress from 'store/address/selector';
import Profile from './components/Profile';
import TransactionItem from './components/TransactionItem';
import useGetTransactionList from './hooks/useGetTransactionList';

const { Title, Paragraph } = Typography;

const HomePage = () => {
  const { address } = useAppSelector(selectedAddress.getAddress);

  const { listTransaction, hasMore, fetchMore } = useGetTransactionList(address);

  return (
    <section className="home">
      <Title level={1}>{t('home.title')}</Title>
      <Paragraph>{t('home.sub_title')}</Paragraph>
      <div className="wrapper">
        {address ? (
          <div className="connected">
            <Profile />
            <div>
              <Paragraph>{t('home.history')}</Paragraph>
              {listTransaction?.length > 0 && (
                <div className="list-transaction">
                  <InfiniteScroll pageStart={0} loadMore={fetchMore} hasMore={hasMore} useWindow={false} threshold={50}>
                    {listTransaction.map((transaction: any, index: number) => (
                      <TransactionItem key={index} transaction={transaction} />
                    ))}
                  </InfiniteScroll>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="connect">
            <Paragraph className="title">{t('home.not_connect')}</Paragraph>
            <Paragraph>{t('home.not_connect_sub')}</Paragraph>
            <ol
              dangerouslySetInnerHTML={{
                __html: t('home.content'),
              }}
            />
            <ConnectWalletButton title={t('common.connect_wallet_btn')} />
          </div>
        )}
      </div>
    </section>
  );
};

export default HomePage;

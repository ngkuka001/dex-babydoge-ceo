import { useTranslation } from 'react-i18next';
import { Col, Row, Typography } from 'antd';
import { convertAddressToDisplayValue } from 'utils';
import { useWeb3React } from '@web3-react/core';
import useGetAsset from '../hooks/useGetAsset';
import NumberFormat from 'components/NumberFormat';
import { addValue, multiplyValue } from 'services/WalletService/utils';
import { useMemo } from 'react';
import AppButton from 'components/AppButton';
import { useAppDispatch, useAppSelector } from 'hooks/useStore';
import selectToken from 'store/tokens/selector';
import cloneDeep from 'lodash/cloneDeep';
import { handleSetHideToken } from 'store/tokens/slice';
import { useModal } from 'components/Modal/hooks';
import ModalComponent from 'components/Modal';

const { Paragraph, Title } = Typography;

const Profile = () => {
  const { t } = useTranslation();

  const { visible, onOpenModal, onCloseModal } = useModal();

  const { account } = useWeb3React();

  const dispatch = useAppDispatch();

  const hideToken = useAppSelector(selectToken.getHideToken);

  const { tokenPrice, balance, busdPrice, balances } = useGetAsset();

  const totalAssets = useMemo(() => {
    return balances && balances.length > 0
      ? balances.map(({ currency, value }: any) => multiplyValue([currency?.price, value]))
      : [0];
  }, [balances]);

  const handleHideToken = (token: string) => () => {
    if (!account) {
      return;
    }

    const newHideToken = cloneDeep(hideToken);

    dispatch(
      handleSetHideToken({
        ...newHideToken,
        [account]: {
          ...newHideToken[account],
          [token]: token,
        },
      }),
    );
  };

  const handleRestoreToken = (token: string) => () => {
    if (!account) {
      return;
    }

    const newHideToken = cloneDeep(hideToken);
    delete newHideToken?.[account]?.[token];

    dispatch(handleSetHideToken(newHideToken));
  };

  const accountHiddenTokens = account ? hideToken?.[account] : null;

  return (
    <div className="asset">
      <div className="asset__title">
        <Paragraph>{t('home.asset')}</Paragraph>
        <AppButton variant="tertiary" text={t('common.hidden_tokens')} onClick={onOpenModal} />
      </div>
      <div className="asset__info">
        <div>
          <span>{t('home.overview')}</span>
          <Paragraph>{convertAddressToDisplayValue(account, 10, 10)}</Paragraph>
          <NumberFormat
            displayType="text"
            value={addValue([tokenPrice, ...(totalAssets as any[])]) || 0}
            thousandSeparator
            decimalScale={2}
            prefix={`$ `}
            className="ant-typography"
            style={{ fontSize: 32, margin: '8px 0' }}
          />

          <span className="small">
            {t('home.asset_count', {
              count:
                1 +
                (balances.length || 0) -
                (account && accountHiddenTokens ? Object.keys(accountHiddenTokens)?.length : 0 || 0),
            })}
          </span>
        </div>
        <div>
          <div></div>
        </div>
      </div>

      <div className="asset__title-sub">
        <Paragraph>{t('home.tokens')}</Paragraph>
      </div>
      <div className="asset__info-sub">
        {account && !accountHiddenTokens?.['BNB'] && (
          <div className="token">
            <div>
              BNB
              <br />
              <NumberFormat
                displayType="text"
                value={busdPrice || 0}
                thousandSeparator
                decimalScale={4}
                prefix={`$`}
                className="green"
              />
            </div>
            <div className="text-right">
              <NumberFormat displayType="text" value={balance || 0} thousandSeparator decimalScale={3} />
              <NumberFormat
                displayType="text"
                value={tokenPrice || 0}
                thousandSeparator
                decimalScale={4}
                prefix={`$`}
                className="green"
              />
            </div>
            <div>
              <AppButton variant="secondary" text={t('common.hide')} onClick={handleHideToken('BNB')} />
            </div>
          </div>
        )}

        {balances.map(({ currency, value }) => {
          const { symbol, price } = currency || {};

          return account && !accountHiddenTokens?.[symbol] ? (
            <div className="token" key={symbol}>
              <div>
                {symbol}
                <br />
                <NumberFormat
                  displayType="text"
                  value={price || 0}
                  thousandSeparator
                  prefix={`$`}
                  className="green"
                  decimalScale={6}
                />
              </div>

              <div className="text-right">
                <NumberFormat displayType="text" value={value || 0} thousandSeparator />
                <NumberFormat
                  displayType="text"
                  value={multiplyValue([value, price]) || 0}
                  thousandSeparator
                  prefix={`$`}
                  className="green"
                  decimalScale={6}
                />
              </div>
              <div>
                <AppButton variant="secondary" text={t('common.hide')} onClick={handleHideToken(symbol)} />
              </div>
            </div>
          ) : null;
        })}
      </div>

      <ModalComponent width={343} wrapClassName="modal-hide-token" visible={visible} onClose={onCloseModal}>
        <Title level={5} className="title">
          {t('common.hidden_tokens')}
        </Title>
        <Row gutter={16} className="row-title">
          <Col span={12}>
            <Paragraph>{t('common.token')}</Paragraph>
          </Col>
          <Col span={12}>
            <Paragraph>{t('common.actions')}</Paragraph>
          </Col>
        </Row>

        {account &&
          accountHiddenTokens &&
          Object.values(accountHiddenTokens)?.map((token, index) => (
            <Row key={index} gutter={[16, 16]} align="middle">
              <Col span={12}>
                <Paragraph>{token as string}</Paragraph>
              </Col>
              <Col span={12}>
                <AppButton
                  variant="secondary"
                  text={t('common.restore')}
                  onClick={handleRestoreToken(token as string)}
                />
              </Col>
            </Row>
          ))}
      </ModalComponent>
    </div>
  );
};

export default Profile;

import ReactDOM from 'react-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Buffer } from 'buffer';

import App from './App';
import { persistor, store } from 'store/configStore';
import { LIBRARY_CONSTANTS } from 'constants/library';
import AppConnectWalletWrapper from 'components/AppConnectWalletWrapper';
import reportWebVitals from './reportWebVital';

import 'antd/dist/antd.css';
import './styles/_app.scss';

const onBeforeLift: any = (store: any) => () => {};

window.Buffer = Buffer;

ReactDOM.render(
  <Web3ReactProvider getLibrary={LIBRARY_CONSTANTS.getLibrary}>
    <Provider store={store}>
      <PersistGate onBeforeLift={onBeforeLift(store)} loading={null} persistor={persistor}>
        <AppConnectWalletWrapper>
          <App />
        </AppConnectWalletWrapper>
      </PersistGate>
    </Provider>
  </Web3ReactProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

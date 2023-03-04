import { useAppDispatch } from 'hooks/useStore';
import { useMemo, useState, useEffect } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { getErrorConnectMessage, injected, walletConnect } from 'connectors';
import { logout } from 'store/address/slice';
import { handleSetConnectedWalletType } from 'store/connection/slice';

export const useConnectWallet = () => {
  const { activate, deactivate, active } = useWeb3React();

  const dispatch = useAppDispatch();

  const [currentConnector, setCurrentConnector] = useState<any>(null);

  const handleDeactivate = () => {
    dispatch(logout());
    dispatch(handleSetConnectedWalletType(''));

    deactivate();
  };

  useEffect(() => {
    if (currentConnector && currentConnector?.on) {
      currentConnector.on('Web3ReactDeactivate', handleDeactivate);
    }

    return () => {
      if (currentConnector && currentConnector.removeListener && active) {
        currentConnector.removeListener('Web3ReactDeactivate', handleDeactivate);
      }
    };
  }, [currentConnector, active]);

  const connect = useMemo(() => {
    return {
      connectInjected(metamaskNotFound?: any, callbackSuccess?: any, callbackError?: any): void {
        injected.isAuthorized().then(async (isAuthorized: boolean) => {
          callbackSuccess && callbackSuccess();
          setCurrentConnector(injected);
          console.log(isAuthorized, 'isAuthorized');
          await activate(injected, undefined, true).catch((error) => {
            callbackError && callbackError();
            getErrorConnectMessage(error, deactivate, metamaskNotFound);
          });
        });
      },

      connectWalletConnect(callback?: { failed: (err: any) => void }): void {
        walletConnect.walletConnectProvider = undefined;

        walletConnect &&
          activate(walletConnect, undefined, true)
            .then(() => {
              setCurrentConnector(walletConnect);
            })
            .catch(async (error) => {
              getErrorConnectMessage(error, deactivate);
              if (error instanceof UnsupportedChainIdError) {
                await activate(walletConnect, undefined, true).catch((error) => console.log(error, 'error')); // a little janky...can't use setError because the connector isn't set
                callback && callback.failed(error);
              }
            });
      },
    };
  }, []);

  return connect;
};

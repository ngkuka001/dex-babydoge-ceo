import { put, takeLatest } from 'redux-saga/effects';
import { logout, logoutSuccess } from './slice';
import { handleSetConnectedWalletType } from 'store/connection/slice';

function* logoutSaga() {
  localStorage?.removeItem('walletconnect');

  yield put(logoutSuccess());
  yield put(handleSetConnectedWalletType(''));
}

export function* watchAddress() {
  yield takeLatest(logout, logoutSaga);
}

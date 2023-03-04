import { combineReducers } from 'redux';

import AddressSlice, { namespace as AddressNamespace } from './address/slice';
import ConnectionSlice, { namespace as ConnectionNamespace } from './connection/slice';
import TransactionSlice, { namespace as TransactionNamespace } from './transaction/slice';
import BalanceListSlice, { namespace as BalanceListNamespace } from './balance/slice';
import LanguageSlice, { namespace as LanguageNamespace } from './language/slice';
import TokenSlice, { namespace as TokenNamespace } from './tokens/slice';

export default combineReducers({
  [AddressNamespace]: AddressSlice,
  [ConnectionNamespace]: ConnectionSlice,
  [TransactionNamespace]: TransactionSlice,
  [BalanceListNamespace]: BalanceListSlice,
  [LanguageNamespace]: LanguageSlice,
  [TokenNamespace]: TokenSlice,
});

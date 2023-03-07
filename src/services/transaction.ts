import { api } from './api';

class TransactionService {
  private TRANSACTION = '/transaction';
  private UPDATE_TRANSACTION = '/transaction/client';

  get transactionUrl() {
    return this.TRANSACTION;
  }
  get updateTransactionUrl() {
    return this.UPDATE_TRANSACTION;
  }

  constructor() {}

  createTransaction = (params: any): any => {
    return api.post(this.transactionUrl, params);
  };

  updateTransactionStatus = (params: any): any => {
    const { internalTxId, ...restParams } = params || {};
    return api.put(`${this.updateTransactionUrl}/${internalTxId}`, restParams);
  };
}

const transactionService = new TransactionService();

export default transactionService;

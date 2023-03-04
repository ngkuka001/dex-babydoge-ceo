import axios from 'axios';
import { useEffect, useState } from 'react';
import { api } from 'services/api';

const DEFAULT_LIST_TRANSACTION_PARAMS = {
  page: 1,
  offset: 10,
};

const useGetTransactionList = (address: string) => {
  const [hasMore, setHasMore] = useState(true);
  const [listTransaction, setListTransaction] = useState([]);
  const [searchLimit, setSearchLimit] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getListTransactionFailed = () => {
    setHasMore(false);
    setListTransaction([]);
    setSearchLimit(0);
  };

  const getListTransaction = async (params = DEFAULT_LIST_TRANSACTION_PARAMS) => {
    setHasMore(false);
    setSearchLimit(params?.offset);
    setIsLoading(true);

    try {
      const url = import.meta.env.DEV ? 'https://api.bscscan.com/api' : 'https://api.bscscan.com/api';

      const response = await axios.get(
        `${url}?module=account&action=txlist&address=${address}&startBlock=0&endBlock=99999999&page=${
          params?.page
        }&offset=${params.offset}&sort=desc&apiKey=${import.meta.env.VITE_API_KEY}`,
      );

      if (response?.data?.message === 'OK') {
        setHasMore(response?.data?.result?.length === params.offset);
        setListTransaction(response?.data?.result);
        setSearchLimit(params?.offset);
      } else {
        getListTransactionFailed();
      }
    } catch (e) {
      getListTransactionFailed();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      getListTransaction();
    }
  }, [address]);

  const fetchMore = () => {
    if (!!hasMore && !isLoading) {
      getListTransaction({
        ...DEFAULT_LIST_TRANSACTION_PARAMS,
        offset: searchLimit + DEFAULT_LIST_TRANSACTION_PARAMS.offset,
      });
    }
  };

  return {
    listTransaction,
    hasMore,
    fetchMore,
  };
};

export default useGetTransactionList;

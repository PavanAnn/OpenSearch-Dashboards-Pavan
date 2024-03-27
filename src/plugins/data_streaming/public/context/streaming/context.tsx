/* eslint-disable @typescript-eslint/consistent-type-definitions */
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { getUrlPolicies } from '../../../../../util/index';
import { CardType } from '../../types/Streaming';
import Axios, { getCookie } from '../../../../../Interceptors/HttpRequest';

type Context = {
  filter: string;
  card: CardType[];
  total: number;
  maxCreate: number;
  policies: any;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setPolicies: (policies: any) => void;
  setFilter: (filter: string) => void;
  setCard: (card: CardType[]) => void;
  handleSearchCard: () => void;
  handleSearchClean: () => void;
  checkTotalStreaming: () => void;
  handleUpdate: (item: any, enabled: boolean) => Promise<any>;
  handleSearchPolicy: () => void;
  handleDelete: (item: any) => Promise<any>;
  getPermission: () => Promise<boolean>;
};

type Props = {
  children: ReactNode;
};

// @ts-ignore
export const StreamingContext = createContext<Context>(null);

export const StreamingContextProvider = ({ children }: Props) => {
  const [policies, setPolicies] = useState<Array<any>>([]);
  const [maxCreate] = useState(2);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<string>(() => {
    const data = localStorage.getItem('filter');
    return data ? data : '';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [card, setCard] = useState<CardType[]>([]);

  useEffect(() => {
    localStorage.setItem('filter', filter);
  }, [filter]);

  useEffect(() => {
    checkTotalStreaming();
    handleSearchPolicy();
  }, []);

  const handleSearchCard = async () => {
    setCard([]);
    setIsLoading(true);
    try {
      Axios.get(`/analytics/v1/data-streaming${filter ? `?stream_name=${filter}` : ''}`).then(
        (response) => {
          setCard(response.data);
          setIsLoading(false);
        }
      );
    } catch (error) {
      setIsLoading(false);
    }
  };

  const checkTotalStreaming = async () => {
    setIsLoading(true);
    try {
      Axios.get(`/analytics/v1/data-streaming`).then((response) => {
        setTotal(response.data.length);
        setCard(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (item: any, enabled: boolean) => {
    try {
      const response = await Axios.put(`/analytics/v1/data-streaming/${item._id}`, {
        _id: item._id,
        enabled,
        config: item.config,
        exporter: item.exporter,
        stream_name: item.stream_name,
      });
      return response.status;
    } catch (error) {
      // @ts-ignore
      return error?.response.status;
    }
  };

  const handleSearchClean = async () => {
    setFilter('');
    setCard([]);
    setIsLoading(true);
    try {
      Axios.get(`/analytics/v1/data-streaming`).then((response) => {
        setCard(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleSearchPolicy = async () => {
    try {
      if (window.location.hostname.includes('sbox')) {
        setPolicies([
          // 'analytics.logs.search',
          'analytics.logs.view',
          'analytics.general-traces.query',
          'analytics.traces.search',
          'analytics.auth.dashboards',
          'analytics.products.configuration',
          'analytics.data-streaming.view',
          'analytics.data-streaming.create',
          'analytics.data-streaming.delete',
          'analytics.data-streaming.update',
        ]);
      } else if (localStorage.getItem('ls.Sensedia-Auth')) {
        if (await getPermission()) {
          setPolicies([
            'analytics.logs.view',
            'analytics.general-traces.query',
            'analytics.traces.search',
            'analytics.auth.dashboards',
            'analytics.products.configuration',
            'analytics.data-streaming.view',
            'analytics.data-streaming.create',
            'analytics.data-streaming.delete',
            'analytics.data-streaming.update',
          ]);
        } else {
          setPolicies([
            // 'analytics.logs.search',
            'analytics.logs.view',
            'analytics.general-traces.query',
            'analytics.traces.search',
            'analytics.auth.dashboards',
            'analytics.products.configuration',
            'analytics.data-streaming.view',
            'analytics.data-streaming.delete',
            'analytics.data-streaming.update',
          ]);
        }
      } else {
        Axios.get(getUrlPolicies()).then((response) => {
          setPolicies(response.data);
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleDelete = async (item: any) => {
    try {
      const response = await Axios.delete(`/analytics/v1/data-streaming/${item._id}`);
      return response.status;
    } catch (error) {
      return 404;
    }
  };

  const getPermission = async () => {
    if (!getCookie('id_token')) {
      try {
        const response = await Axios.get(`api-manager/api/v3/whoami`);
        return response.data.hasAllPermissions;
      } catch (error) {
        return false;
      }
    }
  };

  return (
    <StreamingContext.Provider
      value={{
        filter,
        setFilter,
        handleSearchCard,
        card,
        setCard,
        checkTotalStreaming,
        total,
        maxCreate,
        handleUpdate,
        handleSearchClean,
        policies,
        setPolicies,
        handleSearchPolicy,
        isLoading,
        setIsLoading,
        handleDelete,
        getPermission,
      }}
    >
      {children}
    </StreamingContext.Provider>
  );
};

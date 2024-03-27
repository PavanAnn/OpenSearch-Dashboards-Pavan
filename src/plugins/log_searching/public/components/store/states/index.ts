import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FormProps, Pagination } from '../../../types';
import { clearQueryParams } from '../../../utils';

const initialState = {
  formFilter: {} as FormProps,
  formResult: [] as any,
  error: false,
  pagination: {
    size: 10,
    page: 1,
    order: 'asc',
    sort: '',
  } as Pagination,
  totalLogs: 0,
  status: 'idle',
  searchClicked: false,
  initializedFromURL: false,
}; 

export const getLogs = createAsyncThunk('@LOGS/GET', async (payload: any, { rejectWithValue }) => {
  let logAttributesQueryString = '';
  let logResourceQueryString = '';
  let logBodyQueryString = '';

  const logAttributes = payload.formFilter.log_attributes;
  const resourceAttributes = payload.formFilter.resource_attributes;
  const logBody = payload.formFilter.body;

  // Verifique se há filtros na URL
  const urlSearchParams = new URLSearchParams(window.location.search);
  const logAttributesParam = urlSearchParams.get('log_attributes');
  const resourceAttributesParam = urlSearchParams.get('resource_attributes');
  const logBodyParam = urlSearchParams.get('body');

  // Use os filtros da URL se eles estiverem definidos
  if (logAttributesParam) {
    logAttributesQueryString = `log_attributes=${logAttributesParam}`;
  }

  if (resourceAttributesParam) {
    logResourceQueryString = `resource_attributes=${resourceAttributesParam}`;
  }

  if (logBodyParam) {
    logBodyQueryString = `body=${logBodyQueryString}`;
  }

  // Priorize os filtros da URL se eles estiverem definidos, senão, use os do componente
  if (!logAttributesQueryString && logAttributes) {
    logAttributesQueryString = `log_attributes=${logAttributes
      .map((obj: { key: any; value: any }) => `${obj.key},${obj.value}`)
      .join(',')}`;
  }

  if (!logResourceQueryString && resourceAttributes) {
    logResourceQueryString = `resource_attributes=${resourceAttributes
      .map((obj: { key: any; value: any }) => `${obj.key},${obj.value}`)
      .join(',')}`;
  }

  if (!logBodyQueryString && logBody) {
    logBodyQueryString = `body=${logBody}`;

  }

  const param = Object.fromEntries(
    Object.entries({ ...payload.formFilter, ...payload.pagination }).filter(([_, v]) => v !== '')
  );

  delete param.log_attributes;
  delete param.resource_attributes;
  delete param.body;

  let productName = urlSearchParams.get('product_name');

  if (!productName) {
    productName = payload.formFilter.product_name;
  }

  try {
    let apiUrl = `/analytics/v1/products/${productName}/logs`;

    const queryParams = [];

    if (logAttributesQueryString) {
      queryParams.push(logAttributesQueryString);
    }

    if (logResourceQueryString) {
      queryParams.push(logResourceQueryString);
    }

    if (logBodyQueryString) {
      queryParams.push(logBodyQueryString);
    }

    if (queryParams.length > 0) {
      apiUrl += `?${queryParams.join('&')}`;
    }

    const response = {
      data: 'awa',
      headers: 'awa',
    };

    return { data: response.data, headers: response.headers };
  } catch (error) {
    return rejectWithValue(error);
  }
});

const slice = createSlice({
  name: '@LOGS',
  initialState,
  reducers: {
    setInitializedFromURL: (state, action) => {
      state.initializedFromURL = action.payload;
    },
    setFilter: (state: any, action) => {
      state.formFilter = { ...state.formFilter, [action.payload.name]: action.payload.value };
    },
    setResult: (state: any, action) => {
      state.formResult = action.payload;
    },
    setPagination: (state: any, action) => {
      state.pagination = { ...state.pagination, page: action.payload.page };
    },
    resetPagination: (state: any) => {
      state.pagination = {
        size: 10,
        page: 1,
        order: 'asc',
        sort: '',
      };
    },
    clearFilter: (state) => {
      state.formFilter = {
        ...state.formFilter,
        log_attributes: [] && null,
        resource_attributes: [] && null,
        trace_id: '',
        span_id: '',
        body: '',
        service_name: '',
      };
      clearQueryParams();
    },
    handleRemove: (state, action) => {
      state.formFilter.log_attributes = state.formFilter.log_attributes?.filter(
        (item: any, index: number) => index !== action.payload
      );

      state.formFilter.resource_attributes = state.formFilter.resource_attributes?.filter(
        (item: any, index: number) => index !== action.payload
      );
    },

    handleAdd: (state, action) => {
      if (action.payload.key && action.payload.value) {
        if (!state.formFilter.log_attributes) {
          state.formFilter.log_attributes = [];
        }

        state.formFilter.log_attributes.push({
          key: action.payload.key,
          value: action.payload.value,
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLogs.pending.type, (state) => ({
        ...state,
        status: 'pending',
      }))
      .addCase(getLogs.fulfilled.type, (state, { payload }: PayloadAction<any>) => ({
        ...state,
        formResult: payload.data,
        status: 'success',
        totalLogs: payload.headers?.total_records,
      }))
      .addCase(getLogs.rejected.type, (state, { payload }: any) => ({
        ...state,
        error: payload,
        status: 'error',
      }));
  },
});

export const setSearchClicked = (value: any) => {
  return {
    type: 'SET_SEARCH_CLICKED',
    payload: value,
  };
};

export const searchClickedReducer = (state = initialState, action: { type: any; payload: any }) => {
  switch (action.type) {
    case 'SET_SEARCH_CLICKED':
      return {
        ...state,
        searchClicked: action.payload,
      };
    default:
      return state;
  }
};

export const {
  setFilter,
  clearFilter,
  handleAdd,
  handleRemove,
  setResult,
  setPagination,
  resetPagination,
  setInitializedFromURL,
} = slice.actions;

// eslint-disable-next-line import/no-default-export
export default slice.reducer;

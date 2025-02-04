import { createAsyncThunk } from '@reduxjs/toolkit';
import { CustomerState } from '../Types/CustomersType';
import { CustomersFetch } from '../Actions/CustomersAction';
import { getApiClient } from '../../Utilities/commonFunctions';
import { EndPoints as API_ENDPOINTS } from '../../Utilities/EndPoints';

interface GetCustomersListPayload {
  pageNumber: number;
}

export const getCustomersList = createAsyncThunk<
  CustomerState,
  GetCustomersListPayload,
  { rejectValue: string }
>(CustomersFetch, async (payload, thunkAPI) => {
  const { rejectWithValue, getState } = thunkAPI;
  const { pageNumber } = payload;
  const state = getState();
  const api = getApiClient(state);

  try {
    const response = await api.get(
      `${API_ENDPOINTS.customerDetails}?page=${pageNumber}`
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || 'Failed to fetch customers list'
    );
  }
});

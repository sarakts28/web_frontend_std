import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCustomersList } from '../Thunk/CustomersThunk';
import { CustomerState } from '../Types/CustomersType';

interface CustomerListState {
  isLoading: boolean;
  data: CustomerState;
  error: string | null;
}

const initialState: CustomerListState = {
  isLoading: false,
  data: {
    data: [],
    pageSize: 0,
    totalCount: 0,
    totalPages: 0,
  },
  error: null,
};

const googleAuthSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomersList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getCustomersList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(
        getCustomersList.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default googleAuthSlice.reducer;

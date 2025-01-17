import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginApplication } from '../Thunk/AuthThunk';
import { AuthLoginState } from '../Types/AuthTypes';

const initialLoginState: AuthLoginState = {
  data: null,
  message: '',
  isError: false,
  isLoading: false,
};

const initialState: { login: AuthLoginState } = {
  login: initialLoginState,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: (state) => {
      state.login = { ...initialLoginState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginApplication.pending, (state) => {
        state.login.isLoading = true;
      })
      .addCase(
        loginApplication.fulfilled,
        (state, action: PayloadAction<AuthLoginState['data']>) => {
          state.login.isLoading = false;
          state.login.data = action.payload;
          state.login.isError = false;
          state.login.message = '';
        }
      )
      .addCase(
        loginApplication.rejected,
        (state, action: PayloadAction<AuthLoginState['message']>) => {
          // Adjusted type
          state.login.isError = true;
          state.login.isLoading = false;
          state.login.data = null;
          state.login.message = action.payload?.message || 'An error occurred';
        }
      );
  },
});

export const { resetState } = authSlice.actions;
export default authSlice.reducer;

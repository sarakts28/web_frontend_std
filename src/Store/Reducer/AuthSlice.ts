import { createSlice } from '@reduxjs/toolkit';
import { loginApplication, logout } from '../Thunk/AuthThunk';
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
        state.login.isError = false;
        state.login.message = '';
      })
      .addCase(loginApplication.fulfilled, (state, action) => {
        state.login.isLoading = false;
        state.login.data = action.payload;
        state.login.message = 'Login successful';
      })
      .addCase(loginApplication.rejected, (state, action) => {
        state.login.isLoading = false;
        state.login.isError = true;
        state.login.message = action.payload || 'Login failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.login = { ...initialLoginState };
      })
      .addCase(logout.rejected, (state, action) => {
        state.login.isLoading = false;
        state.login.isError = true;
        state.login.message = action.payload || 'Logout failed';
      });
  },
});

export const { resetState } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { loginApplication } from '../Thunk/AuthThunk';
import { AuthLoginState } from '../Types/AuthTypes';

const initialLoginState: AuthLoginState = {
  data: null,
  message: '',
  isError: false,
  isLoading: false,
};

const initialState = {
  login: initialLoginState,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logged: (state) => {
      Object.assign(state, initialState);
    },
    logoutApplication: (state) => {
      state.login = initialLoginState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginApplication.pending, (state) => {
        state.login.isLoading = true;
      })
      .addCase(loginApplication.fulfilled, (state, { payload }) => {
        state.login.isLoading = false;
        state.login.data = payload;
        state.login.isError = false;
        state.login.message = '';
      })
      .addCase(loginApplication.rejected, (state, { payload }) => {
        state.login.isError = true;
        state.login.isLoading = false;
        state.login.message = payload;
      });
  },
});

export const { logged, logoutApplication } = authSlice.actions;
export default authSlice.reducer;

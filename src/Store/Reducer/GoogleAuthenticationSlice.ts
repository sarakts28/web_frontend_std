import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getGoogleAuthentication } from '../Thunk/GoogleAuthenticationThunk';

interface GoogleAuthState {
  isLoading: boolean;
  data: any | null;
  error: string | null;
}

const initialState: GoogleAuthState = {
  isLoading: false,
  data: null,
  error: null,
};

const googleAuthSlice = createSlice({
  name: 'googleAuth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGoogleAuthentication.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getGoogleAuthentication.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(getGoogleAuthentication.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Failed to fetch details';
      });
  },
});

export default googleAuthSlice.reducer;

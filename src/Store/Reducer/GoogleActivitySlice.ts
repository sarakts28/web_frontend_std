import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getGmailAccess,
  getGoogleAuthentication,
} from '../Thunk/GoogleActivityThunk';

interface GoogleAuthState {
  isLoading: boolean;
  data: {
    messages: any[];
    resultSizeEstimate: number;
    nextPageToken: string;
  };
  error: string | null;
  tokenPageArray: TokenPageArray[];
}

interface TokenPageArray {
  pageToken: string;
}

const initialState: GoogleAuthState = {
  isLoading: false,
  data: {
    messages: [],
    resultSizeEstimate: 0,
    nextPageToken: '',
  },
  error: null,
  tokenPageArray: [],
};

const googleAuthSlice = createSlice({
  name: 'googleActivity',
  initialState,
  reducers: {
    addTokenPage: (state, action: PayloadAction<TokenPageArray>) => {
      state.tokenPageArray.push(action.payload);
    },
  },
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
      .addCase(
        getGoogleAuthentication.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(getGmailAccess.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getGmailAccess.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(getGmailAccess.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addTokenPage } = googleAuthSlice.actions;
export default googleAuthSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import firebase from 'firebase/compat/app';

interface AuthState {
  phoneNumber: string;
  otp: string;
  user: firebase.User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  phoneNumber: "",
  otp: "",
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPhoneNumber(state, action: PayloadAction<string>) {
      state.phoneNumber = action.payload;
    },
    setOtp(state, action: PayloadAction<string>) {
      state.otp = action.payload;
    },
    setUser(state, action: PayloadAction<firebase.User | null>) {
      state.user = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setPhoneNumber, setOtp, setUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;

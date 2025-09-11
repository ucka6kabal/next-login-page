"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string;
  name?: string;
  loggedIn: boolean;
  error?: string;
}

const initialState: AuthState = {
  email: "",
  name: undefined,
  loggedIn: false,
  error: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ email: string; name?: string }>
    ) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.loggedIn = true;
      state.error = undefined;
    },
    logout(state) {
      state.email = "";
      state.name = undefined;
      state.loggedIn = false;
      state.error = undefined;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = undefined;
    },
  },
});

export const { setCredentials, logout, setError, clearError } =
  authSlice.actions;
export default authSlice.reducer;

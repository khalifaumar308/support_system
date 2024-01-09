import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "../../store";

interface user  {
  email: string | null;
  token: string | null;
  role: string | null;
  name: string | null;
}
const savedData = localStorage.getItem('userData')
const initialState: user = savedData ? JSON.parse(savedData) : { email: null, token: null, role: null, name: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action:PayloadAction<user>) => {
      const { email, token, role, name } = action.payload;
      state.email = email;
      state.role = role;
      state.token = token;
      state.name = name
    },
    logOut: (state) => {
      state.email = null;
      state.role = null;
      state.token = null;
      state.name = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentUser = (state:RootState) => state.auth.email;
export const selectCurrentToken = (state:RootState) => state.auth.token;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "../../store";

type user = {
  email: string | null;
  token: string | null;
  role: string | null;
  name: string | null;
  id: string | null;
}
const savedData = localStorage.getItem('userData')
const initialState: user = savedData ? JSON.parse(savedData) : { email: null, token: null, role: null, name: null, id: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action:PayloadAction<user>) => {
      const { email, token, role, name, id } = action.payload;
      state.email = email;
      state.role = role;
      state.token = token;
      state.name = name;
      state.id = id
    },
    logOut: (state) => {
      state.email = null;
      state.role = null;
      state.token = null;
      state.name = null;
      state.id = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => { return state.auth };
export const selectCurrentToken = (state:RootState) => state.auth.token;

export default authSlice.reducer;

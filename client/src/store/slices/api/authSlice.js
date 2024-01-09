import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: JSON.parse(localStorage.getItem("userData")) || {
    email: null,
    role: null,
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { email, token, role } = action.payload;
      state.email = email;
      state.role = role;
      state.token = token;
    },
    logOut: (state, action) => {
      state.email = null;
      state.role = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.email;
export const selectCurrentToken = (state) => state.auth.token;

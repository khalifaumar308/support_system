import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { afiliate } from "../types";

type users = {appUsers:afiliate[]}

const initialState: users = {appUsers:[]}
 
export const appUsersSlice = createSlice({
  name: "appUsers",
  initialState,
  reducers: {
    setAppUsers: (state, action: PayloadAction<afiliate[]>) => {
      state.appUsers = action.payload;
    }
  }
})

export const { setAppUsers } = appUsersSlice.actions;
export default appUsersSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { school } from "../types";

type schools = {schools:school[]}

const initialState: schools = { schools: [] };

export const appSchoolsSlice = createSlice({
  name: "appSchools",
  initialState,
  reducers: {
    setAppSchools: (state, action: PayloadAction<school[]>) => {
      state.schools = action.payload;
    }
  }
}); 

export const { setAppSchools } = appSchoolsSlice.actions;
export default appSchoolsSlice.reducer;
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./slices/api/apiSlice";
import appStateSlice from "./slices/app/appStateSlice";
import authReducer from "./slices/api/authSlice";
import appUsersSlice from "./slices/app/appUsersSlice";
import appSchoolsSlice from "./slices/app/appSchoolsSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    appState: appStateSlice,
    appUsers: appUsersSlice,
    appSchools: appSchoolsSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
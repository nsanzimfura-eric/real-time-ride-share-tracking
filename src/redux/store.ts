import { configureStore } from "@reduxjs/toolkit";
import googleDirectionServicesReducers from "../components/formMapData/GoogleMapDataSlice";

export const store = configureStore({
  reducer: {
    googleDirectionServicesReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

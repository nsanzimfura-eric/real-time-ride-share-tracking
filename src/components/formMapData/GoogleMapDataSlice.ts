// src/features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActiveSideNavBarLink {
  googleDirectionServiceResults: google.maps.DirectionsResult | null;
}

const initialState: ActiveSideNavBarLink = {
  googleDirectionServiceResults: null,
};

export const counterSlice = createSlice({
  name: "googleMapsDirectionServices",
  initialState,
  reducers: {
    setGoogleDirectionServices: (
      state,
      action: PayloadAction<google.maps.DirectionsResult | null>
    ) => {
      state.googleDirectionServiceResults = action.payload;
    },
  },
});

export const { setGoogleDirectionServices } = counterSlice.actions;

const googleDirectionServicesReducers = counterSlice.reducer;
export default googleDirectionServicesReducers;

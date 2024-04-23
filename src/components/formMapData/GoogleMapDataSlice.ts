import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActiveSideNavBarLink {
  googleDirectionServiceResults: google.maps.DirectionsResult | null;
  driverSpeed: number;
  isDriving: boolean;
}

const initialState: ActiveSideNavBarLink = {
  googleDirectionServiceResults: null,
  driverSpeed: 0,
  isDriving: false,
};

export const counterSlice = createSlice({
  name: "googleMapsDirectionServices",
  initialState,
  reducers: {
    setGoogleDirectionServices: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.googleDirectionServiceResults = action.payload
        ? JSON.parse(action.payload)
        : action.payload;
    },
    setDriverSpeed: (
      state,
      action: PayloadAction<number>
    ) => {
      state.driverSpeed = action.payload
    },
    setIsDriving: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isDriving = action.payload
    },
  },
});

export const { setGoogleDirectionServices ,setDriverSpeed, setIsDriving} = counterSlice.actions;

const googleDirectionServicesReducers = counterSlice.reducer;
export default googleDirectionServicesReducers;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  kigaliKimironkoBusStops,
  StopInterface,
} from "../../utils/routeStopsData";

interface ActiveSideNavBarLink {
  googleDirectionServiceResults: google.maps.DirectionsResult | null;
  driverSpeed: number;
  totalDuration: number;
  totalDistance: number;
  durationLeft: number;
  distanceLeft: number;
  isDriving: boolean;
  currentStop: StopInterface;
}

const initialState: ActiveSideNavBarLink = {
  googleDirectionServiceResults: null,
  driverSpeed: 0,
  totalDuration: 0,
  totalDistance: 0,
  isDriving: false,
  durationLeft: 0,
  distanceLeft: 0,
  currentStop: kigaliKimironkoBusStops[0],
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
    setDriverSpeed: (state, action: PayloadAction<number>) => {
      state.driverSpeed = action.payload;
    },
    setIsDriving: (state, action: PayloadAction<boolean>) => {
      state.isDriving = action.payload;
    },
    setTotalDuration: (state, action: PayloadAction<number>) => {
      state.totalDuration = action.payload;
    },
    setTotalDistance: (state, action: PayloadAction<number>) => {
      state.totalDistance = action.payload;
    },
    setDurationLeft: (state, action: PayloadAction<number>) => {
      state.durationLeft = action.payload;
    },
    setDistanceLeft: (state, action: PayloadAction<number>) => {
      state.distanceLeft = action.payload;
    },
    setCurrentStop: (state, action: PayloadAction<StopInterface>) => {
      state.currentStop = action.payload;
    },
  },
});

export const {
  setGoogleDirectionServices,
  setDriverSpeed,
  setIsDriving,
  setTotalDuration,
  setTotalDistance,
  setCurrentStop,
  setDistanceLeft,
  setDurationLeft,
} = counterSlice.actions;

const googleDirectionServicesReducers = counterSlice.reducer;
export default googleDirectionServicesReducers;

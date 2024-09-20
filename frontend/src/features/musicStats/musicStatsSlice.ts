import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MusicStats {
  stats: any;
  loading: boolean;
}

interface MusicStatsState {
  stats: any;
  loading: boolean;
}

const initialState: MusicStatsState = {
  stats: null,
  loading: false,
};

const musicStatsSlice = createSlice({
  name: "musicStats",
  initialState,
  reducers: {
    fetchMusicStats: (state) => {
      console.log("Fetching music stats");

      state.loading = true;
    },
    fetchMusicStatsSuccess: (state, action: PayloadAction<any>) => {
      console.log("success", action.payload);

      state.stats = action.payload;
      state.loading = false;
    },
    fetchMusicStatsFailure: (state) => {
      console.log("failure");

      state.loading = false;
    },
  },
});

export const {
  fetchMusicStats,
  fetchMusicStatsSuccess,
  fetchMusicStatsFailure,
} = musicStatsSlice.actions;

export default musicStatsSlice.reducer;

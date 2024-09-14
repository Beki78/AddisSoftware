import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MusicState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  musicList: any[];
  loading: boolean;
}

const initialState: MusicState = {
  musicList: [],
  loading: false,
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    fetchMusicRequest: (state) => {
      state.loading = true;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchMusicSuccess: (state, action: PayloadAction<any[]>) => {
      state.musicList = action.payload;
      state.loading = false;
    },
    fetchMusicFailure: (state) => {
      state.loading = false;
    },
  },
});

export const { fetchMusicRequest, fetchMusicSuccess, fetchMusicFailure } =
  musicSlice.actions;
export default musicSlice.reducer;

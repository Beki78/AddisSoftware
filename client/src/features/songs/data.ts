// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   songs: [],
//   loading: false,
//   error: null,
// };

// const songSlice = createSlice({
//   name: "songs",
//   initialState,
//   reducers: {
//     fetchSongsRequest: (state) => {
//       state.loading = true;
//     },
//     fetchSongsSuccess: (state, action) => {
//       state.loading = false;
//       state.songs = action.payload;
//     },
//     fetchSongsFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     // Other reducers for adding, updating, and deleting songs
//   },
// });

// export const { fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure } =
//   songSlice.actions;

// export default songSlice.reducer;

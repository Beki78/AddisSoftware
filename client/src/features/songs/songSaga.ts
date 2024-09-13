// import { call, put, takeEvery } from "redux-saga/effects";
// import axios from "axios";
// // import { fetchSongsSuccess, fetchSongsFailure } from "./data";
// // import { Song, ApiResponse } from "../../../types"; // Import the types

// // Worker Saga: Fetch songs from the API
// function* fetchSongsSaga() {
//   try {
//     const response: ApiResponse<Song[]> = yield call(
//       axios.get,
//       "http://localhost:3001/" // Replace with the correct API endpoint
//     );

//     // In case response has extra data you don't want, map to the relevant fields:
//     const songData = response.data.map((song) => ({
//       id: song.id,
//       title: song.title,
//       artist: song.artist,
//     }));

//     yield put(fetchSongsSuccess(songData)); // Only pass title and artist data
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       yield put(fetchSongsFailure(error.message));
//     } else {
//       yield put(fetchSongsFailure("An unknown error occurred"));
//     }
//   }
// }

// // Watcher Saga: Listens for actions
// function* watchFetchSongs(): Generator {
//   yield takeEvery("songs/fetchSongsRequest", fetchSongsSaga);
// }

// export default watchFetchSongs;

/* eslint-disable @typescript-eslint/no-unused-vars */
import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchMusicRequest,
  fetchMusicSuccess,
  fetchMusicFailure,
} from "./songSlice";
import { fetchMusic } from "../../api/musicApi"; // API function to fetch music

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* fetchMusicSaga(): Generator<any, void, any> {
  try {
    const music = yield call(fetchMusic);
    yield put(fetchMusicSuccess(music));
  } catch (error) {
    yield put(fetchMusicFailure());
  }
}

export default function* musicSaga() {
  yield takeEvery(fetchMusicRequest.type, fetchMusicSaga);
}

import { all } from "redux-saga/effects";
import  musicSaga  from "../features/songs/songSaga";

export default function* rootSaga() {
  yield all([
    musicSaga(), // Add other sagas here
  ]);
}

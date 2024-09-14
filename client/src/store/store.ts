// store.ts
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import musicReducer from "../features/songs/songSlice"; // Your slice for managing music
import rootSaga from "./../sagas/rootSaga"; // Your root saga

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Set up your Redux store
const store = configureStore({
  reducer: {
    music: musicReducer, // Add your reducers (slices)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the saga
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export default store;

// store.ts
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import musicReducer from "../features/songs/songSlice"; 
import rootSaga from "./../sagas/rootSaga"; 

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    music: musicReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export default store;

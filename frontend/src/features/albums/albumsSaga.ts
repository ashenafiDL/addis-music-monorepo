import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addAlbumApi,
  deleteAlbumApi,
  getAlbums,
  updateAlbumApi,
} from "../../api/albumApi";
import {
  addAlbum,
  addAlbumFailure,
  addAlbumSuccess,
  deleteAlbum,
  deleteAlbumFailure,
  deleteAlbumSuccess,
  fetchAlbums,
  fetchAlbumsFailure,
  fetchAlbumsSuccess,
  updateAlbum,
  updateAlbumFailure,
  updateAlbumSuccess,
} from "./albumsSlice";

function* fetchAlbumSaga(): Generator<any, void, any> {
  try {
    const songs = yield call(getAlbums);
    yield put(fetchAlbumsSuccess(songs));
  } catch (error) {
    yield put(fetchAlbumsFailure());
  }
}

function* deleteAlbumSaga(
  action: PayloadAction<string>
): Generator<any, void, any> {
  try {
    yield call(deleteAlbumApi, action.payload);
    yield put(deleteAlbumSuccess(action.payload));
  } catch (error) {
    yield put(deleteAlbumFailure());
  }
}

function* addAlbumSaga(action: PayloadAction<any>): Generator<any, void, any> {
  try {
    const newAlbum = yield call(addAlbumApi, action.payload);
    yield put(addAlbumSuccess(newAlbum));
  } catch (error) {
    yield put(addAlbumFailure());
  }
}

function* updateAlbumSaga(
  action: PayloadAction<any>
): Generator<any, void, any> {
  try {
    yield call(updateAlbumApi, action.payload);
    yield put(updateAlbumSuccess(action.payload));
  } catch (error) {
    yield put(updateAlbumFailure());
  }
}

export function* albumSaga() {
  yield takeLatest(fetchAlbums.type, fetchAlbumSaga);
  yield takeLatest(deleteAlbum.type, deleteAlbumSaga);
  yield takeLatest(addAlbum.type, addAlbumSaga);
  yield takeLatest(updateAlbum.type, updateAlbumSaga);
}

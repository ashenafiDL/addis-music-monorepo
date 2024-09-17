import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { deleteAlbumApi, getAlbums } from "../../api/albumApi";
import {
  deleteAlbum,
  deleteAlbumFailure,
  deleteAlbumSuccess,
  fetchAlbums,
  fetchAlbumsFailure,
  fetchAlbumsSuccess,
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
    yield put(fetchAlbums());
  } catch (error) {
    yield put(deleteAlbumFailure());
  }
}

export function* albumSaga() {
  yield takeLatest(fetchAlbums.type, fetchAlbumSaga);
  yield takeLatest(deleteAlbum.type, deleteAlbumSaga);
}

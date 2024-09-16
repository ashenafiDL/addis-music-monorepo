import { call, put, takeLatest } from "redux-saga/effects";
import { getAlbums } from "../../api/albumApi";
import {
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

export function* albumSaga() {
  yield takeLatest(fetchAlbums.type, fetchAlbumSaga);
}

import { call, put, takeLatest } from "redux-saga/effects";
import { getMusicStats } from "../../api/musicStatsApi";
import {
  fetchMusicStats,
  fetchMusicStatsFailure,
  fetchMusicStatsSuccess,
} from "./musicStatsSlice";

function* fetchMusicStatsSaga(): Generator<any, void, any> {
  try {
    const data = yield call(getMusicStats);
    yield put(fetchMusicStatsSuccess(data));
  } catch (error: any) {
    yield put(fetchMusicStatsFailure());
  }
}

export function* musicStatsSaga() {
  yield takeLatest(fetchMusicStats.type, fetchMusicStatsSaga);
}

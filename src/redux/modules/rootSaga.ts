import { all } from "redux-saga/effects";
import { authSaga } from "./auth";

export default function* rootSaga() {
  //        Auth.ts 파일에 정의해둠
  yield all([authSaga()]);
}

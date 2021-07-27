// 여러개의 리두서 모듈을 하나로 합칠수 있는 루트 리듀서를 만들어야 하기 때문에 만든 파일

import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import auth from "./auth";
import { History } from "history";

// 루트 리듀서 만드는 로직
const reducer = (history: History<unknown>) =>
  combineReducers({
    auth,
    router: connectRouter(history),
  });

export default reducer;

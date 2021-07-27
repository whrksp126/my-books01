// 스토어를 만드는 역할을 하는 파일

import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./modules/reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./modules/rootSaga";
import { routerMiddleware } from "connected-react-router";
import history from "../history";
import TokenService from "../services/TokenService";

// 스토어를 만드는 로직
const create = () => {
  const token = TokenService.get();

  // 스토어 생성 전에
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    //루트 리듀서
    reducer(history),
    {
      auth: {
        token,
        loading: false,
        error: null,
      },
    },
    composeWithDevTools(
      // history 는 우리가 생성한 browserhistory 여야함
      applyMiddleware(sagaMiddleware, routerMiddleware(history))
    )
  );
  // 스토어를 리턴하기 전
  //                rootSaga.ts파일에 정의해 둠
  sagaMiddleware.run(rootSaga);

  return store;
};
export default create;

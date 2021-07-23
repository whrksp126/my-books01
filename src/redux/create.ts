// 스토어를 만드는 역할을 하는 파일

import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./modules/reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./modules/rootSaga";

// 스토어를 만드는 로직
const create = () => {
  // 스토어 생성 전에
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    //루트 리듀서
    reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  // 스토어를 리턴하기 전
  //                rootSaga.ts파일에 정의해 둠
  sagaMiddleware.run(rootSaga);

  return store;
};
export default create;

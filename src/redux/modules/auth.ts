// 인증을 관리함

// auth를 작성하는 로직

import { call, put, select, takeEvery } from "@redux-saga/core/effects";
import { push } from "connected-react-router";
import { AnyAction } from "redux";
import { createActions, handleActions } from "redux-actions";
import TokenService from "../../services/TokenService";
import UserService from "../../services/UserService";
import { LoginReqType } from "../../types";

import { getTokenFromState } from "../utils";
import { success as booksSuccess } from "./books";

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: Error | null;
}

const initialState: AuthState = {
  // 초기값 지정
  token: null,
  loading: false,
  error: null,
};

// 이 모듈에서 prefix를 설정해 둬야함
const options = {
  prefix: 'my-books/auth',
};
// createAtcions를 이용해서 action생성 함수를 만듬
//                ↓↓       ↓↓     ↓↓   createActions로 만들어 진 함수들
export const { pending, success, fail } = createActions(
  // 액션의 타입을 지정
  {
    SUCCESS: (token: string) => ({ token }),
  },
  'PENDING',
  'FAIL',
  // 앞의 각 타입 앞에  my-books/auth 가 자동을 붙음
  options,
);

// reducer만들기
//           제네릭으로 AuthState ↓↓    ,   ↓↓ payload의 타입
const reducer = handleActions<AuthState, any>(
  // reducer의 첫번째 인자
  {
    // 객체가 들어가는데 action에 type을 바탕으로 reducer 로직이 만들어짐

    PENDING: (state) => ({
      // 기존의 state를 받아서 loading과 error의 값을 변경함
      ...state,
      loading: true,
      error: null,
    }),
    // 성공한 경우에 token을 받아서 token을 넣어야함
    SUCCESS: (state, action) => ({
      // action의 payload로 token이 들어옴
      ...state,
      token: action.payload.token,
      loading: false,
      error: null,
    }),
    // 실패한 경우
    FAIL: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  options,
);

export default reducer;

// saga
export const { login, logout } = createActions(
  {
    LOGIN: ({ email, password }: LoginReqType) => ({
      email,
      password,
    }),
  },
  'LOGOUT',
  options,
);

export function* sagas() {
  yield takeEvery(`${options.prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${options.prefix}/LOGOUT`, logoutSaga);
}

interface LoginSagaAction extends AnyAction {
  payload: LoginReqType;
}


function* loginSaga(action: LoginSagaAction) {
  try {
    yield put(pending());
    const token: string = yield call(UserService.login, action.payload);
    TokenService.set(token);
    yield put(success(token));
    yield put(push('/'));
  } catch (error) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
  }
}

function* logoutSaga() {
  try {
    yield put(booksSuccess(null));
    yield put(pending());
    const token: string = yield select(getTokenFromState);
    yield call(UserService.logout, token);
  } catch (error) {
  } finally {
    TokenService.remove();
    yield put(success(null));
  }
}
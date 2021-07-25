// 인증을 관리함

// auth를 작성하는 로직

import { Action, AnyAction } from "redux";
import { createActions, handleActions } from "redux-actions";
import { call, put, takeEvery } from "redux-saga/effects";
import UserService from "../../services/UserService";
import { LoginReqType } from "../../types";

// Auth의 state를 구상해봐야함
interface AuthState {
  // AuthState의 type을 작성함
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
const prefix = "my-books/auth";

// createAtcions를 이용해서 action생성 함수를 만듬
//                ↓↓       ↓↓     ↓↓   createActions로 만들어 진 함수들
export const { pending, success, fail } = createActions(
  // 액션의 타입을 지정
  "PENDING",
  "SUCCESS",
  "FAIL",
  // 앞의 각 타입 앞에  my-books/auth 가 자동을 붙음
  { prefix }
);

// reducer만들기
//           제네릭으로 AuthState ↓↓    ,   ↓↓ payload의 타입
const reducer = handleActions<AuthState, string>(
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
      token: action.payload,
      loading: false,
      error: null,
    }),
    // 실패한 경우
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  // reducer의 두번째 인자
  initialState,
  // reducer의 세번째 인자
  { prefix }
);

export default reducer;

// saga

//               액션 생성 함수 만들기
export const { login, logout } = createActions("LOGIN", "LOGOUT", { prefix });

// login 이라고 하는 액션이 디스페치 되면 loginSaga가 실행 됨

// loginSaga 에서는 이메일과 패스워드를 사용해야
// 하기 때문에 action 을 받아서 그 안에 있는
// payload 에 이메일과 패스워드로 이루어진 객체인
// 로그인 리퀘스트 데이터를 사용해야 합니다.
//              그래서 ↓↓ action은 action 이라는
// type 이고, 그 안에 제네릭으로 payload 를
// 지정해주면 됨
function* loginSaga(action: LoginSagaAction) {
  // 비동기 로직
  try {
    yield put(pending());
    // token 은 login api 를 쳐서 그 안에 있는
    // 데이터를 꺼내서 token 으로 받아와야 함
    // 근데 인라인으로 직접 쓰게 되면 api 로직이
    // 같이 들어오게 되니까 api 로직을 불리해서
    // user 서비스 로직으로 별도로 만들어서 가져오도록 한다
    const token: string = yield call(UserService.login, action.payload);
    // 받아온 token 을 localstorage 에 넣어야 함
    // 동시에 redux 의 state 로도 세팅을 해주어야 함
    // localstorage
    yield put(success(token));
    // 그리고 로그인이 정상적으로 되면 그 다음에 signin page 에서
    // list page 로 이동시켜야 함
    // push 가 처리 되어야 함
  } catch (error) {
    // 만약에 문제가 있어 error 가 통과하면
    // 그냥 error 객체를 바로 넣지 말고 new error 를 생성하면서
    // error 에 respones 에 data 에 error 를 꺼내겠습니다
    // 만약에 없으면 문자열로 UNKNOWN_ERROR 라고 찍겠습니다.
    yield put(fail(new Error(error?.response?.data?.error || "UNKNOWN_ERROR")));
  }
}

// logout 이라고 하는 액션이 디스페치 되면 logputSaga가 실행 됨
function* logoutSaga() {}

export function* authSaga() {
  // auth에서 사이드 이펙이 일어나는 로직들을 작성함

  //                액션 타입 ↓↓       ↓↓  Saga 함수
  yield takeEvery(`${prefix}/LOGIN`, loginSaga);
  // logout type 이 dspath 되면 logoutSaga가 발동함
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga);
}

interface LoginSagaAction extends AnyAction {
  payload: LoginReqType;
}

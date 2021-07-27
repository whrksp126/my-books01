import { RouterState } from "connected-react-router";
import { AnyAction, Reducer } from "redux";

export type LoginReqType = {
  email: string;
  password: string;
};

// Auth의 state를 구상해봐야함
export interface AuthState {
  // AuthState의 type을 작성함
  token: string | null;
  loading: boolean;
  error: Error | null;
}

// rootstate 를 만든다

export interface RootState {
  auth: AuthState;
  router: Reducer<RouterState<unknown>, AnyAction>;
}

export interface LoginResType {
  token: string;
}

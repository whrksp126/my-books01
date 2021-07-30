// 이 container 를 signin page 에서 가져가서 쓰도록 하겠습니다.

import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Signin from "../components/Signin";
import { RootState } from "../redux/modules/rootReducer";
import { LoginReqType } from "../types";
import { login as loginSaga } from "../redux/modules/auth";

const SigninContainer: React.FC = () => {
  const loading = useSelector<RootState, boolean>(
    (state) => state.auth.loading
  );

  const error = useSelector<RootState, Error | null>(
    (state) => state.auth.error
  );

  const dispatch = useDispatch();

  const login = useCallback(
    ({ email, password }: LoginReqType) => {
      dispatch(loginSaga({ email, password }));
    },
    [dispatch]
  );

  // SigninComponent 에 있는 Signin 을 가져와서 쓰도록 하겠습니다.
  return <Signin loading={loading} error={error} login={login} />;
};

export default SigninContainer;

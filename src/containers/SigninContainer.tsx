// 이 container 를 signin page 에서 가져가서 쓰도록 하겠습니다.

import { useCallback } from "react";
import { useDispatch } from "react-redux";
import Signin from "../components/Signin";
import { login as loginSagaStart } from "../redux/modules/auth";

export default function SigninContainer() {
  const dispatch = useDispatch();
  const login = useCallback(
    (reqData) => {
      dispatch(loginSagaStart(reqData));
    },
    [dispatch]
  );
  // SigninComponent 에 있는 Signin 을 가져와서 쓰도록 하겠습니다.
  return <Signin login={login} />;
}

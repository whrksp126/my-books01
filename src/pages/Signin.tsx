import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SigninContainer from "../containers/SigninContainer";
import { RootState } from "../types";

// SigninContainer 를 page 에 가져가서 쓰도록 하겠습니다.
export default function Signin() {
  // signin page 에 진입했을 때 token 을 확인해서
  // token 이 없으면 signin page 에 계속 남아 있고
  // token 이 있으면 list page 로 옴기는 작업을 해야합니다.
  const token = useSelector<RootState, string | null>(
    (state) => state.auth.token
  );

  if (token !== null) {
    return <Redirect to="/" />;
  }

  return <SigninContainer />;
}

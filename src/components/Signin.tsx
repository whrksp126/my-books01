import { Button, Col, Input, message, Row } from "antd";
import React, { useEffect, useRef } from "react";
import styles from "./Signin.module.css";
import { LoginReqType } from "../types";

// lognin 함수를 props로 넣어주기 전에 lognin 함수 모습이 어떤지 정의해야함
interface SigninProps {
  loading: boolean;
  error: Error | null;
  login: ({ email, password }: LoginReqType) => void;
}

// SigninProps 를 SigninComponent 에 Props 로 설정 하려면
// Signin 을 먼저 타이핑으로 React.FC 라는 이름으로 지정을 하고
// 거기에 Generics 으로 위에서 타이핑한 SigninProps 지정 합니다
// Signin 에 함수를 만들어서 넣는 것임
// 이것을 export default 하면 됨
const Signin: React.FC<SigninProps> = ({ loading, login, error }) => {
  //   ref 의 대상이 되는 것 ↓↓ (Generics 으로 input 이라고 하는 antd 의 컴포넌트 타입을 넣음)
  const emailRef = React.useRef<Input>(null);
  // 인자로 아무것도 안넣으면  undefind 가 출력되어 type error 가 생김
  const passwordRef = React.useRef<Input>(null);

  useEffect(() => {
    if (error === null) return;

    switch (error.message) {
      case "USER_NOT_EXIST":
        message.error("User not exist");
        break;
      case "PASSWORD_NOT_MATCH":
        message.error("Wrong password");
        break;
      default:
        message.error("Unknown error occured");
    }
  }, [error]);

  return (
    <Row align="middle" className={styles.signin_row}>
      <Col span={24}>
        <Row className={styles.signin_contents}>
          <Col span={12}>
            <img
              src="/bg_signin.png"
              className={styles.signin_bg}
              alt="Signin"
            />
          </Col>
          <Col span={12}>
            <div className={styles.signin_title}>My Books</div>
            <div className={styles.signin_subtitle}>
              Email : mark@test.com
              <br/>
              Password : fastcampus
            </div>
            <div className={styles.signin_underline} />
            <div className={styles.email_title}>
              Email
              <span className={styles.required}> *</span>
            </div>
            <div className={styles.input_area}>
              <Input
                placeholder="Email"
                autoComplete="email"
                name="email"
                className={styles.input}
                ref={emailRef}
              />
            </div>

            <div className={styles.password_title}>
              Password
              <span className={styles.required}> *</span>
            </div>
            <div className={styles.input_area}>
              <Input
                placeholder="Password"
                type="password"
                autoComplete="current-password"
                className={styles.input}
                ref={passwordRef}
              />
            </div>
            <div className={styles.button_area}>
              <Button
                size="large"
                // loading={loading}
                className={styles.button}
                onClick={click}
              >
                Sign in
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );

  function click() {
    const email = emailRef.current!.state.value;
    const password = passwordRef.current!.state.value;

    login({ email, password });
  }
};

export default Signin;

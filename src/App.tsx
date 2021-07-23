import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Add from "./pages/Add";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Signin from "./pages/Signin";
import Error from "./pages/Error";

function App() {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <BrowserRouter>
        <Switch>
          {/* 수정 */}
          <Route exact path="/edit/:id" component={Edit} />

          {/* 상세 보기 */}
          <Route exact path="/book/:id" component={Detail} />

          {/* 책 추가 */}
          <Route exact path="/add" component={Add} />

          {/* 로그인 */}
          <Route exact path="/signin" component={Signin} />

          <Route exact path="/" component={Home} />

          {/* 페이지를 찾을 수 없습니다 */}
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;

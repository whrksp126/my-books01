import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Switch } from "react-router-dom";
import Add from "./pages/Add";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Signin from "./pages/Signin";
import Error from "./pages/Error";
import { ConnectedRouter } from "connected-react-router";
import history from "./history";

function App() {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <ConnectedRouter history={history}>
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
      </ConnectedRouter>
    </ErrorBoundary>
  );
}

export default App;

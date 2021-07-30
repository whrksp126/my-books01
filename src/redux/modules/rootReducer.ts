import { AnyAction, combineReducers, Reducer } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import books, { BooksState } from "./books";
import auth, { AuthState } from "./auth";

export interface RootState {
  books: BooksState;
  auth: AuthState;
  router: Reducer<RouterState<unknown>, AnyAction>;
}

const rootReducer = (history: History<unknown>) =>
  combineReducers({
    auth,
    books,
    router: connectRouter(history),
  });

export default rootReducer;

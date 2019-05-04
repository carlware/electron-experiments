import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import categoryReducer from "../reducers/category";
import movieReducer from "../reducers/movie";

const store = createStore(
  combineReducers({
    category: categoryReducer,
    movie: movieReducer
  }),
  {},
  applyMiddleware(thunk)
);

export default store;

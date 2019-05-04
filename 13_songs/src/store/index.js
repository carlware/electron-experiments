import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import videoReducer from "../reducers/video";
import settingsReducer from "../reducers/settings";

const store = createStore(
  combineReducers({
    video: videoReducer,
    settings: settingsReducer
  }),
  {},
  applyMiddleware(thunk)
);

export default store;

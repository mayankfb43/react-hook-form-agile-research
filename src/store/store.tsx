import { createStore, applyMiddleware } from "redux";
import { reducer } from "./todos";
import { thunk } from "redux-thunk";

export default createStore(reducer, applyMiddleware(thunk));

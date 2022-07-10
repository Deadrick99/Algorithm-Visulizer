import { configureStore } from "@reduxjs/toolkit";
import NodeReduxReducer from "./NodeRedux";

export const store = configureStore({
  reducer: {
    NodeRedux: NodeReduxReducer,
  },
});

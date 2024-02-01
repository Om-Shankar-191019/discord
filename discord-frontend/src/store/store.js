import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import friendReducer from "./reducers/friendSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    friend: friendReducer,
  },
});

export default store;

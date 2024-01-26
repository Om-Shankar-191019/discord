import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginReducer(state, action) {
      state.currentUser = action.payload;
    },
    logoutReducer(state) {
      state.currentUser = null;
    },
  },
});

export const { loginReducer, logoutReducer } = authSlice.actions;
export default authSlice.reducer;

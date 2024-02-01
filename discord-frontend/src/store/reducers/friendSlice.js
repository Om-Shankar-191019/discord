import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  friends: [],
  pendingFriendsInvitations: [],
  onlineUsers: [],
};
const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    pendingFriendsInvitationsReducer(state, action) {
      state.pendingFriendsInvitations = [
        ...state.pendingFriendsInvitations,
        action.payload,
      ];
    },
    friendsReducer(state, action) {
      state.friends = [...state.friends, action.payload];
    },
    onlineUsersReducer(state, action) {
      state.onlineUsers = [...state.onlineUsers, action.payload];
    },
  },
});

export const {
  pendingFriendsInvitationsReducer,
  friendsReducer,
  onlineUsersReducer,
} = friendSlice.actions;
export default friendSlice.reducer;

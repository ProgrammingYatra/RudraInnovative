import { configureStore } from "@reduxjs/toolkit";
import {
  allUsersReducer,
  userReducer,
  userProfileReducer
} from "./reducers/User";

const store = configureStore({
  reducer: {
    user: userReducer,
    allUsers: allUsersReducer,
    userProfile: userProfileReducer,
  },
});

export default store;
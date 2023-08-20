import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "../store/cardSlice";
import thunk from "redux-thunk";

import userSlice from "../store/userSlice";
const store = configureStore({
  reducer: {
    card: cardReducer,
    user: userSlice,
    
  },
  middleware:[thunk]
});

export default store;

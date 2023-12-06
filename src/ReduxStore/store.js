import { configureStore } from "@reduxjs/toolkit";
import { USER_REDUCER } from "../Util/constVar";
import userReducer from "./UserReducer/UserReducer";

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
	// Automatically calls `combineReducers`
	reducer: {
		[`${USER_REDUCER}`]: userReducer,
	},
});

export default store;

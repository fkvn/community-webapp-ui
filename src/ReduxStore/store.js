import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserReducer/UserReducer";

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
	// Automatically calls `combineReducers`
	reducer: {
		userReducer: userReducer,
	},
});

export default store;

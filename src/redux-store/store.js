import thainowReducer from "./reducer/thainowReducer";

import { configureStore } from "@reduxjs/toolkit";

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
	// Automatically calls `combineReducers`
	reducer: {
		thainowReducer: thainowReducer,
	},
});

export default store;

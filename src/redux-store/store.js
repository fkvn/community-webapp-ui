import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import thainowReducer from "./reducer/thainowReducer";

let composeEnhancers = "";

try {
	composeEnhancers =
		(process.env.NODE_ENV === "development"
			? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
					trace: true,
					traceLimit: 25,
			  })
			: null) || compose;
} catch (error) {
	// when browser doesn't support trace feature for redux
	// or browser hasn't installed redux extension yet
	composeEnhancers =
		(process.env.NODE_ENV === "development"
			? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			: null) || compose;
}

const rootReducer = combineReducers({
	thainowReducer: thainowReducer,
});

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

export default store;

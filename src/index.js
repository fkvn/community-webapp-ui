import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../src/Assest/Style/style.scss";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import thainowReducer from "./redux-store/reducer/thainowReducer";

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
	thainowBuilder: thainowReducer,
});

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

const rootElement = document.getElementById("root");

const app = (
	<Provider store={store}>
		<App />
	</Provider>
);

const root = ReactDOM.createRoot(rootElement);
root.render(app);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

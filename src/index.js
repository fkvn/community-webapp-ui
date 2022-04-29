import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../src/Assest/Styles/style.scss";

import { HashRouter } from "react-router-dom";
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
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>
);

ReactDOM.render(app, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

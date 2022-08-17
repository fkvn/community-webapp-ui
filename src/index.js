import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../src/Assest/Style/style.scss";

import { Provider } from "react-redux";
import store from "./redux-store/store";

import { Provider } from "react-redux";
import store from "./redux-store/store";

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

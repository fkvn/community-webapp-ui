import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "../src/Asset/Style/style.scss";
import App from "./App";
import "./Component/Locale/i18n";
import Store from "./ReduxStore/store";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");

const app = (
	<Provider store={Store}>
		{/* import the i18n.js file in index.js, and then use React’s Suspense component to prevent rendering until the request is complete. */}
		<Suspense fallback="loading">
			<App />
		</Suspense>
	</Provider>
);

const root = ReactDOM.createRoot(rootElement);
root.render(app);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

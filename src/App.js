import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouterBuilder from "../src/Container/RouteBuilder";

function App() {
	return (
		<BrowserRouter>
			<RouterBuilder />
		</BrowserRouter>
	);
}

export default App;

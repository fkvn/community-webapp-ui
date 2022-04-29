import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NotFoundPage from "../Component/Global/NotFoundPage";

function RouteBuilder() {
	const routes = (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<> Home Page</>}></Route>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);

	const app = <>{routes} </>;

	return app;
}

export default RouteBuilder;

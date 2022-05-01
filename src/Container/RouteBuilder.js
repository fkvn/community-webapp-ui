import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LandingPage from "../Component/LandingPage/LandingPage";
import NotFoundPage from "../Component/Global/NotFoundPage";
import Login from "../Component/Login/Login";

function RouteBuilder() {
	const routes = (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);

	const app = <>{routes} </>;

	return app;
}

export default RouteBuilder;

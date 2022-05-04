import React from "react";
import {
	Route,
	Routes,
	BrowserRouter,
	useLocation,
	useNavigate,
} from "react-router-dom";
import LandingPage from "../Component/LandingPage/LandingPage";
import NotFoundPage from "../Component/Global/NotFoundPage";
// import Login from "../Component/Login/Login";
import LoginContainer from "./LoginContainer";
import ErrorContainer from "./ErrorContainer";
import LandingPageContainer from "./LandingPageContainer";

function RouteBuilder() {
	const routes = (
		<Routes>
			<Route path="/" element={<LandingPageContainer />} />
			<Route
				path="/login"
				element={<LoginContainer prevRoute={useLocation().state?.prevRoute} />}
			/>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);

	const app = (
		<>
			<main>{routes}</main>
			<div>
				<ErrorContainer />
			</div>
		</>
	);

	return app;
}

export default RouteBuilder;

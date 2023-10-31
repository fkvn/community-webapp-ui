import { Route, Routes } from "react-router-dom";
import UserSigninContainer from "./AuthContainer/UserSigninContainer";
import LayoutContainer from "./LayoutContainer";

function RouteBuilder() {
	const routes = (
		<>
			<Routes>
				{/* <Route path="/register/*" element={<SignupRouteContainer />} /> */}
				<Route path="/signin" element={<UserSigninContainer />} />
				{/* <Route path="/switch-profiles" element={<SwitchProfileContainer />} /> */}
				{/* <Route path="/edit-profile/:id" element={<EditProfileContainer />} /> */}
				{/* <Route
					exact
					path={`/:action/${SEARCH_SERVICE}/:${SEARCH_TYPE_PROP}/:id`}
					element={<EditServiceContainer />}
				/> */}
				{/* <Route
					exact
					path={`/:action/${SEARCH_SERVICE}/:${SEARCH_TYPE_PROP}`}
					element={<EditServiceContainer />}
				/> */}
				{/* <Route exact path={`/forgot-password`} element={<ForgotPassword />} /> */}
				<Route path="/*" element={<LayoutContainer />} />
			</Routes>
		</>
	);

	const app = (
		<>
			<main id="main"> {routes}</main>

			<div>{/* <ErrorContainer /> */}</div>
		</>
	);

	return app;
}

export default RouteBuilder;

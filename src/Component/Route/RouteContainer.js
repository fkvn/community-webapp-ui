import { Route, Routes } from "react-router-dom";
import ForgotPasswordContainer from "../Auth/ForgotPassword/ForgotPasswordContainer";
import LayoutContainer from "../Layout/LayoutContainer";

function RouteBuilder() {
	const routes = (
		<>
			<Routes>
				{/* <Route path="/register/*" element={<SignupRouteContainer />} /> */}
				{/* <Route path="/signin" element={<UserSigninContainer />} /> */}
				<Route
					exact
					path={`/forgot-password`}
					element={<ForgotPasswordContainer />}
				/>
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

				<Route path="/*" element={<LayoutContainer />} />
			</Routes>
		</>
	);

	const app = (
		<>
			<main id="main"> {routes}</main>
		</>
	);

	return app;
}

export default RouteBuilder;

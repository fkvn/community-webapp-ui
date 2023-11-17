import { Route, Routes } from "react-router-dom";
import { SIGN_IN_PATH } from "../../Util/ConstVar";
import ForgotPasswordContainer from "../Auth/ForgotPassword/ForgotPasswordContainer";
import SigninContainer from "../Auth/Signin/SigninContainer";
import LayoutContainer from "../Layout/LayoutContainer";
import NotFound from "../NotFound/NotFound";

function RouteBuilder() {
	const routes = (
		<>
			<Routes>
				{/* <Route path="/register/*" element={<SignupRouteContainer />} /> */}
				<Route path={SIGN_IN_PATH} element={<SigninContainer />} />
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

				<Route path="/" exact element={<LayoutContainer />} />
				<Route path="*" element={<NotFound />} />
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

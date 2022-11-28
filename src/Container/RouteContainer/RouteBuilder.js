import { Route, Routes } from "react-router-dom";
import ForgotPassword from "../../Component/Auth/ForgotPassword";
import PageLayout from "../../Component/PageLayout/PageLayout";
import { SEARCH_SERVICE, SEARCH_TYPE_PROP } from "../../Util/ConstVar";
import SignupRouteContainer from "../AuthContainer/SignupRouteContainer";
import SwitchProfileContainer from "../AuthContainer/SwitchProfileContainer";
import UserSigninContainer from "../AuthContainer/UserSigninContainer";
import ErrorContainer from "../ErrorContainer";
import EditProfileContainer from "../ProfilePanelContainer/EditProfileContainer";
import EditServiceContainer from "../ServicePageContainer/EditServiceContainer";

function RouteBuilder() {
	const routes = (
		<>
			<Routes>
				<Route path="/register/*" element={<SignupRouteContainer />} />
				<Route path="/signin" element={<UserSigninContainer />} />
				{/* <Route path="/myprofile/:id" element={<ProfileContainer />} /> */}
				{/* <Route path="/search" element={<SearchContainer />} /> */}
				<Route path="/switch-profiles" element={<SwitchProfileContainer />} />
				<Route path="/edit-profile/:id" element={<EditProfileContainer />} />
				<Route
					exact
					path={`/:action/${SEARCH_SERVICE}/:${SEARCH_TYPE_PROP}/:id`}
					element={<EditServiceContainer />}
				/>
				<Route
					exact
					path={`/:action/${SEARCH_SERVICE}/:${SEARCH_TYPE_PROP}`}
					element={<EditServiceContainer />}
				/>
				<Route exact path={`/forgot-password`} element={<ForgotPassword />} />
				<Route path="/*" element={<PageLayout />} />
				{/* <Route path="*" element={<NotFoundPage />} /> */}
			</Routes>
		</>
	);

	const app = (
		<>
			<main id="main"> {routes}</main>

			<div>
				<ErrorContainer />
			</div>
		</>
	);

	return app;
}

export default RouteBuilder;

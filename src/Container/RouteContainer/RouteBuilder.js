import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../../Component/PageLayout/NotFoundPage";
import SignupRouteContainer from "../AuthContainer/SignupRouteContainer";
import SwitchProfileContainer from "../AuthContainer/SwitchProfileContainer";
import UserSigninContainer from "../AuthContainer/UserSigninContainer";
import ErrorContainer from "../ErrorContainer";
import ProfileContainer from "../ProfilePanelContainer/ProfileContainer";
import LayoutContainer from "./LayoutContainer";

function RouteBuilder() {
	const routes = (
		<>
			<Routes>
				<Route path="/register/*" element={<SignupRouteContainer />} />
				<Route path="/signin" element={<UserSigninContainer />} />
				<Route path="/myprofile/:id" element={<ProfileContainer />} />
				{/* <Route path="/search" element={<SearchContainer />} /> */}
				<Route path="/switch-profiles" element={<SwitchProfileContainer />} />
				<Route path="/*" element={<LayoutContainer />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</>
	);

	const app = (
		<>
			<main id="main">{routes}</main>

			<div>
				<ErrorContainer />
			</div>
		</>
	);

	return app;
}

export default RouteBuilder;

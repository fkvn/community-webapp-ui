import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../../Component/Global/NotFoundPage";
import SignupRouteContainer from "../AuthContainer/SignupRouteContainer";
import UserSigninContainer from "../AuthContainer/UserSigninContainer";
import ErrorContainer from "../ErrorContainer";
import ProfileContainer from "../ProfilePanelContainer/ProfileContainer";
import SwitchProfileContainer from "../SwitchProfileContainer";
import AuthContainer from "./AuthContainer";
import LayoutContainer from "./LayoutContainer";

function RouteBuilder() {
	const routes = (
		<>
			<Routes>
				<Route path="/" element={<LayoutContainer />} />
				<Route path="/signup/*" element={<SignupRouteContainer />} />
				<Route path="/signin" element={<UserSigninContainer />} />
				<Route path="/myprofile/:id" element={<ProfileContainer />} />
				<Route
					path="/switch-profile"
					element={
						<AuthContainer>
							<SwitchProfileContainer />
						</AuthContainer>
					}
				/>
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

import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../../Component/Global/NotFoundPage";
import ErrorContainer from "../ErrorContainer";
import SigninContainer from "../SigninContainer";
import SignoutContainer from "../SignoutContainer";
import SwitchProfileContainer from "../SwitchProfileContainer";
import LayoutContainer from "./LayoutContainer";
import SignupRouteContainer from "./SignupRouteContainer";

function RouteBuilder() {
	// const location = useLocation();

	// const profile = useSelector(
	// 	(state) => state.thainowReducer[`${constVar.THAINOW_PROFILE_OBJ}`] || {}
	// );

	// useEffect(() => {
	// 	const storageProfile =
	// 		JSON.parse(localStorage.getItem(constVar.THAINOW_PROFILE_OBJ)) || {};

	// 	if (
	// 		JSON.stringify(storageProfile) !== "{}" &&
	// 		JSON.stringify(profile) === "{}"
	// 	) {
	// 		dispatchPromise.patchProfileInfo({ ...storageProfile }, true);
	// 	}
	// }, [location, profile]);

	const routes = (
		<>
			<Routes>
				<Route path="/" element={<LayoutContainer />} />
				<Route path="signup/*" element={<SignupRouteContainer />} />
				<Route path="/signin" element={<SigninContainer />} />
				<Route path="/signout" element={<SignoutContainer />} />
				<Route path="/switch-profile" element={<SwitchProfileContainer />} />
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

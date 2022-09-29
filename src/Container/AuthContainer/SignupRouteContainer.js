import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../../Component/PageLayout/NotFoundPage";
import BusinessSignupContainer from "../SignupContainer/BusinessSignupContainer";
import UserSignupContainer from "../SignupContainer/UserSignupContainer";

function SignupRouteContainer() {
	const routes = (
		<Routes>
			{/* prefix - parent url : /register */}
			<Route path="user" element={<UserSignupContainer />} />
			{/* <Route path="classic" element={<ClassicSignupContainer />} /> */}
			<Route path="business" element={<BusinessSignupContainer />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);

	return routes;
}

export default SignupRouteContainer;

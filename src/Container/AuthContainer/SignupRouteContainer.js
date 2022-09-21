import { Route, Routes } from "react-router-dom";
import BusinessSignupContainer from "../SignupContainer/BusinessSignupContainer";
import SignupSuccessContainer from "../SignupContainer/SignupSuccessContainer";
import UserSignupContainer from "../SignupContainer/UserSignupContainer";

function SignupRouteContainer() {
	const routes = (
		<Routes>
			{/* prefix - parent url : /register */}
			<Route path="/" element={<UserSignupContainer />} />
			{/* <Route path="classic" element={<ClassicSignupContainer />} /> */}
			<Route path="business" element={<BusinessSignupContainer />} />
			<Route path="success" element={<SignupSuccessContainer />} />
		</Routes>
	);

	return routes;
}

export default SignupRouteContainer;

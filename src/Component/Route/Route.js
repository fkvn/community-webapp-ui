import { Route, Routes } from "react-router-dom";
import { SIGN_IN_PATH } from "../../Util/constVar";
import ForgotPasswordContainer from "../Auth/Password/ForgotPasswordContainer";
import Signin from "../Auth/Signin/Signin";
import Signup from "../Auth/Signup/Signup";
import NotFound from "../NotFound/NotFound";
import HomeBody from "../SPALayout/Body/HomeBody";
import MyProfileBody from "../SPALayout/Body/MyProfileBody";
import SPALayout from "../SPALayout/SPALayout";

function RouteBuilder() {
	const routes = (
		<>
			<Routes>
				<Route path="/signup/*" element={<Signup />} />
				<Route path={SIGN_IN_PATH} element={<Signin />} />
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

				<Route path="/" element={<SPALayout />}>
					{/* nested component */}
					<Route index element={<HomeBody />} />
					<Route path="my-profile" element={<MyProfileBody />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);

	const App = () => (
		<>
			<main id="main"> {routes}</main>
		</>
	);

	return <App />;
}

export default RouteBuilder;

import { useTranslation } from "react-i18next";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
	FORGOT_PASSWORD_PATH,
	GUIDE_BOOK_NEW_POST_PATH,
	GUIDE_BOOK_PATH,
	HELP_CENTER_PATH,
	MY_PROFILE_PATH,
	SIGN_IN_PATH,
	SIGN_UP_PATH,
} from "../../Util/ConstVar";
import ForgotPasswordContainer from "../Auth/Password/ForgotPasswordContainer";
import Signin from "../Auth/Signin/Signin";
import Signup from "../Auth/Signup/Signup";
import NotFound from "../NotFound/NotFound";
import GuideBookDashBoard from "../SPALayout/Body/GuideBook/Dashboard";
import GuideBookDetail from "../SPALayout/Body/GuideBook/Detail";
import NewGuideBookPost from "../SPALayout/Body/GuideBook/NewPost";
import GuideBookRoute from "../SPALayout/Body/GuideBook/Route";
import HelpCenter from "../SPALayout/Body/HelpCenter";
import MyProfile from "../SPALayout/Body/MyProfile";
import Home from "../SPALayout/Body/ThaiHelpThai/Home";
import SPALayout from "../SPALayout/SPALayout";

function RouteContainer() {
	const { t } = useTranslation();

	const router = createBrowserRouter([
		{
			path: "/",
			Component: SPALayout,
			children: [
				// Outlet Body
				{ index: true, Component: Home },
				{ path: MY_PROFILE_PATH.slice(1), Component: MyProfile },
				{
					path: HELP_CENTER_PATH.slice(1),
					Component: HelpCenter,
					handle: {
						// you can put whatever you want on a route handle
						// here we use "crumb" and return some elements,
						// this is what we'll render in the breadcrumbs
						// for this route
						crumb: () => {
							return { path: HELP_CENTER_PATH, title: t("help_center_msg") };
						},
					},
				},
				{
					path: GUIDE_BOOK_PATH.slice(1),
					Component: GuideBookRoute,
					handle: {
						crumb: () => {
							return { path: GUIDE_BOOK_PATH, title: t("thai_guide_book_msg") };
						},
					},
					children: [
						{ index: true, Component: GuideBookDashBoard },
						{
							path: `:id`,
							Component: GuideBookDetail,
						},
					],
				},
			],
			handle: {
				crumb: () => {
					return { path: "/", title: t("home_msg") };
				},
			},
		},
		{ path: SIGN_UP_PATH, Component: Signup },
		{ path: SIGN_IN_PATH, Component: Signin },
		{ path: FORGOT_PASSWORD_PATH, Component: ForgotPasswordContainer },
		{ path: GUIDE_BOOK_NEW_POST_PATH, Component: NewGuideBookPost },
		{ path: "*", Component: NotFound },
	]);

	// const routes = (
	// 	<>
	// 		{/* <Routes> */}
	// 		<Route path="/signup/*" element={<Signup />} />
	// 		<Route path={SIGN_IN_PATH} element={<Signin />} />
	// 		<Route
	// 			exact
	// 			path={`/forgot-password`}
	// 			element={<ForgotPasswordContainer />}
	// 		/>
	// 		{/* <Route path="/switch-profiles" element={<SwitchProfileContainer />} /> */}
	// 		{/* <Route path="/edit-profile/:id" element={<EditProfileContainer />} /> */}
	// 		{/* <Route
	// 				exact
	// 				path={`/:action/${SEARCH_SERVICE}/:${SEARCH_TYPE_PROP}/:id`}
	// 				element={<EditServiceContainer />}
	// 			/> */}
	// 		{/* <Route
	// 				exact
	// 				path={`/:action/${SEARCH_SERVICE}/:${SEARCH_TYPE_PROP}`}
	// 				element={<EditServiceContainer />}
	// 			/> */}

	// 		<Route path="/" element={<SPALayout />}>
	// 			{/* nested component */}
	// 			<Route index element={<HomeBody />} />
	// 			<Route path="my-profile" element={<MyProfileBody />} />
	// 			<Route
	// 				path="helpcenter"
	// 				element={<HelpCenter />}
	// 				handle={{
	// 					// you can put whatever you want on a route handle
	// 					// here we use "crumb" and return some elements,
	// 					// this is what we'll render in the breadcrumbs
	// 					// for this route
	// 					crumb: () => <Link to="/helpcenter">Help Center</Link>,
	// 				}}
	// 			/>
	// 		</Route>
	// 		<Route path="*" element={<NotFound />} />
	// 		{/* </Routes> */}
	// 	</>
	// );

	const App = () => (
		<>
			<main id="main">
				{" "}
				<RouterProvider router={router} />
			</main>
		</>
	);

	return <App />;
}

export default RouteContainer;

import { useTranslation } from "react-i18next";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
	FORGOT_PASSWORD_PATH,
	GUIDE_BOOK_EDIT_POST_PATH,
	GUIDE_BOOK_NEW_POST_PATH,
	GUIDE_BOOK_PATH,
	HELP_CENTER_PATH,
	MY_PROFILE_PATH,
	SIGN_IN_PATH,
	SIGN_UP_PATH,
} from "../../Util/ConstVar";
import ForgotPasswordContainer from "../Layout/ExternalLayout/Auth/Password/ForgotPasswordContainer";
import Signin from "../Layout/ExternalLayout/Auth/Signin";
import Signup from "../Layout/ExternalLayout/Auth/Signup";
import EditGuideBookPost from "../Layout/ExternalLayout/GuideBook/EditPost";
import NewGuideBookPost from "../Layout/ExternalLayout/GuideBook/NewPost";
import GuideBookDashBoard from "../Layout/MainLayout/Body/GuideBook/Dashboard";
import GuideBookDetail from "../Layout/MainLayout/Body/GuideBook/Detail";
import GuideBookRoute from "../Layout/MainLayout/Body/GuideBook/Route";
import HelpCenter from "../Layout/MainLayout/Body/HelpCenter";
import MyProfile from "../Layout/MainLayout/Body/MyProfile";
import Home from "../Layout/MainLayout/Body/ThaiHelpThai/Home";
import MainLayout from "../Layout/MainLayout/MainLayout";
import NotFound from "../NotFound/NotFound";

function RouteContainer() {
	const { t } = useTranslation();

	const router = createBrowserRouter([
		{
			path: "/",
			Component: MainLayout,
			children: [
				// Outlet Body
				{ index: true, Component: Home },
				{
					path: `${MY_PROFILE_PATH}`,
					Component: MyProfile,
					handle: {
						// you can put whatever you want on a route handle
						// here we use "crumb" and return some elements,
						// this is what we'll render in the breadcrumbs
						// for this route
						crumb: () => {
							return { path: MY_PROFILE_PATH, title: t("my_profile_msg") };
						},
					},
				},
				{
					path: HELP_CENTER_PATH,
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
					path: GUIDE_BOOK_PATH,
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
		{ path: `${GUIDE_BOOK_EDIT_POST_PATH}/:id`, Component: EditGuideBookPost },
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

	// 		<Route path="/" element={<MainLayout />}>
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

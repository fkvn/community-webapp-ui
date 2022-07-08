import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFoundPage from "../../Component/Global/NotFoundPage";
import * as dispatchPromise from "../../redux-store/dispatchPromise";
import * as constVar from "../../Util/ConstVar";
import ErrorContainer from "../ErrorContainer";
import LoginContainer from "../LoginContainer";
import LayoutContainer from "./LayoutContainer";
import SignupRouteContainer from "./SignupRouteContainer";

function RouteBuilder() {
	const location = useLocation();

	const profile = useSelector(
		(state) => state.thainowReducer[`${constVar.THAINOW_PROFILE_OBJ}`] || {}
	);

	useEffect(() => {
		const storageProfile =
			JSON.parse(localStorage.getItem(constVar.THAINOW_PROFILE_OBJ)) || {};

		if (
			JSON.stringify(storageProfile) !== "{}" &&
			JSON.stringify(profile) === "{}"
		) {
			dispatchPromise.patchProfileInfo({ ...storageProfile }, true);
		}
	}, [location, profile]);

	const routes = (
		<>
			<Routes>
				<Route path="/" exact element={<LayoutContainer />} />
				<Route path="signup/*" element={<SignupRouteContainer />} />
				<Route path="/login" element={<LoginContainer />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</>
	);

	const app = (
		<>
			<main>{routes}</main>
			<div>
				<ErrorContainer />
			</div>
		</>
	);

	return app;
}

export default RouteBuilder;

import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFoundPage from "../../Component/Global/NotFoundPage";
import * as constVar from "../../Util/ConstVar";
import ErrorContainer from "../ErrorContainer";
import LoginContainer from "../LoginContainer";
import LayoutContainer from "./LayoutContainer";
import SignupRouteContainer from "./SignupRouteContainer";

function RouteBuilder() {
	const location = useLocation();

	const [user, setUser] = useState({});

	useEffect(() => {
		const thaiNowObj =
			JSON.parse(localStorage.getItem(constVar.THAINOW_USER_STORRAGE_OBJ)) ||
			{};

		if (JSON.stringify(thaiNowObj) !== "{}" && JSON.stringify(user) === "{}") {
			setUser({ ...thaiNowObj });
		}
	}, [location, setUser, user]);

	const routes = (
		<>
			<Routes>
				<Route path="/" exact element={<LayoutContainer user={user} />} />
				<Route path="signup/*" element={<SignupRouteContainer />} />
				<Route path="/login" element={<LoginContainer user={user} />} />
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

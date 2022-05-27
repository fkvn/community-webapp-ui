import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import NotFoundPage from "../Component/Global/NotFoundPage";
import LoginContainer from "./LoginContainer";
import ErrorContainer from "./ErrorContainer";
import LandingPageContainer from "./LandingPageContainer";
import Signup from "../Component/Signup/Signup";

import * as constVar from "../Util/ConstVar";
import { useState } from "react";
import { useEffect } from "react";
import ClassicSignupContainer from "./SignupContainer/ClassicSignupContainer";
import SignupSuccessContainer from "./SignupContainer/SignupSuccessContainer";
import BusinessSignupContainer from "./SignupContainer/BusinessSignupContainer";

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
		<Routes>
			{/* <Route
				path="/"
				element={
					<Form className="m-5 w-50">
						<GoogleAutoComplete />
					</Form>
				}
			/> */}
			<Route path="/" element={<LandingPageContainer user={user} />} />
			<Route path="/login" element={<LoginContainer user={user} />} />
			<Route path="/signup" element={<Signup />}></Route>
			<Route path="/signup/classic" element={<ClassicSignupContainer />} />
			<Route path="/signup/business" element={<BusinessSignupContainer />} />
			<Route path="/signup/success" element={<SignupSuccessContainer />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
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

import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import * as axiosPromise from "../../Axios/axiosPromise";
import SignupSuccess from "../../Component/Signup/SignupSuccess";
import * as constVar from "../../Util/ConstVar";

function SignupSuccessContainer() {
	const location = useLocation();
	let [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const {
		channel = "",
		email = "",
		phone = "",
		password = "",
	} = location.state || {};

	const continueURL = searchParams.get("continue") || "/";

	const loginHanlder = () => {
		axiosPromise.loginPromise(channel, email, phone, password).then((res) => {
			if (res) {
				localStorage.setItem(
					constVar.THAINOW_USER_STORRAGE_OBJ,
					JSON.stringify(res.data)
				);
				navigate(continueURL, { replace: true, state: {} });
			}
		});
	};

	const app = <SignupSuccess loginHanlder={loginHanlder} />;
	return app;
}

export default SignupSuccessContainer;

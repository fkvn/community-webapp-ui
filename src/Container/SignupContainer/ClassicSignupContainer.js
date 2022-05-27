import React from "react";
import ClassicSignup from "../../Component/Signup/ClassicSignup";

import * as axiosPromise from "../../Axios/axiosPromise";
import * as dispatchPromise from "../../redux-store/dispatchPromise";

function ClassicSignupContainer() {
	const sessionStorageObj = "thainow.classic.signup.info";

	const submitErrorHandler = (message = "") =>
		dispatchPromise.getPromise(dispatchPromise.submitErrorHandler(message));

	const validateEmailHandler = (email = "") =>
		axiosPromise.getPromise(axiosPromise.validateEmailPromise(email));

	const validatePhoneHandler = (phone = "") =>
		axiosPromise.getPromise(axiosPromise.validatePhonePromise(phone));

	const sendOtpCodeHandler = (channel = "", value = "") =>
		axiosPromise.getPromise(axiosPromise.sendOtpCodePromise(channel, value));

	const verifyOtpCodeHandler = (channel = "", value = "", token = "") =>
		axiosPromise.getPromise(
			axiosPromise.verifyOtpCodePromise(channel, value, token)
		);

	const signupHandler = (signupInfo = {}, role = "") =>
		axiosPromise.getPromise(axiosPromise.signupPromise(signupInfo, role));

	const app = (
		<ClassicSignup
			sessionStorageObj={sessionStorageObj}
			submitErrorHandler={submitErrorHandler}
			validateEmailHandler={validateEmailHandler}
			validatePhoneHandler={validatePhoneHandler}
			sendOtpCodeHandler={sendOtpCodeHandler}
			verifyOtpCodeHandler={verifyOtpCodeHandler}
			signupHandler={signupHandler}
		/>
	);

	return app;
}

export default ClassicSignupContainer;

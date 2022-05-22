import React from "react";
import NewClassicSignup from "../../Component/Signup/NewClassicSignup";

import * as axiosPromise from "../../Axios/axiosPromise";
import * as dispatchPromise from "../../redux-store/dispatchPromise";

function ClassicSignupContainer() {
	const submitErrorHandler = dispatchPromise.submitErrorHandler;

	const validateEmailHandler = axiosPromise.validateEmailPromise;

	const validatePhoneHandler = (phone) =>
		axiosPromise.getPromise(axiosPromise.validatePhonePromise(phone));

	const sendOtpCodeHandler = axiosPromise.sendOtpCodePromise;

	const verifyOtpCodeHandler = axiosPromise.verifyOtpCodePromise;

	const signupHandler = axiosPromise.signupPromise;

	const app = (
		<NewClassicSignup
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

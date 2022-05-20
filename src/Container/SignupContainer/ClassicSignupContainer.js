import React from "react";
import { useSearchParams } from "react-router-dom";
import NewClassicSignup from "../../Component/Signup/NewClassicSignup";

import * as axiosPromise from "../../Axios/axiosPromise";

import * as actionCreators from "../../redux-store/actionCreator/actionCreator";
import { useDispatch } from "react-redux";

function ClassicSignupContainer() {
	const dispatch = useDispatch();

	let [searchParams] = useSearchParams();

	const continueURL = searchParams.get("continue") || "";

	const continueParams =
		continueURL.length > 0 ? "?continue=" + continueURL : "";

	const submitErrorHandler = (message) => {
		return dispatch(actionCreators.initError(message, ""));
	};

	const validateEmailHandler = axiosPromise.validateEmailPromise;

	const validatePhoneHandler = axiosPromise.validatePhonePromise;

	const app = (
		<NewClassicSignup
			continueParams={continueParams}
			submitErrorHandler={submitErrorHandler}
			validateEmailHandler={validateEmailHandler}
			validatePhoneHandler={validatePhoneHandler}
		/>
	);

	return app;
}

export default ClassicSignupContainer;

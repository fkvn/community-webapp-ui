import React from "react";
import BusinessSignup from "../../Component/Signup/BusinessSignup";
// import * as axiosPromise from "../../Axios/axiosPromise";
import * as dispatchPromise from "../../redux-store/dispatchPromise";
import * as constVar from "../../Util/ConstVar";

function BusinessSignupContainer() {
	const sessionStorageObj = "thainow.business.signup.info";

	const industryList = [
		...constVar.COMPANY_INDUSTRY_LIST.map((item) => {
			return { title: item, value: item };
		}),
	];

	const positionList = [
		...constVar.COMPANY_POSTION_LIST.map((item) => {
			return { title: item, value: item };
		}),
	];

	const submitErrorHandler = (message = "") =>
		dispatchPromise.getPromise(dispatchPromise.submitErrorHandler(message));

	const app = (
		<BusinessSignup
			sessionStorageObj={sessionStorageObj}
			submitErrorHandler={submitErrorHandler}
			industryList={industryList}
			positionList={positionList}
		/>
	);
	return app;
}

export default BusinessSignupContainer;

import React from "react";
import BusinessSignup from "../../Component/Signup/BusinessSignup";
import * as constVar from "../../Util/ConstVar";

function BusinessSignupContainer() {
	const sessionStorageObjName = constVar.THAINOW_BUSINESS_SIGN_UP_STORAGE_OBJ;

	const industryList = [
		...constVar.COMPANY_INDUSTRY_LIST.map((item) => {
			return { description: item, value: item };
		}),
	];

	const positionList = [
		...constVar.COMPANY_POSTION_LIST.map((item) => {
			return { title: item, value: item };
		}),
	];

	// const submitErrorHandler = (message = "") =>
	// 	dispatchPromise.getPromise(dispatchPromise.submitErrorHandler(message));

	const app = (
		<BusinessSignup
			sessionStorageObjName={sessionStorageObjName}
			// submitErrorHandler={submitErrorHandler}
			industryList={industryList}
			positionList={positionList}
		/>
	);
	return app;
}

export default BusinessSignupContainer;

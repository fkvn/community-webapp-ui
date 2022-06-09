import { useNavigate, useSearchParams } from "react-router-dom";
import BusinessSignup from "../../Component/Signup/BusinessSignup";
import * as constVar from "../../Util/ConstVar";

function BusinessSignupContainer() {
	const navigate = useNavigate();

	let [searchParams] = useSearchParams();

	const continueURL = searchParams.get("continue") || "/";

	const continueParams =
		continueURL.length > 0 ? "?continue=" + continueURL : "";

	const storageObjName = constVar.THAINOW_BUSINESS_SIGN_UP_STORAGE_OBJ;

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
			storageObjName={storageObjName}
			// submitErrorHandler={submitErrorHandler}
			industryList={industryList}
			positionList={positionList}
		/>
	);
	return app;
}

export default BusinessSignupContainer;

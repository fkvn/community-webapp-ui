import { useNavigate, useSearchParams } from "react-router-dom";
import * as axiosPromise from "../../Axios/axiosPromise";
import BusinessSignup from "../../Component/Signup/BusinessSignup";
import * as dispatchPromise from "../../redux-store/dispatchPromise";
import * as constVar from "../../Util/ConstVar";

function BusinessSignupContainer() {
	const navigate = useNavigate();

	let [searchParams] = useSearchParams();

	const continueURL = searchParams.get("continue") || "/";

	// const continueParams =
	// 	continueURL.length > 0 ? "?continue=" + continueURL : "";

	const storageObjName = constVar.THAINOW_BUSINESS_SIGN_UP_STORAGE_OBJ;

	const submitErrorHandler = (message = "") =>
		dispatchPromise.submitErrorHandler(message);

	const validateEmailHandler = (email = "") =>
		axiosPromise.getPromise(axiosPromise.validateCompanyEmailPromise(email));

	const validatePhoneHandler = (phone = "") =>
		axiosPromise.getPromise(axiosPromise.validateCompanyPhonePromise(phone));

	const onCloseHandler = () => {
		sessionStorage.removeItem(storageObjName);
		navigate(continueURL);
	};

	const onBackHandlerPromise = (onBackHandler = () => {}) => {
		return new Promise((resolve, _) => {
			onBackHandler();
			resolve();
		});
	};

	const onSubmitStep_1_HandlerPromise = async () => {
		// get signup object from redux store
		let companyInfo =
			dispatchPromise.getState()[
				`${constVar.THAINOW_COMPANY_SIGN_UP_STORAGE_OBJ}`
			];

		const { description = "", placeid = "" } =
			companyInfo[`${constVar.STORAGE_ADDRESS_PROP}`] || {};

		const email = companyInfo[`${constVar.STORAGE_EMAIL_PROP}`] || "";

		const phone = companyInfo[`${constVar.STORAGE_PHONE_PROP}`] || "";

		if (description.length === 0 || placeid.length === 0)
			return submitErrorHandler("Invalid Location");
		else if (email.length > 0) return validateEmailHandler(email);
		else if (phone.length > 0)
			return validatePhoneHandler(phone).catch(() =>
				submitErrorHandler("Invalid Password!")
			);
		else {
			return true;
		}
	};

	const stepHandlers = [
		{
			step: 1,
			onStepHandlerPromise: onSubmitStep_1_HandlerPromise,
		},
	];

	const app = (
		<BusinessSignup
			storageObjName={storageObjName}
			stepHandlers={stepHandlers}
			onClose={onCloseHandler}
			onBackHandlerPromise={onBackHandlerPromise}
		/>
	);
	return app;
}

export default BusinessSignupContainer;

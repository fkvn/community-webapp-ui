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

	const submitErrorHandler = (message = "") =>
		dispatchPromise.submitErrorHandler(message);

	const onCloseHandler = () => {
		sessionStorage.removeItem(constVar.THAINOW_USER_SIGN_UP_STORAGE_OBJ);
		sessionStorage.removeItem(constVar.THAINOW_COMPANY_SIGN_UP_STORAGE_OBJ);
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

		const {
			[`${constVar.STORAGE_COMPANY_ADDRESS_PROP}`]: {
				description = "",
				placeid = "",
			} = {},
			[`${constVar.STORAGE_COMPANY_WEBSITE_VALIDATION}`]: isValidWebsite = true,
			[`${constVar.STORAGE_COMPANY_PHONE_VALIDATION}`]: isValidPhone = true,
			[`${constVar.STORAGE_COMPANY_EMAIL_VALIDATION}`]: isValidEmail = true,
		} = companyInfo;

		if (description.length === 0 || placeid.length === 0)
			return submitErrorHandler("Invalid Location");
		else if (!isValidWebsite) return submitErrorHandler("Invalid Website");
		else if (!isValidPhone) return submitErrorHandler("Invalid Phone");
		else if (!isValidEmail) return submitErrorHandler("Invalid Email");

		return true;
	};

	const onSelectVerifyMethodHandler = (channel = "") => {
		dispatchPromise.patchSignupUserInfo({
			[`${constVar.STORAGE_VERIFICATION_METHOD_PROP}`]:
				channel === constVar.STORAGE_EMAIL_PROP
					? constVar.STORAGE_EMAIL_PROP
					: channel === constVar.STORAGE_PHONE_PROP
					? constVar.STORAGE_PHONE_PROP
					: "",
		});
	};

	const sendOtpCodeHandler = (channel = "", value = "") =>
		axiosPromise.getPromise(axiosPromise.sendOtpCodePromise(channel, value));

	const onSubmitStep_4_HandlerPromise = async () => {
		// get signup object from redux store
		let signupInfo =
			dispatchPromise.getState()[
				`${constVar.THAINOW_USER_SIGN_UP_STORAGE_OBJ}`
			];

		const {
			[`${constVar.STORAGE_VERIFICATION_METHOD_PROP}`]: verifyOption = "",
			[`${constVar.STORAGE_EMAIL_PROP}`]: email = "",
			[`${constVar.STORAGE_EMAIL_VALIDATION}`]: isValidEmail = true,
			[`${constVar.STORAGE_PHONE_PROP}`]: phone = "",
			[`${constVar.STORAGE_PHONE_VALIDATION}`]: isValidPhone = true,
		} = signupInfo;

		const [channel, value] =
			verifyOption === constVar.STORAGE_EMAIL_PROP
				? ["email", email]
				: verifyOption === constVar.STORAGE_PHONE_PROP
				? ["sms", phone]
				: ["", ""];

		if (channel === "email" && (email.length === 0 || !isValidEmail)) {
			return submitErrorHandler(
				"Invalid Email! Please provide or add a valid email address."
			);
		} else if (channel === "sms" && (phone.length === 0 || !isValidPhone)) {
			return submitErrorHandler(
				"Invalid Phone! Please provide or add a valid phone number."
			);
		} else if (channel === "" || value === "") {
			return submitErrorHandler(
				"Sorry, the request failed. Please try again later."
			);
		} else {
			return sendOtpCodeHandler(channel, value);
		}
	};

	const verifyOtpCodeHandler = (channel = "", value = "", token = "") =>
		axiosPromise.getPromise(
			axiosPromise.verifyOtpCodePromise(channel, value, token)
		);

	const onSubmitStep_5_HandlerPromise = async () => {
		// get signup object from redux store
		let signupInfo =
			dispatchPromise.getState()[
				`${constVar.THAINOW_USER_SIGN_UP_STORAGE_OBJ}`
			];

		const {
			[`${constVar.STORAGE_OTP_VALIDATION}`]: isValidOtp = false,
			[`${constVar.STORAGE_OTP_PROP}`]: formattedOtp = "",
			[`${constVar.STORAGE_VERIFICATION_METHOD_PROP}`]: verifyOption = "",
			[`${constVar.STORAGE_PHONE_PROP}`]: phone = "",
			[`${constVar.STORAGE_EMAIL_PROP}`]: email = "",
		} = signupInfo;

		const token = formattedOtp.replace(/[^\d]/g, "") || "";

		const [channel, value] =
			verifyOption === constVar.STORAGE_EMAIL_PROP
				? ["email", email]
				: verifyOption === constVar.STORAGE_PHONE_PROP
				? ["sms", phone]
				: ["", ""];

		if (token.length !== 4 || !isValidOtp)
			return submitErrorHandler("Invalid Token Code.");
		else if (channel === "" || value === "") {
			return submitErrorHandler(
				"Sorry, the request failed. Please try again later."
			);
		} else {
			return verifyOtpCodeHandler(channel, value, token);
		}
	};

	const stepHandlers = [
		{
			step: 1,
			onStepHandlerPromise: onSubmitStep_1_HandlerPromise,
		},
		{
			step: 2,
			onStepHandlerPromise: async () => {
				return true;
			},
		},
		{
			step: 3,
			onStepHandlerPromise: async () => {
				return true;
			},
		},
		{
			step: 4,
			onStepHandlerPromise: onSubmitStep_4_HandlerPromise,
		},
		{
			step: 5,
			onStepHandlerPromise: onSubmitStep_5_HandlerPromise,
		},
	];

	const app = (
		<BusinessSignup
			stepHandlers={stepHandlers}
			onClose={onCloseHandler}
			onBackHandlerPromise={onBackHandlerPromise}
			onSelectVerifyMethod={onSelectVerifyMethodHandler}
		/>
	);
	return app;
}

export default BusinessSignupContainer;

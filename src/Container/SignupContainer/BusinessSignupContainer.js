import { useNavigate, useSearchParams } from "react-router-dom";
import * as axiosPromise from "../../Axios/axiosPromise";
import BusinessSignup from "../../Component/Signup/BusinessSignup";
import * as dispatchPromise from "../../redux-store/dispatchPromise";
import * as constVar from "../../Util/ConstVar";

function BusinessSignupContainer() {
	const navigate = useNavigate();

	let [searchParams] = useSearchParams();

	const continueURL = searchParams.get("continue") || "/";

	const continueParams =
		continueURL.length > 0 ? "?continue=" + continueURL : "";

	const submitErrorHandler = (message = "") =>
		dispatchPromise.submitErrorHandler(message);

	const onCloseHandler = () => {
		sessionStorage.removeItem(constVar.THAINOW_USER_SIGN_UP_OBJ);
		sessionStorage.removeItem(constVar.THAINOW_COMPANY_SIGN_UP_OBJ);
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
			dispatchPromise.getState()[`${constVar.THAINOW_COMPANY_SIGN_UP_OBJ}`];

		const {
			[`${constVar.COMPANY_ADDRESS_PROP}`]: {
				description = "",
				placeid = "",
			} = {},
			[`${constVar.COMPANY_WEBSITE_VALIDATION}`]: isValidWebsite = true,
			[`${constVar.COMPANY_PHONE_VALIDATION}`]: isValidPhone = true,
			[`${constVar.COMPANY_EMAIL_VALIDATION}`]: isValidEmail = true,
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
			[`${constVar.VERIFICATION_METHOD_PROP}`]:
				channel === constVar.EMAIL_PROP
					? constVar.EMAIL_PROP
					: channel === constVar.PHONE_PROP
					? constVar.PHONE_PROP
					: "",
		});
	};

	const sendOtpCodeHandler = (channel = "", value = "") =>
		axiosPromise.getPromise(axiosPromise.sendOtpCodePromise(channel, value));

	const validateEmailHandler = (email = "") =>
		axiosPromise.getPromise(axiosPromise.validateEmailPromise(email));

	const validatePhoneHandler = (phone = "") =>
		axiosPromise.getPromise(axiosPromise.validatePhonePromise(phone));

	const onSubmitStep_4_HandlerPromise = async () => {
		// get signup object from redux store
		let signupInfo =
			dispatchPromise.getState()[`${constVar.THAINOW_USER_SIGN_UP_OBJ}`];

		const {
			[`${constVar.VERIFICATION_METHOD_PROP}`]: verifyOption = "",
			[`${constVar.EMAIL_PROP}`]: email = "",
			[`${constVar.EMAIL_VALIDATION}`]: isValidEmail = true,
			[`${constVar.PHONE_PROP}`]: phone = "",
			[`${constVar.PHONE_VALIDATION}`]: isValidPhone = true,
		} = signupInfo;

		const [channel, value, isValidValue, message, validatePromise] =
			verifyOption === constVar.EMAIL_PROP
				? [
						"email",
						email,
						isValidEmail,
						"Invalid Email! Please provide or add a valid email address.",
						validateEmailHandler,
				  ]
				: verifyOption === constVar.PHONE_PROP
				? [
						"sms",
						phone,
						isValidPhone,
						"Invalid Phone! Please provide or add a valid phone number.",
						validatePhoneHandler,
				  ]
				: ["", "", "Sorry, the request failed. Please try again later."];

		if (!isValidValue || channel === "" || value === "") {
			return submitErrorHandler(message);
		} else {
			return validatePromise(value).then(() =>
				sendOtpCodeHandler(channel, value)
			);
		}
	};

	const verifyOtpCodeHandler = (channel = "", value = "", token = "") =>
		axiosPromise.getPromise(
			axiosPromise.verifyOtpCodePromise(channel, value, token)
		);

	const signupHandler = async () => {
		// get signup object from redux store
		const businessInfo =
			dispatchPromise.getState()[`${constVar.THAINOW_USER_SIGN_UP_OBJ}`];

		const companyInfo =
			dispatchPromise.getState()[`${constVar.THAINOW_COMPANY_SIGN_UP_OBJ}`];

		const {
			[`${constVar.USERNAME_PROP}`]: username = "",
			[`${constVar.EMAIL_PROP}`]: email = "",
			[`${constVar.PHONE_PROP}`]: phone = "",
			[`${constVar.PASSWORD_PROP}`]: password = "",
			[`${constVar.ROLE_PROP}`]: role = "BUSINESS",
			[`${constVar.POSITION_PROP}`]: administratorRole = "",
			[`${constVar.PRIVILEGES_PROP}`]: privileges = [],
		} = businessInfo;

		const {
			[`${constVar.COMPANY_NAME_PROP}`]: companyName = "",
			[`${constVar.COMPANY_EMAIL_PROP}`]: companyEmail = "",
			[`${constVar.COMPANY_PHONE_PROP}`]: companyPhone = "",
			[`${constVar.COMPANY_INFORMAL_PROP}`]: informalCompany = false,
			[`${constVar.COMPANY_INDUSTRY_PROP}`]: companyIndustry = "",
			[`${constVar.COMPANY_WEBSITE_PROP}`]: companyWebsite = "",
			[`${constVar.COMPANY_SIZE_PROP}`]: companySize = "",
			[`${constVar.COMPANY_SUBMIT_EXTRA_INFO_VALIDATION}`]:
				isSummitExtraInfo = false,
			[`${constVar.COMPANY_ADDRESS_PROP}`]: {
				description = "",
				placeid = "",
			} = {},
		} = companyInfo;

		const signupInfo = {
			username: username,
			email: email,
			phone: phone,
			password: password,
			privileges: privileges,
			role: role,
			administratorRole: administratorRole,
			// business account has the same address as company
			address: description,
			placeid: placeid,
			// company sign up info
			company: {
				name: companyName,
				informal: informalCompany,
				...(informalCompany && {
					phone: companyPhone,
				}),
				industry: companyIndustry,
				address: description,
				placeid: placeid,
				...(isSummitExtraInfo && {
					email: companyEmail,
					phone: companyPhone,
					website: companyWebsite,
					size: companySize,
				}),
			},
		};

		return axiosPromise
			.getPromise(axiosPromise.signupPromise(signupInfo))
			.then(() => {
				// remove sign up info
				sessionStorage.removeItem(constVar.THAINOW_USER_SIGN_UP_OBJ);
				sessionStorage.removeItem(constVar.THAINOW_COMPANY_SIGN_UP_OBJ);

				navigate("/signup/success" + continueParams, {
					state: {
						channel: signupInfo[`${constVar.VERIFICATION_METHOD_PROP}`] || "",
						email: signupInfo[`${constVar.EMAIL_PROP}`] || "",
						phone: signupInfo[`${constVar.PHONE_PROP}`] || "",
						password: signupInfo[`${constVar.PASSWORD_PROP}`] || "",
						username: signupInfo[`${constVar.USERNAME_PROP}`] || "",
					},
				});
				return new Promise((resolve, _) => resolve());
			})
			.catch(() => {
				return new Promise((_, reject) => reject());
			});
	};

	const onSubmitStep_5_HandlerPromise = async () => {
		// get signup object from redux store
		let signupInfo =
			dispatchPromise.getState()[`${constVar.THAINOW_USER_SIGN_UP_OBJ}`];

		const {
			[`${constVar.OTP_VALIDATION}`]: isValidOtp = false,
			[`${constVar.OTP_PROP}`]: formattedOtp = "",
			[`${constVar.VERIFICATION_METHOD_PROP}`]: verifyOption = "",
			[`${constVar.PHONE_PROP}`]: phone = "",
			[`${constVar.EMAIL_PROP}`]: email = "",
		} = signupInfo;

		const token = formattedOtp.replace(/[^\d]/g, "") || "";

		const [channel, value] =
			verifyOption === constVar.EMAIL_PROP
				? ["email", email]
				: verifyOption === constVar.PHONE_PROP
				? ["sms", phone]
				: ["", ""];

		if (token.length !== 4 || !isValidOtp)
			return submitErrorHandler("Invalid Token Code.");
		else if (channel === "" || value === "") {
			return submitErrorHandler(
				"Sorry, the request failed. Please try again later."
			);
		} else {
			return verifyOtpCodeHandler(channel, value, token).then(() =>
				signupHandler()
			);
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

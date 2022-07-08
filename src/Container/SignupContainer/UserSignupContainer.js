import { useNavigate, useSearchParams } from "react-router-dom";
import * as axiosPromise from "../../Axios/axiosPromise";
import UserSignup from "../../Component/Signup/UserSignup";
import * as dispatchPromise from "../../redux-store/dispatchPromise";
import * as constVar from "../../Util/ConstVar";

function UserSignupContainer() {
	const navigate = useNavigate();

	let [searchParams] = useSearchParams();

	const continueURL = searchParams.get("continue") || "/";

	const continueParams =
		continueURL.length > 0 ? "?continue=" + continueURL : "";

	const submitErrorHandler = (message = "") =>
		dispatchPromise.submitErrorHandler(message);

	const onBackHandlerPromiseHandler = (onBackHandler = () => {}) => {
		return new Promise((resolve, _) => {
			onBackHandler();
			resolve();
		});
	};

	const onCloseHandler = () => {
		dispatchPromise.patchSignupUserInfo({}, true);
		sessionStorage.removeItem(constVar.THAINOW_USER_SIGN_UP_OBJ);
		navigate(continueURL, { replace: true });
	};

	const validateUsernameHandler = (username = "") =>
		axiosPromise.getPromise(axiosPromise.validateUsernamePromise(username));

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

	const signupHandler = async (verified = false) => {
		// get signup object from redux store
		const signupInfo =
			dispatchPromise.getState()[`${constVar.THAINOW_USER_SIGN_UP_OBJ}`];

		const {
			[`${constVar.USERNAME_PROP}`]: username = "",
			[`${constVar.EMAIL_PROP}`]: email = "",
			[`${constVar.PHONE_PROP}`]: phone = "",
			[`${constVar.PASSWORD_PROP}`]: password = "",
			[`${constVar.ROLE_PROP}`]: role = "CLASSIC",
			[`${constVar.PRIVILEGES_PROP}`]: privileges = [],
			[`${constVar.ADDRESS_PROP}`]: { description = "", placeid = "" } = {},
			[`${constVar.VERIFICATION_METHOD_PROP}`]: channel = "",
		} = signupInfo;

		const signupSubmitInfo = {
			username: username,
			email: email,
			phone: phone,
			password: password,
			privileges: privileges,
			verified: verified,
			role: role,
			address: description,
			placeid: placeid,
		};

		return axiosPromise
			.getPromise(axiosPromise.signupPromise(signupSubmitInfo))
			.then(() => {
				dispatchPromise.patchSignupUserInfo({}, true);
				sessionStorage.removeItem(constVar.THAINOW_USER_SIGN_UP_OBJ);

				navigate("/signup/success" + continueParams, {
					state: {
						channel: channel,
						email: email,
						phone: phone,
						password: password,
						username: username,
					},
				});
				return new Promise((resolve, _) => resolve());
			})
			.catch(() => {
				return new Promise((_, reject) => reject());
			});
	};

	const onSubmitStep_1_HandlerPromise = async () => {
		// get signup object from redux store
		const signupInfo =
			dispatchPromise.getState()[`${constVar.THAINOW_USER_SIGN_UP_OBJ}`];

		const {
			[`${constVar.USERNAME_PROP}`]: username = "",
			[`${constVar.PASSWORD_VALIDATION}`]: isValidPassword = false,
			[`${constVar.ADDRESS_PROP}`]: { description = "", placeid = "" } = {},
		} = signupInfo;

		if (!isValidPassword) return submitErrorHandler("Invalid Password");
		else if (description.length === 0 || placeid.length === 0)
			return submitErrorHandler("Invalid Location");
		else {
			return validateUsernameHandler(username);
		}
	};

	const onSubmitStep_3_HandlerPromise = async () => {
		// get signup object from redux store
		let signupInfo =
			dispatchPromise.getState()[`${constVar.THAINOW_USER_SIGN_UP_OBJ}`];

		const {
			[`${constVar.VERIFICATION_METHOD_PROP}`]: verifyOption = "",
			[`${constVar.EMAIL_PROP}`]: email = "",
			[`${constVar.EMAIL_VALIDATION}`]: isValidEmail = false,
			[`${constVar.PHONE_PROP}`]: phone = "",
			[`${constVar.PHONE_VALIDATION}`]: isValidPhone = false,
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

	const onSubmitStep_4_HandlerPromise = async () => {
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
				: ["sms", "6268773058"];

		if (token.length !== 4 || !isValidOtp)
			return submitErrorHandler("Invalid Token Code.");
		else if (channel === "" || value === "") {
			return submitErrorHandler(
				"Sorry, the request failed. Please try again later."
			);
		} else {
			return verifyOtpCodeHandler(channel, value, token).then(() =>
				signupHandler(true)
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
			onStepHandlerPromise: onSubmitStep_3_HandlerPromise,
		},
		{
			step: 4,
			onStepHandlerPromise: onSubmitStep_4_HandlerPromise,
		},
	];

	const app = (
		<UserSignup
			stepHandlers={stepHandlers}
			onClose={onCloseHandler}
			onBackHandlerPromise={onBackHandlerPromiseHandler}
			onSelectVerifyMethod={onSelectVerifyMethodHandler}
		/>
	);
	return app;
}

export default UserSignupContainer;

import { useNavigate } from "react-router-dom";
import * as axiosPromise from "../../Axios/axiosPromise";
import UserSignup from "../../Component/Signup/UserSignup";
import * as dispatchPromise from "../../redux-store/dispatchPromise";
import * as constVar from "../../Util/ConstVar";

function UserSignupContainer() {
	const submitErrorHandler = (message = "") =>
		dispatchPromise.submitErrorHandler(message);

	const validateUsernameHandler = (username = "") =>
		axiosPromise.getPromise(axiosPromise.validateUsernamePromise(username));

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

	const navigate = useNavigate();

	const signupHandler = async () => {
		// get signup object from redux store
		const signupInfo =
			dispatchPromise.getState()[
				`${constVar.THAINOW_USER_SIGN_UP_STORAGE_OBJ}`
			];

		const {
			[`${constVar.STORAGE_USERNAME_PROP}`]: username = "",
			[`${constVar.STORAGE_EMAIL_PROP}`]: email = "",
			[`${constVar.STORAGE_PHONE_PROP}`]: phone = "",
			[`${constVar.STORAGE_PASSWORD_PROP}`]: password = "",
			[`${constVar.STORAGE_ROLE_PROP}`]: role = "CLASSIC",
			[`${constVar.STORAGE_PRIVILEGES_PROP}`]: privileges = [],
			[`${constVar.STORAGE_ADDRESS_PROP}`]: {
				description = "",
				placeid = "",
			} = {},
		} = signupInfo;

		const signupSubmitInfo = {
			username: username,
			email: email,
			phone: phone,
			password: password,
			privileges: privileges,
			role: role,
			address: description,
			placeid: placeid,
		};

		console.log(signupSubmitInfo);

		return new Promise((resolve, _) => {
			// remove sign up info
			sessionStorage.removeItem(constVar.THAINOW_USER_SIGN_UP_STORAGE_OBJ);
			sessionStorage.removeItem(constVar.THAINOW_COMPANY_SIGN_UP_STORAGE_OBJ);

			navigate("/signup/success", {
				state: {
					channel:
						signupInfo[`${constVar.STORAGE_VERIFICATION_METHOD_PROP}`] || "",
					email: signupInfo[`${constVar.STORAGE_EMAIL_PROP}`] || "",
					phone: signupInfo[`${constVar.STORAGE_PHONE_PROP}`] || "",
					password: signupInfo[`${constVar.STORAGE_PASSWORD_PROP}`] || "",
					username: signupInfo[`${constVar.STORAGE_USERNAME_PROP}`] || "",
				},
			});
			resolve();
		});
	};

	const onSubmitStep_1_HandlerPromise = async () => {
		// get signup object from redux store
		const signupInfo =
			dispatchPromise.getState()[
				`${constVar.THAINOW_USER_SIGN_UP_STORAGE_OBJ}`
			];

		const {
			[`${constVar.STORAGE_USERNAME_PROP}`]: username = "",
			[`${constVar.STORAGE_PASSWORD_PROP}`]: password = "",
			[`${constVar.STORAGE_PASSWORD_VALIDATION}`]: isValidPassword = false,
			[`${constVar.STORAGE_ADDRESS_PROP}`]: {
				description = "",
				placeid = "",
			} = {},
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
			dispatchPromise.getState()[
				`${constVar.THAINOW_USER_SIGN_UP_STORAGE_OBJ}`
			];

		const {
			[`${constVar.STORAGE_VERIFICATION_METHOD_PROP}`]: verifyOption = "",
			[`${constVar.STORAGE_EMAIL_PROP}`]: email = "",
			[`${constVar.STORAGE_EMAIL_VALIDATION}`]: isValidEmail = false,
			[`${constVar.STORAGE_PHONE_PROP}`]: phone = "",
			[`${constVar.STORAGE_PHONE_VALIDATION}`]: isValidPhone = false,
		} = signupInfo;

		const [channel, value, isValidValue, message, validatePromise] =
			verifyOption === constVar.STORAGE_EMAIL_PROP
				? [
						"email",
						email,
						isValidEmail,
						"Invalid Email! Please provide or add a valid email address.",
						validateEmailHandler,
				  ]
				: verifyOption === constVar.STORAGE_PHONE_PROP
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
			onSelectVerifyMethod={onSelectVerifyMethodHandler}
		/>
	);
	return app;
}

export default UserSignupContainer;

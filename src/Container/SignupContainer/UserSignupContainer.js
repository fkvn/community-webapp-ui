import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as axiosPromise from "../../Axios/axiosPromise";
import UserSignup from "../../Component/Signup/UserSignup";
import * as dispatchPromise from "../../redux-store/dispatchPromise";
import * as constVar from "../../Util/ConstVar";
import OffCanvasContainer from "../OffCanvasContainer";

function UserSignupContainer() {
	const navigate = useNavigate();
	const location = useLocation();

	const continueURL = location.state?.continue || "/";

	const showOffCanvas = useSelector(
		(state) =>
			state.thainowReducer[`${constVar.THAINOW_OFF_CANVAS_OBJ}`]?.[
				`${constVar.SHOW_OFF_CANVAS}`
			] || false
	);

	useEffect(() => {
		if (!showOffCanvas) {
			dispatchPromise.patchOffCanvasInfo({
				[`${constVar.SHOW_OFF_CANVAS}`]: true,
			});
		}
	});

	const submitErrorHandler = (message = "") =>
		dispatchPromise.submitErrorHandler(message);

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
			[`${constVar.VERIFICATION_METHOD_PROP}`]: channel = "",
		} = signupInfo;

		const signupSubmitInfo = {
			username: username,
			password: password,
			...(channel === constVar.EMAIL_PROP && {
				email: email,
				emailVerified: true,
			}),
			...(channel === constVar.PHONE_PROP && {
				phone: phone,
				phoneVerified: true,
			}),

			verified: verified,
		};

		return axiosPromise
			.getPromise(axiosPromise.signupPromise(signupSubmitInfo))
			.then(() => {
				// clear sign up info
				dispatchPromise.patchSignupUserInfo({}, true);
				sessionStorage.removeItem(constVar.THAINOW_USER_SIGN_UP_OBJ);

				// save sign in info
				dispatchPromise.patchSigninUserInfo(
					{
						[`${constVar.SIGNIN_METHOD_PROP}`]: channel,
						[`${constVar.EMAIL_PROP}`]: email,
						[`${constVar.PHONE_PROP}`]: phone,
						[`${constVar.PASSWORD_PROP}`]: password,
						[`${constVar.USERNAME_PROP}`]: username,
					},
					true
				);

				navigate("/signup/success", {
					state: {
						continue: continueURL,
					},
				});
			});
	};

	const onSubmitStep_1_HandlerPromise = async () => {
		// get signup object from redux store
		const signupInfo =
			dispatchPromise.getState()[`${constVar.THAINOW_USER_SIGN_UP_OBJ}`];

		const {
			[`${constVar.USERNAME_PROP}`]: username = "",
			[`${constVar.PASSWORD_VALIDATION}`]: isValidPassword = false,
			// [`${constVar.ADDRESS_PROP}`]: { description = "", placeid = "" } = {},
		} = signupInfo;

		if (!isValidPassword) return submitErrorHandler("Invalid Password");
		// else if (description.length === 0 || placeid.length === 0)
		// 	return submitErrorHandler("Invalid Location");
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
			// signupHandler(true);
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
		<OffCanvasContainer onClose={onCloseHandler}>
			<UserSignup
				stepHandlers={stepHandlers}
				onSelectVerifyMethod={onSelectVerifyMethodHandler}
			/>
		</OffCanvasContainer>
	);
	return app;
}

export default UserSignupContainer;

import { useNavigate, useSearchParams } from "react-router-dom";
import * as axiosPromise from "../../Axios/axiosPromise";
import ClassicSignup from "../../Component/Signup/ClassicSignup";
import * as dispatchPromise from "../../redux-store/dispatchPromise";
import * as constVar from "../../Util/ConstVar";

function ClassicSignupContainer() {
	const navigate = useNavigate();

	let [searchParams] = useSearchParams();

	const continueUrl = searchParams.get("continue") || "/";

	const continueParams =
		continueUrl.length > 0 ? "?continue=" + continueUrl : "";

	const storageObjName = constVar.THAINOW_USER_SIGN_UP_OBJ;

	const submitErrorHandler = (message = "") =>
		dispatchPromise.submitErrorHandlerPromise(message);

	const validateEmailHandler = (email = "") =>
		axiosPromise.getPromise(axiosPromise.validateEmailPromise(email));

	const validatePhoneHandler = (phone = "") =>
		axiosPromise.getPromise(axiosPromise.validatePhonePromise(phone));

	const sendOtpCodeHandler = (channel = "", value = "") =>
		axiosPromise.getPromise(axiosPromise.sendOtpCodeAxios(channel, value));

	const verifyOtpCodeHandler = (channel = "", value = "", token = "") =>
		axiosPromise.getPromise(
			axiosPromise.verifyOtpCodePromise(channel, value, token)
		);

	const signupHandler = (signupInfo = {}, role = "") =>
		axiosPromise
			.getPromise(axiosPromise.signupPromise(signupInfo, role))
			.then(() => {
				sessionStorage.removeItem(storageObjName);
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

	const onCloseHandler = () => {
		sessionStorage.removeItem(storageObjName);
		navigate(continueUrl);
	};

	const onBackHandlerPromise = (onBackHandler = () => {}) => {
		return new Promise((resolve, _) => {
			onBackHandler();
			resolve();
		});
	};

	const onSubmitStep_1_HandlerPromise = async () => {
		// get signup object from redux store
		let signupInfo = dispatchPromise.getState()[`${storageObjName}`];

		const { description = "", placeid = "" } =
			signupInfo[`${constVar.ADDRESS_PROP}`] || {};

		const isValidPassword =
			signupInfo[`${constVar.PASSWORD_VALIDATION}`] || false;

		if (description.length === 0 || placeid.length === 0)
			return submitErrorHandler("Invalid Location");
		else if (!isValidPassword) return submitErrorHandler("Invalid Password!");
		else {
			return true;
		}
	};

	const onSelectVerifyMethodHandler = (channel = "") => {
		dispatchPromise.patchSignupUserInfoPromise({
			[`${constVar.VERIFICATION_METHOD_PROP}`]:
				channel === constVar.EMAIL_PROP
					? constVar.EMAIL_PROP
					: channel === constVar.PHONE_PROP
					? constVar.PHONE_PROP
					: "",
		});
	};

	const onSubmitStep_3_HandlerPromise = async () => {
		// get signup object from redux store
		let signupInfo = dispatchPromise.getState()[`${storageObjName}`];

		const verifyOption =
			signupInfo[`${constVar.VERIFICATION_METHOD_PROP}`] || "";

		switch (verifyOption) {
			// verify by email
			case constVar.EMAIL_PROP: {
				const email = signupInfo[`${constVar.EMAIL_PROP}`] || "";
				const isValidEmail =
					signupInfo[`${constVar.EMAIL_VALIDATION}`] || false;

				if (email.length === 0 || !isValidEmail) {
					return submitErrorHandler(
						"Invalid Email! Please provide or add a valid email address."
					);
				} else {
					return validateEmailHandler(email).then(() =>
						sendOtpCodeHandler("email", email)
					);
				}
			}

			// verify by sms
			case constVar.PHONE_PROP: {
				const phone = signupInfo[`${constVar.PHONE_PROP}`] || "";
				const isValidPhone =
					signupInfo[`${constVar.PHONE_VALIDATION}`] || false;

				if (phone.length === 0 || !isValidPhone) {
					return submitErrorHandler(
						"Invalid Phone! Please provide or add a valid phone number."
					);
				} else {
					return validatePhoneHandler(phone).then(() =>
						sendOtpCodeHandler("sms", phone)
					);
				}
			}

			default:
				return submitErrorHandler(
					"Sorry, the request failed. Please try again later."
				);
		}
	};

	const onResetOtpHandler = () => {
		console.log("reset otp");
		dispatchPromise.patchSignupUserInfoPromise({
			[`${constVar.OTP_PROP}`]: "",
			[`${constVar.OTP_VALIDATION}`]: false,
		});
	};

	const onSubmitStep_4_HandlerPromise = async () => {
		// get signup object from redux store
		let signupInfo = dispatchPromise.getState()[`${storageObjName}`];

		const isValidOtp = signupInfo[`${constVar.OTP_VALIDATION}`] || false;

		const otp = signupInfo[`${constVar.OTP_PROP}`].replace(/[^\d]/g, "") || "";

		if (otp.length !== 4 || !isValidOtp)
			return submitErrorHandler("Invalid Code");
		else {
			const verifyOption =
				signupInfo[`${constVar.VERIFICATION_METHOD_PROP}`] || "";

			const [channel, value] =
				verifyOption === constVar.EMAIL_PROP
					? ["email", signupInfo[`${constVar.EMAIL_PROP}`] || ""]
					: verifyOption === constVar.PHONE_PROP
					? ["sms", signupInfo[`${constVar.PHONE_PROP}`] || ""]
					: ["", ""];

			return verifyOtpCodeHandler(channel, value, otp).then(() =>
				signupHandler(signupInfo, "CLASSIC")
			);
		}
	};
	const stepHandlers = [
		{
			step: 1,
			onStepHandlerPromise: onSubmitStep_1_HandlerPromise,
			callBack: () => {},
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
		<ClassicSignup
			storageObjName={storageObjName}
			stepHandlers={stepHandlers}
			onClose={onCloseHandler}
			onBackHandlerPromise={onBackHandlerPromise}
			onSelectVerifyMethod={onSelectVerifyMethodHandler}
			onResetOtp={onResetOtpHandler}
		/>
	);

	return app;
}

export default ClassicSignupContainer;

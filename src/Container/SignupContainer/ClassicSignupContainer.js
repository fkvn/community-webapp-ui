import { useNavigate, useSearchParams } from "react-router-dom";
import * as axiosPromise from "../../Axios/axiosPromise";
import ClassicSignup from "../../Component/Signup/ClassicSignup";
import * as dispatchPromise from "../../redux-store/dispatchPromise";
import * as constVar from "../../Util/ConstVar";

function ClassicSignupContainer() {
	const navigate = useNavigate();

	let [searchParams] = useSearchParams();

	const continueURL = searchParams.get("continue") || "/";

	const continueParams =
		continueURL.length > 0 ? "?continue=" + continueURL : "";

	const storageObjName = constVar.THAINOW_USER_SIGN_UP_STORAGE_OBJ;

	const submitErrorHandler = (message = "") =>
		dispatchPromise.submitErrorHandler(message);

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

	const signupHandler = (signupInfo = {}, role = "") =>
		axiosPromise
			.getPromise(axiosPromise.signupPromise(signupInfo, role))
			.then(() => {
				sessionStorage.removeItem(storageObjName);
				navigate("/signup/success" + continueParams, {
					state: {
						channel:
							signupInfo[`${constVar.STORAGE_VERIFICATION_METHOD_PROP}`] || "",
						email: signupInfo[`${constVar.STORAGE_EMAIL_PROP}`] || "",
						phone: signupInfo[`${constVar.STORAGE_PHONE_PROP}`] || "",
						password: signupInfo[`${constVar.STORAGE_PASSWORD_PROP}`] || "",
						username: signupInfo[`${constVar.STORAGE_USERNAME_PROP}`] || "",
					},
				});
				return new Promise((resolve, _) => resolve());
			})
			.catch(() => {
				return new Promise((_, reject) => reject());
			});

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
		let signupInfo = dispatchPromise.getState()[`${storageObjName}`];

		const { description = "", placeid = "" } =
			signupInfo[`${constVar.STORAGE_ADDRESS_PROP}`] || {};

		const isValidPassword =
			signupInfo[`${constVar.STORAGE_PASSWORD_VALIDATION}`] || false;

		if (description.length === 0 || placeid.length === 0)
			return submitErrorHandler("Invalid Location");
		else if (!isValidPassword) return submitErrorHandler("Invalid Password!");
		else {
			return true;
		}
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

	const onSubmitStep_3_HandlerPromise = async () => {
		// get signup object from redux store
		let signupInfo = dispatchPromise.getState()[`${storageObjName}`];

		const verifyOption =
			signupInfo[`${constVar.STORAGE_VERIFICATION_METHOD_PROP}`] || "";

		switch (verifyOption) {
			// verify by email
			case constVar.STORAGE_EMAIL_PROP: {
				const email = signupInfo[`${constVar.STORAGE_EMAIL_PROP}`] || "";
				const isValidEmail =
					signupInfo[`${constVar.STORAGE_EMAIL_VALIDATION}`] || false;

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
			case constVar.STORAGE_PHONE_PROP: {
				const phone = signupInfo[`${constVar.STORAGE_PHONE_PROP}`] || "";
				const isValidPhone =
					signupInfo[`${constVar.STORAGE_PHONE_VALIDATION}`] || false;

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
		dispatchPromise.patchSignupUserInfo({
			[`${constVar.STORAGE_OTP_PROP}`]: "",
			[`${constVar.STORAGE_OTP_VALIDATION}`]: false,
		});
	};

	const onSubmitStep_4_HandlerPromise = async () => {
		// get signup object from redux store
		let signupInfo = dispatchPromise.getState()[`${storageObjName}`];

		const isValidOtp =
			signupInfo[`${constVar.STORAGE_OTP_VALIDATION}`] || false;

		const otp =
			signupInfo[`${constVar.STORAGE_OTP_PROP}`].replace(/[^\d]/g, "") || "";

		if (otp.length !== 4 || !isValidOtp)
			return submitErrorHandler("Invalid Code");
		else {
			const verifyOption =
				signupInfo[`${constVar.STORAGE_VERIFICATION_METHOD_PROP}`] || "";

			const [channel, value] =
				verifyOption === constVar.STORAGE_EMAIL_PROP
					? ["email", signupInfo[`${constVar.STORAGE_EMAIL_PROP}`] || ""]
					: verifyOption === constVar.STORAGE_PHONE_PROP
					? ["sms", signupInfo[`${constVar.STORAGE_PHONE_PROP}`] || ""]
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

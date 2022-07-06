import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as axiosPromise from "../Axios/axiosPromise";
import Signin from "../Component/Login/Signin";
import * as dispatchPromise from "../redux-store/dispatchPromise";
import * as constVar from "../Util/ConstVar";

function LoginContainer({ user = {} }) {
	const navigate = useNavigate();

	let [searchParams] = useSearchParams();

	const continueURL = searchParams.get("continue") || "/";

	useEffect(() => {
		if (JSON.stringify(user) !== "{}") navigate("/");
	});

	const onCloseHandler = () => {
		console.log("closing");
		dispatchPromise.patchSigninUserInfo({}, true);
		sessionStorage.removeItem(constVar.THAINOW_USER_SIGN_IN_STORAGE_OBJ);
		navigate(continueURL, { replace: true });
	};

	const onSelectVerifyMethodHandler = (channel = "") => {
		dispatchPromise.patchSigninUserInfo({
			[`${constVar.STORAGE_SIGNIN_METHOD_PROP}`]:
				channel === constVar.STORAGE_EMAIL_PROP
					? constVar.STORAGE_EMAIL_PROP
					: channel === constVar.STORAGE_PHONE_PROP
					? constVar.STORAGE_PHONE_PROP
					: "",
		});
	};

	const loginHanlder = () => {
		// get signin object from redux store
		const signinInfo =
			dispatchPromise.getState()[
				`${constVar.THAINOW_USER_SIGN_IN_STORAGE_OBJ}`
			];

		const {
			[`${constVar.STORAGE_SIGNIN_METHOD_PROP}`]: channel = "",
			[`${constVar.STORAGE_EMAIL_PROP}`]: email = "",
			[`${constVar.STORAGE_PHONE_PROP}`]: phone = "",
			[`${constVar.STORAGE_PASSWORD_PROP}`]: password = "",
		} = signinInfo;

		axiosPromise
			.getPromise(axiosPromise.loginPromise(channel, email, phone, password))
			.then(() => {
				navigate(continueURL, { replace: true });
			});
	};

	const onSubmitStep_1_HandlerPromise = async () => {
		return loginHanlder();
	};

	const stepHandlers = [
		{
			step: 1,
			onStepHandlerPromise: onSubmitStep_1_HandlerPromise,
		},
	];

	const app = (
		<Signin
			stepHandlers={stepHandlers}
			onClose={onCloseHandler}
			onSelectVerifyMethod={onSelectVerifyMethodHandler}
		/>
	);

	return app;
}

export default LoginContainer;

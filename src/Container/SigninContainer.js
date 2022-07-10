import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as axiosPromise from "../Axios/axiosPromise";
import Signin from "../Component/Login/Signin";
import * as dispatchPromise from "../redux-store/dispatchPromise";
import * as constVar from "../Util/ConstVar";
import OffCanvasContainer from "./OffCanvasContainer";

function SigninContainer() {
	const navigate = useNavigate();

	const location = useLocation();

	const continueURL = location?.state?.continue || "/";

	const profile = useSelector(
		(state) => state.thainowReducer[`${constVar.THAINOW_PROFILE_OBJ}`] || {}
	);

	useEffect(() => {
		if (JSON.stringify(profile) !== "{}") navigate(continueURL);

		dispatchPromise.patchOffCanvasInfo({
			[`${constVar.SHOW_OFF_CANVAS}`]: true,
		});
	});

	const signinMethod = useSelector(
		(state) =>
			state.thainowReducer[`${constVar.THAINOW_USER_SIGN_IN_OBJ}`]?.[
				`${constVar.SIGNIN_METHOD_PROP}`
			] || ""
	);

	const onSelectSigninMethodHandler = (channel = "") => {
		dispatchPromise.patchSigninUserInfo({
			[`${constVar.SIGNIN_METHOD_PROP}`]:
				channel === constVar.EMAIL_PROP
					? constVar.EMAIL_PROP
					: channel === constVar.PHONE_PROP
					? constVar.PHONE_PROP
					: "",
		});
	};

	const onCloseHandler = () => {
		dispatchPromise.patchSigninUserInfo(
			{
				[`${constVar.SIGNIN_METHOD_PROP}`]: constVar.EMAIL_PROP,
			},
			true
		);
		sessionStorage.removeItem(constVar.THAINOW_USER_SIGN_IN_OBJ);
		navigate(continueURL);
	};

	const loginHanlder = () => {
		// get signin object from redux store
		const signinInfo =
			dispatchPromise.getState()[`${constVar.THAINOW_USER_SIGN_IN_OBJ}`];

		const {
			[`${constVar.SIGNIN_METHOD_PROP}`]: channel = "",
			[`${constVar.EMAIL_PROP}`]: email = "",
			[`${constVar.PHONE_PROP}`]: phone = "",
			[`${constVar.PASSWORD_PROP}`]: password = "",
		} = signinInfo;

		axiosPromise
			.getPromise(axiosPromise.loginPromise(channel, email, phone, password))
			.then((userInfo = {}) => {
				// get the current users
				const userStorageInfo = JSON.parse(
					localStorage.getItem(constVar.THAINOW_USER_OBJ) || "[]"
				);

				// add new user to storage
				localStorage.setItem(
					constVar.THAINOW_USER_OBJ,
					JSON.stringify([...userStorageInfo, { ...userInfo }])
				);

				// save profile to new user
				localStorage.setItem(
					constVar.THAINOW_PROFILE_OBJ,
					JSON.stringify({
						[`${constVar.PROFILE_TYPE_PROP}`]: constVar.PROFILE_USER_TYPE_PROP,
						[`${constVar.USER_PROP}`]: userInfo.user,
						[`${constVar.COMPANY_LIST}`]: userInfo.companies,
					})
				);

				// remove signin info in redux-store
				dispatchPromise.patchSigninUserInfo(
					{
						[`${constVar.SIGNIN_METHOD_PROP}`]: constVar.EMAIL_PROP,
					},
					true
				);

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
		<OffCanvasContainer onClose={onCloseHandler}>
			<Signin
				stepHandlers={stepHandlers}
				// onClose={onCloseHandler}
				signinMethod={signinMethod}
				onSelectSigninMethod={onSelectSigninMethodHandler}
			/>
		</OffCanvasContainer>
	);

	return app;
}

export default SigninContainer;

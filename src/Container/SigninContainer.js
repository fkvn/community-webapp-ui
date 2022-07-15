import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as axiosPromise from "../Axios/axiosPromise";
import Signin from "../Component/Login/Signin";
import * as dispatchPromise from "../redux-store/dispatchPromise";
import * as constVar from "../Util/ConstVar";
import * as util from "../Util/Util";
import OffCanvasContainer from "./OffCanvasContainer";

function SigninContainer() {
	const navigate = useNavigate();

	const location = useLocation();

	const continueURL = location?.state?.continue || "/";

	const loginDirect = location.state?.loginDirect || false;

	const profile = useSelector(
		(state) => state.thainowReducer[`${constVar.THAINOW_PROFILE_OBJ}`] || {}
	);

	const showOffCanvas = useSelector(
		(state) =>
			state.thainowReducer[`${constVar.THAINOW_OFF_CANVAS_OBJ}`]?.[
				`${constVar.SHOW_OFF_CANVAS}`
			] || false
	);

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

	const loginHanlder = async () => {
		// get signin object from redux store
		const signinInfo =
			dispatchPromise.getState()[`${constVar.THAINOW_USER_SIGN_IN_OBJ}`];

		const {
			[`${constVar.SIGNIN_METHOD_PROP}`]: channel = "",
			[`${constVar.EMAIL_PROP}`]: email = "",
			[`${constVar.PHONE_PROP}`]: phone = "",
			[`${constVar.PASSWORD_PROP}`]: password = "",
		} = signinInfo;

		return axiosPromise
			.getPromise(axiosPromise.loginPromise(channel, email, phone, password))
			.then((userInfo) => {
				// remove signin info in session
				sessionStorage.removeItem(constVar.THAINOW_USER_SIGN_IN_OBJ);

				// remove signin info in redux-store
				dispatchPromise.patchSigninUserInfo(
					{
						[`${constVar.SIGNIN_METHOD_PROP}`]: constVar.EMAIL_PROP,
					},
					true
				);

				// get the sign in list
				const recentSignin = JSON.parse(
					localStorage.getItem(constVar.THAINOW_RECENT_SIGN_IN_OBJ) || "{}"
				);
				// add new user to sign in list
				localStorage.setItem(
					constVar.THAINOW_RECENT_SIGN_IN_OBJ,
					JSON.stringify({
						...recentSignin,
						[`${userInfo.user.id}`]: { ...userInfo },
					})
				);

				// set current user to storage
				localStorage.setItem(
					constVar.THAINOW_USER_OBJ,
					JSON.stringify({ ...userInfo })
				);

				// save profile to new user
				localStorage.setItem(
					constVar.THAINOW_PROFILE_OBJ,
					JSON.stringify(
						util.patchProfileInfo(
							constVar.PROFILE_USER_TYPE_PROP,
							userInfo.user
						)
					)
				);

				navigate(continueURL, { replace: true });
			});
	};

	useEffect(() => {
		if (JSON.stringify(profile) !== "{}") navigate(continueURL);

		if (!showOffCanvas) {
			dispatchPromise.patchOffCanvasInfo({
				[`${constVar.SHOW_OFF_CANVAS}`]: true,
			});
		}
	});

	// don't put the loginHanlder in dependency because it will cause re-render again
	useEffect(() => {
		if (loginDirect) loginHanlder();
	}, [loginDirect]);

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
			{!loginDirect ? (
				<Signin
					stepHandlers={stepHandlers}
					signinMethod={signinMethod}
					onSelectSigninMethod={onSelectSigninMethodHandler}
				/>
			) : (
				<div className="tedkvn-center h-100 position-relative">
					<div>
						<Spinner animation="border" role="status" />
					</div>
					<div className="mx-4">
						Signing in...
						<span className="text-danger">
							{" "}
							Please come back later if having any erros or taking too long!
						</span>
					</div>
				</div>
			)}
		</OffCanvasContainer>
	);

	return app;
}

export default SigninContainer;

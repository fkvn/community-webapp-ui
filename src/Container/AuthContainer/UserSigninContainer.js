import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import UserSignin from "../../Component/UserSignin/UserSignin";
import {
	getState,
	patchOffCanvasInfoPromise,
	submitErrorHandlerPromise,
} from "../../redux-store/dispatchPromise";
import {
	EMAIL_PROP,
	PHONE_VALIDATION,
	SHOW_OFF_CANVAS,
	THAINOW_OFF_CANVAS_OBJ,
	THAINOW_USER_OBJ,
	THAINOW_USER_SIGN_IN_OBJ,
} from "../../Util/ConstVar";
import { removeUserSigninInfo, signInUserPromise } from "../../Util/Util";
import OffCanvasContainer from "../OffCanvasContainer";

function UserSigninContainer() {
	/* Description 
	
		When sign in the following information must be save:

		1. Storage.user {access_token, {...user}}
		2. Storage.profile {type, id, name, profileUrl }		
	
	*/

	const navigate = useNavigate();

	const location = useLocation();

	const continueURL = location?.state?.continue || "/";

	const showOffCanvas = useSelector(
		(state) =>
			state.thainowReducer[`${THAINOW_OFF_CANVAS_OBJ}`]?.[
				`${SHOW_OFF_CANVAS}`
			] || false
	);

	const [signinMethod, setSigninMethod] = useState(EMAIL_PROP);

	const onCloseHandler = () => {
		removeUserSigninInfo();
		navigate(continueURL);
	};

	const signinHanlder = async () => {
		return signInUserPromise(signinMethod).then(() => {
			navigate(continueURL);
		});
	};

	useEffect(() => {
		const storageUser =
			JSON.parse(localStorage.getItem(THAINOW_USER_OBJ)) || {};

		if (JSON.stringify(storageUser) !== "{}") navigate(continueURL);

		if (!showOffCanvas) {
			patchOffCanvasInfoPromise({
				[`${SHOW_OFF_CANVAS}`]: true,
			});
		}
	});

	const onSubmitStep_1_HandlerPromise = async () => {
		const signinInfo = getState()[`${THAINOW_USER_SIGN_IN_OBJ}`];

		const { [`${PHONE_VALIDATION}`]: isValidPhone = false } = signinInfo;

		if (!isValidPhone) {
			return submitErrorHandlerPromise("Invalid Phone");
		} else {
			return signinHanlder(signinMethod);
		}
	};

	const stepHandlers = [
		{
			step: 1,
			onStepHandlerPromise: onSubmitStep_1_HandlerPromise,
		},
	];

	const app = (
		<OffCanvasContainer onClose={onCloseHandler}>
			<UserSignin
				stepHandlers={stepHandlers}
				signinMethod={signinMethod}
				onSelectSigninMethod={setSigninMethod}
			/>
		</OffCanvasContainer>
	);

	return app;
}

export default UserSigninContainer;

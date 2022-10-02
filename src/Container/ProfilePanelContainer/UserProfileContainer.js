import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
	patchOffCanvasInfoPromise,
	patchUserProfileInfoPromise,
} from "../../redux-store/dispatchPromise";
import {
	SHOW_OFF_CANVAS,
	THAINOW_OFF_CANVAS_OBJ,
	THAINOW_USER_PROFILE_OBJ,
} from "../../Util/ConstVar";
import OffCanvasContainer from "../OffCanvasContainer";

function UserProfileContainer() {
	const navigate = useNavigate();
	const location = useLocation();

	const continueUrl = location.state?.continue || "/";

	const showOffCanvas = useSelector(
		(state) =>
			state.thainowReducer[`${THAINOW_OFF_CANVAS_OBJ}`]?.[
				`${SHOW_OFF_CANVAS}`
			] || false
	);

	useEffect(() => {
		if (!showOffCanvas) {
			patchOffCanvasInfoPromise({
				[`${SHOW_OFF_CANVAS}`]: true,
			});
		}
	}, [showOffCanvas]);

	const onCloseHandler = () => {
		patchUserProfileInfoPromise({}, true);
		sessionStorage.removeItem(THAINOW_USER_PROFILE_OBJ);
		navigate(continueUrl, { replace: true });
	};

	const app = (
		<OffCanvasContainer onClose={onCloseHandler}></OffCanvasContainer>
	);
	return app;
}

export default UserProfileContainer;

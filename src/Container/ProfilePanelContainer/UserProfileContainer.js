import { useEffect } from "react";
import { useSelector } from "react-redux";
import { patchOffCanvasInfo } from "../../redux-store/dispatchPromise";
import { SHOW_OFF_CANVAS, THAINOW_OFF_CANVAS_OBJ } from "../../Util/ConstVar";

function UserProfileContainer() {
	const showOffCanvas = useSelector(
		(state) =>
			state.thainowReducer[`${THAINOW_OFF_CANVAS_OBJ}`]?.[
				`${SHOW_OFF_CANVAS}`
			] || false
	);

	useEffect(() => {
		if (!showOffCanvas) {
			patchOffCanvasInfo({
				[`${SHOW_OFF_CANVAS}`]: true,
			});
		}
	}, [showOffCanvas]);

	const app = <></>;
	return app;
}

export default UserProfileContainer;

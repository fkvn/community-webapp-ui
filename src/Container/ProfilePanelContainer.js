import { useSelector } from "react-redux";
import ProfilePanel from "../Component/ProfilePanel/ProfilePanel";
import * as dispatchPromise from "../redux-store/dispatchPromise";
import * as constVar from "../Util/ConstVar";

function ProfilePanelContainer() {
	const profile = useSelector(
		(state) => state.thainowReducer[`${constVar.THAINOW_PROFILE_OBJ}`] || {}
	);

	console.log(profile);

	const showOffCanvasHandler = () => {
		dispatchPromise.patchOffCanvasInfo({
			[`${constVar.SHOW_OFF_CANVAS}`]: true,
		});
	};

	const app = (
		<ProfilePanel {...profile} showOffCanvas={showOffCanvasHandler} />
	);
	return app;
}

export default ProfilePanelContainer;

import { useSelector } from "react-redux";
import ProfilePanel from "../Component/ProfilePanel/ProfilePanel";
import * as constVar from "../Util/ConstVar";

function ProfilePanelContainer() {
	const profile = useSelector(
		(state) => state.thainowReducer[`${constVar.THAINOW_PROFILE_OBJ}`] || {}
	);

	const app = <ProfilePanel {...profile} />;
	return app;
}

export default ProfilePanelContainer;

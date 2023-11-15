import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProfilePanel from "../../Component/ProfilePanel/ProfilePanel";
import * as dispatchPromise from "../../redux-store/dispatchPromise";
import * as constVar from "../../Util/ConstVar";

function UserProfilePanelContainer() {
	const profile = useSelector(
		(state) => state.thainowReducer[`${constVar.THAINOW_PROFILE_OBJ}`] || {}
	);

	useEffect(() => {
		const storageProfile =
			JSON.parse(localStorage.getItem(constVar.THAINOW_PROFILE_OBJ)) || {};

		if (
			JSON.stringify(storageProfile) !== "{}" &&
			JSON.stringify(profile) === "{}"
		) {
			dispatchPromise.patchProfileInfo({ ...storageProfile }, true);
		}
	});

	const isSignedIn =
		(JSON.stringify(profile) !== "{}" &&
			profile?.[`${constVar.PROFILE_TYPE_PROP}`] ===
				constVar.PROFILE_USER_TYPE_PROP) ||
		false;

	const app = <ProfilePanel isSignedIn={isSignedIn} {...profile} />;
	return app;
}

export default UserProfilePanelContainer;

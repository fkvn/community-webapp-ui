import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProfilePanel from "../Component/ProfilePanel/ProfilePanel";
import * as dispatchPromise from "../redux-store/dispatchPromise";
import * as constVar from "../Util/ConstVar";

function ProfilePanelContainer() {
	const profile = useSelector(
		(state) => state.thainowReducer[`${constVar.THAINOW_PROFILE_OBJ}`] || {}
	);

	useEffect(() => {
		const storageProfile =
			JSON.parse(localStorage.getItem(constVar.THAINOW_PROFILE_OBJ)) || {};

		console.log(storageProfile);

		if (
			JSON.stringify(storageProfile) !== "{}" &&
			JSON.stringify(profile) === "{}"
		) {
			dispatchPromise.patchProfileInfo({ ...storageProfile }, true);
		}
	});

	const showOffCanvasHandler = () => {
		dispatchPromise.patchOffCanvasInfo({
			[`${constVar.SHOW_OFF_CANVAS}`]: true,
		});
	};

	console.log(profile);

	const app = (
		<ProfilePanel {...profile} showOffCanvas={showOffCanvasHandler} />
	);
	return app;
}

export default ProfilePanelContainer;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfilePanel from "../../Component/ProfilePanel/ProfilePanel";
import { patchProfileInfo } from "../../redux-store/dispatchPromise";
import * as constVar from "../../Util/ConstVar";

function ProfilePanelContainer() {
	// const profileType =
	// 	JSON.parse(localStorage.getItem(constVar.THAINOW_PROFILE_OBJ || {}))?.[
	// 		`${constVar.PROFILE_TYPE_PROP}`
	// 	] || "";

	const profile = useSelector(
		(state) => state.thainowReducer[`${constVar.THAINOW_PROFILE_OBJ}`] || {}
	);

	const [isSignedIn, setIsSignedIn] = useState(false);

	useEffect(() => {
		const storageProfile =
			JSON.parse(localStorage.getItem(constVar.THAINOW_PROFILE_OBJ)) || {};

		if (
			JSON.stringify(storageProfile) !== "{}" &&
			JSON.stringify(profile) === "{}"
		) {
			patchProfileInfo({ ...storageProfile }, true);
		} else {
			const profileType = profile?.[`${constVar.PROFILE_TYPE_PROP}`] || "";
			console.log(profile?.[`${constVar.PROFILE_TYPE_PROP}`]);
			console.log(
				profile?.[`${constVar.PROFILE_TYPE_PROP}`] ===
					(constVar.PROFILE_USER_TYPE_PROP ||
						constVar.PROFILE_COMPANY_TYPE_PROP)
			);
			setIsSignedIn(
				profileType === constVar.PROFILE_USER_TYPE_PROP ||
					profileType === constVar.PROFILE_COMPANY_TYPE_PROP
			);
		}
	});

	console.log(isSignedIn);

	const app = (
		<>
			<ProfilePanel isSignedIn={isSignedIn} {...profile} />
			{/* {profileType === constVar.PROFILE_USER_TYPE_PROP && (
				<UserProfilePanelContainer />
			)}

			{profileType === constVar.PROFILE_COMPANY_TYPE_PROP && <></>}

			{profileType === "" && <ProfilePanel />} */}
		</>
	);

	return app;
}

export default ProfilePanelContainer;

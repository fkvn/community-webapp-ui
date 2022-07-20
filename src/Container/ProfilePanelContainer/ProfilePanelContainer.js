import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { uploadProfileAvatar } from "../../Axios/axiosPromise";
import ProfilePanel from "../../Component/ProfilePanel/ProfilePanel";
import {
	patchProfileInfo,
	patchUserInfo,
} from "../../redux-store/dispatchPromise";
import * as constVar from "../../Util/ConstVar";

function ProfilePanelContainer() {
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
			setIsSignedIn(
				JSON.stringify(profile) !== "{}" &&
					(profileType === constVar.PROFILE_USER_TYPE_PROP ||
						profileType === constVar.PROFILE_COMPANY_TYPE_PROP)
			);
		}
	});

	const uploadPhotoOnClickHanlder = async (formData = FormData()) => {
		return uploadProfileAvatar(
			profile[`${constVar.PROFILE_TYPE_PROP}`],
			profile[`${constVar.ID_PROP}`],
			formData
		).then(({ data: response }) => {
			const updatedProfile = {
				...profile,
				[`${constVar.PROFILE_URL_PROP}`]: response,
			};

			// profile redux
			patchProfileInfo({ ...updatedProfile });

			// profile update storage
			localStorage.setItem(
				constVar.THAINOW_PROFILE_OBJ,
				JSON.stringify(updatedProfile)
			);

			// user update profile
			if (
				profile[`${constVar.PROFILE_TYPE_PROP}`] ===
				constVar.PROFILE_USER_TYPE_PROP
			) {
				let storageUser = {
					...JSON.parse(localStorage.getItem(constVar.THAINOW_USER_OBJ) || {}),
				};

				storageUser.user = {
					...storageUser?.user,
					[`${constVar.PROFILE_URL_PROP}`]: response,
				};

				// user redux
				patchUserInfo({ ...storageUser.user });

				// user storage
				localStorage.setItem(
					constVar.THAINOW_USER_OBJ,
					JSON.stringify(storageUser)
				);
			}
		});
	};

	const app = (
		<>
			<ProfilePanel
				isSignedIn={isSignedIn}
				{...profile}
				uploadPhotoOnClick={uploadPhotoOnClickHanlder}
			/>
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

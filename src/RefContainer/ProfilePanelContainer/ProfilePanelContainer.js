import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { uploadProfileAvatar } from "../../Axios/axiosPromise";
import ProfilePanel from "../../Component/ProfilePanel/ProfilePanel";
import * as constVar from "../../Util/ConstVar";
import { saveProfileInfo } from "../../Util/RefUtil";
import { patchProfileInfoPromise } from "../../redux-store/dispatchPromise";

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
			patchProfileInfoPromise({ ...storageProfile }, true);
		} else {
			const profileType = profile?.[`${constVar.PROFILE_TYPE_PROP}`] || "";
			setIsSignedIn(
				JSON.stringify(profile) !== "{}" &&
					(profileType === constVar.PROFILE_USER_TYPE_PROP ||
						profileType === constVar.PROFILE_COMPANY_TYPE_PROP)
			);
		}
	}, [profile]);

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
			patchProfileInfoPromise({ ...updatedProfile });

			// profile update storage
			saveProfileInfo({ ...profile }, false);

			// user update profile
			if (
				profile[`${constVar.PROFILE_TYPE_PROP}`] ===
				constVar.PROFILE_USER_TYPE_PROP
			) {
				const updatedStorageUser = {
					...JSON.parse(localStorage.getItem(constVar.THAINOW_USER_OBJ) || {}),
					[`${constVar.PROFILE_URL_PROP}`]: response,
				};

				// user storage
				localStorage.setItem(
					constVar.THAINOW_USER_OBJ,
					JSON.stringify(updatedStorageUser)
				);
			}

			return Promise.resolve();
		});
	};

	const app = (
		<>
			<ProfilePanel
				isSignedIn={isSignedIn}
				{...profile}
				uploadPhotoOnClick={uploadPhotoOnClickHanlder}
			/>
		</>
	);

	return app;
}

export default ProfilePanelContainer;

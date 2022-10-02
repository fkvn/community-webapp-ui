import { useEffect, useState } from "react";
import { findProfilesAxios } from "../../Axios/axiosPromise";
import usePageHeader from "../../Component/Hook/FormHook/usePageheader";
import useProfile from "../../Component/Hook/useProfile";
import SwitchProfile from "../../Component/Profile/SwitchProfile";
import { isObjectEmpty } from "../../Util/Util";
import AuthContainer from "./AuthContainer";

function SwitchProfileContainer() {
	const [profiles, setProfiles] = useState([]);

	const [fetchProfiles, setFetchProfiles] = useState(false);

	const fetchProfilesPromise = (user = {}) =>
		findProfilesAxios(user?.id).then((profiles = []) =>
			onRenderProfiles(profiles)
		);

	const onRenderProfiles = (profiles = []) => {
		setFetchProfiles(true);
		setProfiles(profiles);
	};

	const { profile, switchProfile, removeBusinessProfile } = useProfile();

	useEffect(() => {
		if (!fetchProfiles && !isObjectEmpty(profile)) {
			fetchProfilesPromise();
		}
	}, [profile, fetchProfiles, fetchProfilesPromise]);

	useEffect(() => {
		setProfiles(profiles);
	}, [profile]);

	const app = (
		<AuthContainer closeUrl="/switch-profiles" continueUrl="/signin">
			<div id="switch-profiles" className="pb-2">
				{usePageHeader()}
				<SwitchProfile
					profiles={profiles}
					profile={profile}
					switchProfile={switchProfile}
					removeBusinessProfile={removeBusinessProfile}
				/>
			</div>
		</AuthContainer>
	);
	return app;
}

export default SwitchProfileContainer;

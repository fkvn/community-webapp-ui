import ProfilePanel from "../../Component/ProfilePanel/ProfilePanel";
import * as constVar from "../../Util/ConstVar";
import UserProfilePanelContainer from "./UserProfilePanelContainer";

function ProfilePanelContainer() {
	const profileType =
		JSON.parse(localStorage.getItem(constVar.THAINOW_PROFILE_OBJ || {}))?.[
			`${constVar.PROFILE_TYPE_PROP}`
		] || "";

	const app = (
		<>
			{profileType === constVar.PROFILE_USER_TYPE_PROP && (
				<UserProfilePanelContainer />
			)}

			{profileType === constVar.PROFILE_COMPANY_TYPE_PROP && <></>}

			{profileType === "" && <ProfilePanel />}
		</>
	);

	return app;
}

export default ProfilePanelContainer;

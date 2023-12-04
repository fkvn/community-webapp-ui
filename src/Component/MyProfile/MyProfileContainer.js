import { useEffect, useState } from "react";
import useProfile from "../Hook/useProfile";
import MyProfile from "./MyProfile";

function MyProfileContainer() {
	const { profile, findProfileDetail, updateProfile, changeProfileAvatar } =
		useProfile();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (loading)
			findProfileDetail()
				.then(() => setLoading(false))
				.catch(() => {});
	}, [loading]);

	const App = () => (
		<MyProfile
			profile={profile}
			updateProfile={updateProfile}
			changeProfileAvatar={changeProfileAvatar}
		/>
	);

	return !loading ? <App /> : <></>;
}

export default MyProfileContainer;

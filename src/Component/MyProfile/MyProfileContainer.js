import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ID_PROP, USER_REDUCER } from "../../Util/ConstVar";
import useProfile from "../Hook/useProfile";
import MyProfile from "./MyProfile";

function MyProfileContainer() {
	const { profile } = useSelector((state) => state[`${USER_REDUCER}`]);
	const { findProfileDetail, updateProfile, changeProfileAvatar } =
		useProfile();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (loading)
			findProfileDetail(profile[`${ID_PROP}`])
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

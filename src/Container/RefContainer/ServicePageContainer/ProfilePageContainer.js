import { Card, Skeleton } from "antd";
import { isEmptyObject } from "jquery";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useProfile from "../../Component/Hook/useProfile";
import ProfilePage from "../../Component/PageLayout/DetailPage/ProfilePage";
import { ID_PROP, PROFILE_OBJ } from "../../Util/ConstVar";
import { thainowReducer } from "../../redux-store/reducer/thainowReducer";

function ProfilePageContainer() {
	const { id } = useParams();
	const { [`${PROFILE_OBJ}`]: signedProfile = {} } =
		useSelector(thainowReducer);

	const [profile, setProfile] = useState({});

	const { findProfile } = useProfile();

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		findProfile(id).then((res) => setProfile(res));
	}, [id]);

	const skeletonCard = (
		<Card
			cover={
				<div className="custom-center mt-5 " style={{ padding: "0 3.3rem" }}>
					<Skeleton.Avatar shape="circle" size={150} active={true} />
				</div>
			}
			className="m-4 overflow-hidden"
		>
			<Skeleton loading={isEmptyObject(profile)} active />
		</Card>
	);

	const app = (
		<>
			{isEmptyObject(profile) ? (
				skeletonCard
			) : (
				<ProfilePage
					isOwner={profile?.[`${ID_PROP}`] === signedProfile?.[`${ID_PROP}`]}
					profile={profile}
				/>
			)}
		</>
	);
	return app;
}

export default ProfilePageContainer;

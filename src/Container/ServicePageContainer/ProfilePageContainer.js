import { Card, Skeleton } from "antd";
import { isEmptyObject } from "jquery";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findProfileAxios } from "../../Axios/axiosPromise";
import ProfilePage from "../../Component/PageLayout/DetailPage/ProfilePage";
import { thainowReducer } from "../../redux-store/reducer/thainowReducer";
import { ID_PROP, PROFILE_OBJ } from "../../Util/ConstVar";

function ProfilePageContainer() {
	const { id } = useParams();
	const { [`${PROFILE_OBJ}`]: signedProfile = {} } =
		useSelector(thainowReducer);

	const [profile, setProfile] = useState({});

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		findProfileAxios(id).then((res) => setProfile(res));
	}, [id]);

	const skeletonCard = (
		<Card
			cover={
				<div className="tedkvn-center mt-5 " style={{ padding: "0 3.3rem" }}>
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

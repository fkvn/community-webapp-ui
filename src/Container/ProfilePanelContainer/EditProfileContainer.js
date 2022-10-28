import { Card, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findProfileAxios } from "../../Axios/axiosPromise";
import usePageHeader from "../../Component/Hook/FormHook/usePageheader";
import { errorMessage } from "../../Component/Hook/useMessage";
import useUrls from "../../Component/Hook/useUrls";
import EditProfile from "../../Component/Profile/EditProfile";
import { thainowReducer } from "../../redux-store/reducer/thainowReducer";
import { FORWARD_CLOSE, ID_PROP, PROFILE_OBJ } from "../../Util/ConstVar";
import AuthContainer from "../AuthContainer/AuthContainer";

function EditProfileContainer() {
	const { forwardUrl } = useUrls();
	const { id = -1 } = useParams();
	const requestId = id > 0 && Number(id);
	const { [`${ID_PROP}`]: accountId = -1 } =
		useSelector(thainowReducer)?.[`${PROFILE_OBJ}`];

	const [{ loading, ...profile }, setProfile] = useState({
		loading: true,
	});

	useEffect(() => {
		if (
			accountId !== requestId ||
			(!loading && profile?.[`${ID_PROP}`] !== requestId)
		)
			errorMessage("Forbidden Access").catch(() => forwardUrl(FORWARD_CLOSE));
		else if (loading) {
			findProfileAxios(requestId)
				.then((profile = {}) =>
					setProfile({
						loading: false,
						...profile,
					})
				)
				.catch((e) => errorMessage(e));
		}
	});

	const skeletonCard = (
		<Card
			cover={
				<div className="tedkvn-center mt-5 " style={{ padding: "0 3.3rem" }}>
					<Skeleton.Avatar shape="circle" size={150} active={true} />
				</div>
			}
			className="m-4 overflow-hidden"
		>
			<Skeleton loading={profile?.[`${ID_PROP}`] !== requestId} active />
		</Card>
	);

	const header = usePageHeader({
		title: "Edit Profile Information",
		className: "pb-2",
	});

	const app = (
		<AuthContainer
			closeUrl="/"
			continueUrl="/signin"
			successUrl={`/edit-profile/${id}`}
		>
			{profile?.[`${ID_PROP}`] !== requestId ? (
				skeletonCard
			) : (
				<>
					{header}
					<EditProfile profile={profile} />
				</>
			)}
		</AuthContainer>
	);

	return app;
}

export default EditProfileContainer;

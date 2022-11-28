import {
	Avatar,
	Button,
	Card,
	Col,
	Row,
	Skeleton,
	Space,
	Typography,
} from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { imagePlusGray } from "../../Assest/Asset";
import { findProfilesAxios } from "../../Axios/axiosPromise";
import { thainowReducer } from "../../redux-store/reducer/thainowReducer";
import {
	FORWARD_CONTINUE,
	ID_PROP,
	PROFILE_BUSINESS_TYPE_PROP,
	PROFILE_NAME_PROP,
	PROFILE_OBJ,
	PROFILE_PICTURE_PROP,
	PROFILE_STATUS_PROP,
	PROFILE_TYPE_PROP,
	PROFILE_USER_TYPE_PROP,
} from "../../Util/ConstVar";
import { isObjectEmpty } from "../../Util/Util";
import useImage from "../Hook/useImage";
import useProfile from "../Hook/useProfile";
import useUrls from "../Hook/useUrls";
import RemoveProfile from "./RemoveProfile";

function SwitchProfile() {
	const { image } = useImage();

	const { forwardUrl } = useUrls();

	const [profiles, setProfiles] = useState([]);

	const [fetchProfiles, setFetchProfiles] = useState(false);

	const { [`${PROFILE_OBJ}`]: profile = {} } = useSelector(thainowReducer);

	const { switchProfile, removeBusinessProfile, removeAccountProfile } =
		useProfile();

	const fetchProfilesPromise = useCallback(
		() =>
			findProfilesAxios().then((profiles = []) => onRenderProfiles(profiles)),
		[]
	);

	const onRenderProfiles = (profiles = []) => {
		setFetchProfiles(true);
		setProfiles(profiles);
	};

	useEffect(() => {
		if (!fetchProfiles && !isObjectEmpty(profile)) {
			fetchProfilesPromise();
		}
	}, [profile, fetchProfiles, fetchProfilesPromise]);

	useEffect(() => {
		setProfiles(profiles);
	}, [profile, profiles]);

	const normalizeProfiles = (profiles = []) =>
		profiles.reduce(
			([first, ...res], cur) =>
				cur?.id === profile?.id
					? [...(first ? [cur, first] : [cur]), ...res]
					: cur?.[`${PROFILE_TYPE_PROP}`] === PROFILE_USER_TYPE_PROP
					? [...(first ? [first, cur] : [cur]), ...res]
					: [...(first ? [first] : []), ...res, cur],
			[]
		);

	const renderProfiles =
		profiles.length > 0
			? normalizeProfiles(profiles)
			: Array.from({ length: 2 }).map((_) => "default");

	const title = (
		<div className="m-4 text-center">
			<Typography.Title level={2} className="my-5">
				Choose How to interact in{" "}
				<span style={{ color: "#E94833" }}>ThaiNow</span> community
			</Typography.Title>

			<Typography.Text className="text-center" style={{ fontSize: "1rem" }}>
				You will post, comment, and react as your current signed-in profile
				below
			</Typography.Text>
		</div>
	);

	const onRemoveProfile = (profile = {}) => {
		switch (profile?.[`${PROFILE_TYPE_PROP}`]) {
			case PROFILE_USER_TYPE_PROP:
				// return alert(profile?.[`${ID_PROP}`]);
				return removeAccountProfile(profile);
			case PROFILE_BUSINESS_TYPE_PROP:
				// return Promise.resolve();
				return removeBusinessProfile(profile);
			default:
				return Promise.reject("Invalid Request!");
		}
	};

	const app = (
		<Row justify="center">
			<Col xs={24} xl={20}>
				{title}

				<Row justify="space-evenly" className="my-4">
					{renderProfiles.map((renPro, idx) => (
						<Col xs={24} sm={12} lg={8} xxl={6} key={idx}>
							<Card
								cover={
									<Space
										direction="vertical"
										className="tedkvn-center mt-5 "
										style={{ padding: "0 3.3rem", fontSize: "1rem" }}
										gap={1}
									>
										{profiles.length > 0 ? (
											<>
												<Typography.Title level={3} className="text-center">
													{renPro?.[`${PROFILE_TYPE_PROP}`] ===
													PROFILE_USER_TYPE_PROP ? (
														<span className="c-primary"> Account </span>
													) : (
														<span className="c-business">Business</span>
													)}{" "}
													Profile
												</Typography.Title>
												<Avatar
													size={150}
													style={{
														maxWidth: "100%",
													}}
													shape="circle"
													className="border-default my-2"
													src={image({
														width: "100%",
														src: renPro?.info?.[`${PROFILE_PICTURE_PROP}`],
														preview: true,
													})}
													preview={{ visible: false }}
												/>
											</>
										) : (
											<Skeleton.Avatar
												shape="circle"
												size={150}
												active={true}
											/>
										)}
									</Space>
								}
								className="m-4 overflow-hidden"
								actions={
									profiles.length > 0 && [
										<Button
											type="link"
											disabled={
												profile?.id === renPro?.id ||
												(renPro?.[`${PROFILE_TYPE_PROP}`] ===
													PROFILE_BUSINESS_TYPE_PROP &&
													renPro?.info?.[`${PROFILE_STATUS_PROP}`] !==
														"REGISTERED")
											}
											onClick={() => switchProfile(renPro)}
											style={{ fontSize: "1rem" }}
										>
											{profile?.id === renPro?.id
												? "Current Signed-In"
												: "Switch Profile"}
										</Button>,
										<RemoveProfile
											profile={renPro}
											onRemoveProfile={(profile = {}) =>
												onRemoveProfile(profile).then(async () =>
													setProfiles(
														profiles.reduce(
															(res, cur) =>
																cur?.[`${ID_PROP}`] === profile?.[`${ID_PROP}`]
																	? res
																	: [...res, cur],
															[]
														)
													)
												)
											}
										/>,
									]
								}
							>
								<Skeleton loading={profiles.length < 1} active>
									<Meta
										className="text-center tedkvn-center my-3"
										title={
											<Typography.Title level={4}>
												{renPro?.info?.[`${PROFILE_NAME_PROP}`]}
											</Typography.Title>
										}
										description={
											<Typography.Text className="text-muted">
												{renPro?.info?.[`${PROFILE_STATUS_PROP}`]
													? renPro.info[`${PROFILE_STATUS_PROP}`] + " BUSINESS "
													: "PERSONAL PROFILE"}
											</Typography.Text>
										}
									/>
								</Skeleton>
							</Card>
						</Col>
					))}

					{profiles.length < 6 && (
						<Col xs={24} sm={12} lg={8} xxl={6}>
							<Card
								cover={
									<Space
										direction="vertical"
										className="tedkvn-center mt-5 "
										style={{ padding: "0 3.3rem", fontSize: "1rem" }}
										gap={1}
									>
										{profiles.length > 0 ? (
											<>
												<Avatar
													size={150}
													style={{
														maxWidth: "100%",
													}}
													shape="circle"
													className="border-default my-2"
													src={image({
														width: "100%",
														src: imagePlusGray,
														preview: true,
													})}
													preview={{ visible: false }}
												/>
											</>
										) : (
											<Skeleton.Avatar
												shape="circle"
												size={150}
												active={true}
											/>
										)}
									</Space>
								}
								className="m-4 overflow-hidden"
								actions={
									profiles.length > 0 && [
										<Button
											type="link"
											onClick={() =>
												forwardUrl(
													FORWARD_CONTINUE,
													"/switch-profiles",
													"/register/business",
													"/switch-profiles"
												)
											}
											style={{ fontSize: "1rem" }}
										>
											Add Business Profile
										</Button>,
									]
								}
							>
								<Skeleton loading={profiles.length < 1} active>
									<Meta
										className="text-center my-2 p-3"
										description={
											<Typography.Text
												className="text-muted"
												style={{ fontSize: "1rem" }}
											>
												For business owners, host, self-employed, or freelancers
											</Typography.Text>
										}
									/>
								</Skeleton>
							</Card>
						</Col>
					)}
				</Row>
			</Col>
		</Row>
	);

	return app;
}

export default SwitchProfile;

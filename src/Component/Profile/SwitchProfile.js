import { Avatar, Button, Card, Skeleton, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { imagePlusGray } from "../../Assest/Asset";
import {
	CLOSE_URL,
	PROFILE_NAME_PROP,
	PROFILE_PICTURE_PROP,
	PROFILE_STATUS_PROP,
	PROFILE_TYPE_PROP,
	PROFILE_USER_TYPE_PROP,
	SUCCESS_URL,
} from "../../Util/ConstVar";
import useImage from "../Hook/useImage";

function SwitchProfile({
	profiles = [],
	profile = {},
	switchProfile = async () => {},
	removeBusinessProfile = async () => {},
}) {
	const { image } = useImage();

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

	useEffect(() => {
		normalizeProfiles(profiles);
	}, [profiles]);

	const renderProfiles =
		profiles.length > 0
			? normalizeProfiles(profiles)
			: Array.from({ length: 2 }).map((_) => "default");

	const title = (
		<div className="w-100 text-center">
			<div className="fs-2">
				Choose How to interact in{" "}
				<span style={{ color: "#E94833" }}>ThaiNow</span> community
			</div>
			<div className="pt-5 pb-3">
				You will post, comment, and react as your current signed-in profile
				below
			</div>
		</div>
	);

	const navigate = useNavigate();

	const app = (
		<>
			<Space direction="vertical" gap={5} className="m-5 mb-2 tedkvn-center ">
				{title}
			</Space>
			<Space direction="horizontal" gap={5} wrap className="tedkvn-center">
				{renderProfiles.map((renPro, idx) => (
					<React.Fragment key={idx}>
						<Card
							cover={
								<Space
									direction="vertical"
									className="tedkvn-center mt-5 "
									style={{ padding: "0 3.3rem" }}
									gap={1}
								>
									{profiles.length > 0 ? (
										<>
											<div className="fw-bold fs-5 pb-2 tedkvn-text-ellipsis">
												{renPro?.[`${PROFILE_TYPE_PROP}`] ===
												PROFILE_USER_TYPE_PROP ? (
													<span className="c-primary"> Account </span>
												) : (
													<span className="c-business">Business</span>
												)}{" "}
												Profile
											</div>
											<Avatar
												size={150}
												style={{
													maxWidth: "100%",
												}}
												shape="circle"
												className="border-default"
												src={image({
													width: "100%",
													src: renPro?.info?.[`${PROFILE_PICTURE_PROP}`],
													preview: true,
												})}
												preview={{ visible: false }}
											/>
										</>
									) : (
										<Skeleton.Avatar shape="circle" size={150} active={true} />
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
											profile?.info?.[`${PROFILE_STATUS_PROP}`] === "DISABLED"
										}
										onClick={() => switchProfile(renPro, true)}
									>
										{profile?.id === renPro?.id
											? "Signed In"
											: "Switch Profile"}
									</Button>,
									<Button
										type="link"
										className="text-danger"
										onClick={
											renPro?.[`${PROFILE_TYPE_PROP}`] ===
											PROFILE_USER_TYPE_PROP
												? () => alert("account remove")
												: removeBusinessProfile(renPro?.id || -1)
										}
									>
										Remove Profile
									</Button>,
								]
							}
							style={{ maxWidth: 280 }}
						>
							<Skeleton loading={profiles.length < 1} active>
								<Meta
									className="text-center tedkvn-center"
									title={renPro?.info?.[`${PROFILE_NAME_PROP}`]}
									description={
										renPro?.info?.[`${PROFILE_STATUS_PROP}`] || <br />
									}
								/>
							</Skeleton>
						</Card>

						{idx < 6 && (
							<Card
								cover={
									<Space
										direction="vertical"
										className="tedkvn-center mt-5 "
										style={{ padding: "0 3.3rem" }}
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
													className="border-default"
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
												navigate("/register/business", {
													state: {
														[`${CLOSE_URL}`]: "/switch-profiles",
														[`${SUCCESS_URL}`]: "/switch-profiles",
													},
												})
											}
										>
											Add Business Profile
										</Button>,
									]
								}
								style={{ maxWidth: 250 }}
							>
								<Skeleton loading={profiles.length < 1} active>
									<Meta
										className="text-center tedkvn-center"
										description="For business owners, host, self-employed, or freelancers"
									/>
								</Skeleton>
							</Card>
						)}
					</React.Fragment>
				))}
			</Space>
		</>
	);

	return app;
}

export default SwitchProfile;

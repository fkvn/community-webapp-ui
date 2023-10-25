import { Button, Card, Col, List, Row, Space, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
	CLOSE_URL,
	ID_PROP,
	PROFILE_OBJ,
	SEARCH_PROFILE,
	SUCCESS_URL,
} from "../../Util/ConstVar";
import { isObjectEmpty, signoutUserPromise } from "../../Util/Util";
import { thainowReducer } from "../../redux-store/reducer/thainowReducer";
import useImage from "../Hook/useImage";
import useProfile from "../Hook/useProfile";

function RightLayout({ showSetting = false }) {
	const navigate = useNavigate();
	const location = useLocation();
	const { avatar } = useImage();
	const { [`${PROFILE_OBJ}`]: profile = {} } = useSelector(thainowReducer);

	const { picture, name, description } = isObjectEmpty(profile)
		? { name: "Hi Welcome", description: "ThaiNow" }
		: { ...profile.info, description: "" };

	const settingItems = [
		...(!isObjectEmpty(profile)
			? [
					{
						title: (
							<Button
								type="link"
								className="p-0"
								onClick={() =>
									navigate("/switch-profiles", {
										state: {
											[`${CLOSE_URL}`]:
												location?.pathname + location?.search || "/",
											[`${SUCCESS_URL}`]:
												location?.pathname + location?.search || "/",
										},
									})
								}
								style={{ fontSize: "1rem" }}
							>
								Switch Profiles
							</Button>
						),
					},
					// {
					// 	title: (
					// 		<Button type="link" className="p-0" href="/change-password">
					// 			Change Password
					// 		</Button>
					// 	),
					// },
			  ]
			: []),
		...(showSetting
			? [
					{
						title: (
							<Button
								type="link"
								className="p-0 m-0 "
								href="/help-center"
								style={{ fontSize: "1rem" }}
							>
								Help Center
							</Button>
						),
					},
					{
						title: (
							<Button
								type="link"
								className="p-0 m-0"
								href="/aboutus"
								style={{ fontSize: "1rem" }}
							>
								About Us
							</Button>
						),
					},
			  ]
			: []),
		...(!isObjectEmpty(profile)
			? [
					{
						title: (
							<Button
								type="link"
								className="p-0 text-secondary"
								onClick={() => signoutUserPromise()}
								style={{ fontSize: "1rem" }}
							>
								Sign out
							</Button>
						),
					},
			  ]
			: []),
	];

	const { uploadProfileAvatar } = useProfile();

	const app = (
		<Row justify="center">
			<Col xs={20} className="mt-4 mb-5">
				{isObjectEmpty(profile) && (
					<Button
						type="default"
						className=" fw-bold border-danger mb-4"
						block
						onClick={() => navigate("/register/user")}
						style={{
							fontSize: "1rem",
							borderRadius: "1rem",
							padding: "1.25rem",
						}}
					>
						Register ThaiNow Account
					</Button>
				)}
				<Card
					className="w-100 text-center p-4"
					bodyStyle={{ paddingTop: 0, paddingBottom: "1rem" }}
				>
					<Space direction="vertical" className="w-100" size={5}>
						<Space direction="vertical" className="w-100 my-4  custom-center">
							{avatar({
								inputProps: {
									src: picture,
									size: 100,
								},
								editable: profile?.[`${ID_PROP}`] && true,
								uploadPhotoOnClick: (formData = new FormData()) =>
									uploadProfileAvatar(profile?.[`${ID_PROP}`], formData),
							})}
							<Meta
								className="mt-2"
								title={<Typography.Title level={4}>{name}</Typography.Title>}
								description={
									<Typography.Text style={{ fontSize: "1rem" }}>
										{description}
									</Typography.Text>
								}
							/>
						</Space>
						<Button
							type="primary"
							block
							onClick={() =>
								isObjectEmpty(profile)
									? navigate("/signin", {
											state: {
												[`${CLOSE_URL}`]:
													location?.pathname + location?.search || "/",
												[`${SUCCESS_URL}`]:
													location?.pathname + location?.search || "/",
											},
									  })
									: navigate(`/${SEARCH_PROFILE}/${profile?.[`${ID_PROP}`]}`, {
											state: {
												[`${CLOSE_URL}`]:
													location?.pathname + location?.search || "/",
											},
									  })
							}
							style={{
								fontSize: "1rem",
								padding: "1.2rem",
								borderRadius: "1rem",
							}}
						>
							{isObjectEmpty(profile) ? "Sign In" : "My Profile"}
						</Button>

						{settingItems.length > 0 && (
							<>
								<List
									itemLayout="horizontal"
									className="mt-3"
									dataSource={settingItems}
									renderItem={(item) => (
										<List.Item
											className="text-start m-0"
											style={{ borderBottom: "1px solid wheat" }}
										>
											{item.title}
										</List.Item>
									)}
								/>
							</>
						)}
					</Space>
				</Card>
			</Col>
		</Row>
	);
	return app;
}

export default RightLayout;

import { Button, Card, List, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import { Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { imageGuestAvatar } from "../../Assest/Asset";
import { thainowReducer } from "../../redux-store/reducer/thainowReducer";
import {
	CLOSE_URL,
	ID_PROP,
	PROFILE_OBJ,
	SEARCH_PROFILE,
	SUCCESS_URL,
} from "../../Util/ConstVar";
import { isObjectEmpty, signoutUserPromise } from "../../Util/Util";
import useImage from "../Hook/useImage";

function RightLayout({ showSetting = false, ...props }) {
	const navigate = useNavigate();
	const location = useLocation();
	const { image } = useImage();
	const { [`${PROFILE_OBJ}`]: profile = {} } = useSelector(thainowReducer);

	const { picture, name, description } = isObjectEmpty(profile)
		? { picture: imageGuestAvatar, name: "Hi Welcome", description: "ThaiNow" }
		: { ...profile.info, description: "" };

	const settingItems = [
		...(showSetting
			? [
					{
						title: (
							<Button type="link" className="p-0 m-0 " href="/help-center">
								Help Center
							</Button>
						),
					},
					{
						title: (
							<Button type="link" className="p-0 m-0" href="/aboutus">
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
							>
								Switch Profiles
							</Button>
						),
					},
					{
						title: (
							<Button type="link" className="p-0" href="/change-password">
								Change Password
							</Button>
						),
					},
					{
						title: (
							<Button
								type="link"
								className="p-0 text-secondary"
								onClick={() => signoutUserPromise()}
							>
								Sign out
							</Button>
						),
					},
			  ]
			: []),
	];

	const app = (
		<Stack
			id="RightLayout"
			direction="vertical"
			className="px-4 py-3 w-100"
			{...props}
			gap={4}
		>
			{isObjectEmpty(profile) && (
				<Button
					type="default"
					className="p-2  fw-bold border-danger"
					block
					onClick={() => navigate("/register/user")}
				>
					Register ThaiNow Account
				</Button>
			)}

			<Card className="w-100 text-center pb-4" bodyStyle={{ paddingTop: 0 }}>
				<Space direction="vertical" className="w-100" size={15}>
					<Space direction="vertical" className="w-100 my-3 tedkvn-center">
						{image({
							src: picture,
							width: 100,
							className: "rounded-circle my-3",
						})}
						<Meta title={name} description={description} />
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
					>
						{isObjectEmpty(profile) ? "Sign In" : "My Profile"}
					</Button>

					{settingItems.length > 0 && (
						<>
							<List
								itemLayout="horizontal"
								className=""
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
		</Stack>
	);
	return app;
}

export default RightLayout;

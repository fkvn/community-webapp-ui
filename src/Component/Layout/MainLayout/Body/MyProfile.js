import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Flex, Menu, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Auth from "../../../Auth/Auth";
import BreadcrumbContainer from "../../../Breadcrumb/BreadcrumbContainer";

import NewPasswordContainer from "../../Section/NewPassword/NewPasswordContainer";
import UserProfileContainer from "../../Section/UserProfile/UserProfileContainer";

function MyProfile() {
	const { t } = useTranslation(["Default", "Password"]);

	const sideMenuKeys = {
		myProfile: "my-profile",
		myPassword: "password",
		myPost: "post",
	};

	const [currentKey, setCurrentKey] = useState(sideMenuKeys.myProfile);

	const sideMenuItems = [
		{
			label: t("my_profile_msg"),
			key: sideMenuKeys.myProfile,
			icon: <UserOutlined />,
			className: "my-4 bg-white",
		},
		{
			label: t("password_msg_new", { ns: "Password" }),
			key: sideMenuKeys.myPassword,
			icon: <LockOutlined />,
			className: "my-4 bg-white",
		},
	];

	const onSideMenuSelectHandle = ({ key = sideMenuKeys.myProfile }) => {
		setCurrentKey(key);
	};

	const SideMenu = () => (
		<Menu
			style={{
				minWidth: 250,
				minHeight: 500,
			}}
			className="p-2"
			mode="vertical"
			onSelect={onSideMenuSelectHandle}
			defaultSelectedKeys={[currentKey]}
			items={sideMenuItems}
		/>
	);

	const Content = () => (
		<Flex
			vertical
			className="bg-white w-100 p-4"
			style={{
				minHeight: 500,
			}}
		>
			{currentKey === sideMenuKeys?.myProfile && <UserProfileContainer />}
			{currentKey === sideMenuKeys?.myPassword && <NewPasswordContainer />}

			{/* this to render empty space if no key is found */}
			<p></p>
		</Flex>
	);

	const App = () => (
		<Auth>
			<Row className="p-4">
				<Col xs={1} xxl={3}></Col>
				<Col xs={22} xxl={18}>
					<Flex gap="large" vertical>
						<BreadcrumbContainer />
						{/* <BreadcrumbNav /> */}
						<Flex justify="flex-start" gap="large">
							<SideMenu />
							<Content />
						</Flex>
					</Flex>
				</Col>
				<Col xs={1} xxl={3}></Col>
			</Row>
		</Auth>
	);
	return <App />;
}

export default MyProfile;

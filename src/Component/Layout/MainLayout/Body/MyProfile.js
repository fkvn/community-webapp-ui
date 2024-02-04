import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Flex, Menu, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MY_PROFILE_PATH } from "../../../../Util/ConstVar";
import Auth from "../../../Auth/Auth";
import MyPasswordContainer from "../../../MyProfile/MyPasswordContainer";
import MyProfileContainer from "../../../MyProfile/MyProfileContainer";

function MyProfile() {
	const { t } = useTranslation(["Default"]);

	const BreadcrumbNav = () => (
		<Breadcrumb
			items={[
				{
					title: t("home_msg"),
					href: "/",
					className: "text-primary text-decoration-none",
				},
				{
					title: t("account_msg"),
					href: MY_PROFILE_PATH,
					className: "text-primary text-decoration-none",
				},
				{
					title: t("my_profile_msg"),
				},
			]}
		/>
	);

	const sideMenuKeys = {
		myProfile: "my-profile",
		myPassword: "password",
	};

	const [currentKey, setCurrentKey] = useState(sideMenuKeys.myProfile);

	const sideMenuItems = [
		{
			label: "My Profile",
			key: sideMenuKeys.myProfile,
			icon: <UserOutlined />,
			className: "my-4 bg-white",
		},
		{
			label: "Password",
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
			{currentKey === sideMenuKeys?.myProfile && <MyProfileContainer />}
			{currentKey === sideMenuKeys?.myPassword && <MyPasswordContainer />}

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
						<BreadcrumbNav />
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

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Flex, Menu, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Auth from "../../../Auth/Auth";
import BreadcrumbContainer from "../../../Breadcrumb/BreadcrumbContainer";

import { RiNewspaperLine } from "@remixicon/react";
import { useSearchParams } from "react-router-dom";
import NewPasswordContainer from "../../Section/NewPassword/NewPasswordContainer";
import GBPostTable from "../../Section/PostTable/GBPostTable";
import UserProfileContainer from "../../Section/UserProfile/UserProfileContainer";

function MyProfile() {
	const { t } = useTranslation(["Default", "Password"]);

	const [params, setParams] = useSearchParams();

	const sideMenuKeys = {
		myProfile: "profile",
		myPassword: "password",
		myPost: "post",
	};

	const [currentKey, setCurrentKey] = useState(
		Object.keys(sideMenuKeys).filter(
			(f) => sideMenuKeys[f] === params.get("menu")
		).length > 0
			? params.get("menu")
			: sideMenuKeys.myProfile || ""
	);

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
		{
			label: t("post_msg_other"),
			key: sideMenuKeys.myPost,
			icon: <RiNewspaperLine size={20} />,
			className: "my-4 bg-white custom-center-left",
		},
	];

	const onSideMenuSelectHandle = ({ key = sideMenuKeys.myProfile }) => {
		params.set("menu", key);
		setParams(params);
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
				overflow: "auto",
				minHeight: "500px",
			}}
		>
			{currentKey === sideMenuKeys?.myProfile && <UserProfileContainer />}
			{currentKey === sideMenuKeys?.myPassword && <NewPasswordContainer />}
			{currentKey === sideMenuKeys?.myPost && <GBPostTable />}

			{/* this to render empty space if no key is found */}
			<p></p>
		</Flex>
	);

	const App = () => (
		<Auth>
			<Row className="p-4" style={{ marginTop: "2rem", marginBottom: "5rem" }}>
				<Col xs={1} xxl={1}></Col>
				<Col xs={22} xxl={22}>
					<Flex gap="large" vertical>
						<BreadcrumbContainer />
						<Flex justify="flex-start" gap="large">
							<SideMenu />
							<Content />
						</Flex>
					</Flex>
				</Col>
				<Col xs={1} xxl={1}></Col>
			</Row>
		</Auth>
	);
	return <App />;
}

export default MyProfile;

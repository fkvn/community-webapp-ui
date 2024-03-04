import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Flex, Grid, Menu } from "antd";
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
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const { t } = useTranslation(["Default", "Password"]);
	const contentMaxWidth = "90%";
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
			label:
				(screens.lg || currentKey === sideMenuKeys.myProfile) &&
				t("my_profile_msg"),
			key: sideMenuKeys.myProfile,
			icon: <UserOutlined {...!screens.lg} />,
			className: `${screens.lg ? "my-4" : ""} bg-white`,
		},
		{
			label:
				(screens.lg || currentKey === sideMenuKeys.myPassword) &&
				t("password_msg_new", { ns: "Password" }),
			key: sideMenuKeys.myPassword,
			icon: <LockOutlined />,
			className: `${screens.lg ? "my-4" : ""} bg-white`,
		},
		{
			label:
				(screens.lg || currentKey === sideMenuKeys.myPost) &&
				t("post_msg_other"),
			key: sideMenuKeys.myPost,
			icon: <RiNewspaperLine size={20} />,
			className: `${screens.lg ? "my-4" : ""} bg-white custom-center-left`,
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
				minWidth: "20%",
			}}
			className={`${!screens.lg ? "custom-center-left" : ""} p-2`}
			mode={screens.lg ? "vertical" : "horizontal"}
			onSelect={onSideMenuSelectHandle}
			defaultSelectedKeys={[currentKey]}
			items={sideMenuItems}
		/>
	);

	const Content = () => (
		<Flex
			vertical
			className="bg-white "
			style={{
				padding: screens.lg ? "2rem 4rem" : "2rem",
				minWidth: "80%",
				overflow: "auto",
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
			<Flex align="center" className="py-5" vertical>
				<Flex
					className="w-100"
					style={{
						maxWidth: contentMaxWidth,
					}}
					vertical
					gap={30}
				>
					<BreadcrumbContainer />
					<Flex
						justify="flex-start"
						gap={screens.lg ? 50 : 20}
						className="mb-5"
						style={{
							minHeight: "40rem",
						}}
						{...(!screens.lg && { vertical: true })}
					>
						<SideMenu />
						<Content />
					</Flex>
				</Flex>
			</Flex>
		</Auth>
	);
	return <App />;
}

export default MyProfile;

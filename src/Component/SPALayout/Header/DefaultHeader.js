import { Avatar, Button, Flex, Menu, Space } from "antd";
import $ from "jquery";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { svgThaiNowLogoWithWords } from "../../../Assest/Asset";

import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { SIGN_IN_PATH } from "../../../Util/constVar";
import { isObjectEmpty } from "../../../Util/util";
import useAuth from "../../Hook/AuthHook/useAuth";
import useImage from "../../Hook/useImage";
import useRedux from "../../Hook/useRedux";
import SwitchLanguage from "../../Locale/SwitchLanguage";

function DefaultHeader() {
	const navigate = useNavigate();
	const { image } = useImage();
	const { profile = {} } = useRedux();
	const { name: userName = "", picture: userPicture = "" } =
		profile?.info || {};
	const { t } = useTranslation();
	const { signout } = useAuth();

	// const [form] = useForm();
	// const [searchParams] = useSearchParams();
	// const { displayLocation } = useCurrentLocation(false);
	// const { [`${LOCATION_OBJ}`]: location } = useSelector(thainowReducer);
	// const [showSearch, setShowSearch] = useState(false);

	// const menu = (
	// 	<Menu
	// 		items={[
	// 			{
	// 				key: "1",
	// 				label: (
	// 					<a href="/help-center" className="p-2">
	// 						Help Center
	// 					</a>
	// 				),
	// 			},
	// 			{
	// 				key: "2",
	// 				label: (
	// 					<a href="/aboutus" className="p-2">
	// 						About Us
	// 					</a>
	// 				),
	// 			},
	// 		]}
	// 	/>
	// );

	// const keywordInput =
	//  useSearchKeyword(
	// 	{
	// 		onClick: () => setShowSearch(true),
	// 	},
	// 	{
	// 		onChange: () => setShowSearch(true),
	// 	}
	// );

	useEffect(() => {
		// offset top header
		$("#layout-main").css("margin-top", "7rem");

		// const keywordParam = searchParams.get("keywords") || "";
		// form.setFieldValue(SEARCH_INPUT_PROP, keywordParam);
	}, []);

	// const app = (
	// 	<Row
	// 		justify="space-start"
	// 		align="middle"
	// 		className="w-100 px-4 px-lg-5 py-2"
	// 		// style={{
	// 		// 	backgroundImage: `url(${imageTopbarBgMobile})`,
	// 		// 	backgroundSize: "cover",
	// 		// }}
	// 	>
	// 		<Col xs={2}>
	// 			<Navbar.Brand
	// 				as="div"
	// 				onClick={() => window.open("/", "_self")}
	// 				style={{ cursor: "pointer" }}
	// 				className="p-0"
	// 			>
	// 				{image({
	// 					src: svgThaiNowLogoWithWords,
	// 					width: 65,
	// 				})}
	// 			</Navbar.Brand>
	// 		</Col>

	// 		<Col xs={17}>
	// 			<Row justify="center" className="mx-5" align="middle">
	// 				<Col flex={3}>
	// 					<Form form={form} id="default-top-bar">
	// 						{/* {keywordInput} */}
	// 					</Form>
	// 				</Col>
	// 				<Col flex="auto">
	// 					{/* {displayLocation(
	// 						{
	// 							onClick: () => setShowSearch(true),
	// 							containerClassName: "text-white mx-4 mt-1",
	// 						},
	// 						location
	// 					)} */}
	// 				</Col>
	// 			</Row>

	// 			{/* <OffCanvasSearch
	// 				show={showSearch}
	// 				onHide={() => setShowSearch(false)}
	// 			/> */}
	// 		</Col>

	// 		<Col xs={4}>
	// 			<Space.Compact block>
	// 				<Space className="mx-4 ">
	// 					<SwitchLanguage
	// 						bordered={false}
	// 						style={{
	// 							fontSize: "1rem",
	// 							paddingRight: ".5rem",
	// 							color: "black",
	// 						}}
	// 					/>
	// 				</Space>
	// 				<Button
	// 					type="primary"
	// 					style={{
	// 						minWidth: "165px",
	// 						minHeight: "45px",
	// 						borderRadius: "4px",
	// 						background: globalStyle.mainBlueColor1,
	// 					}}
	// 					className="custom-center"
	// 					icon={<UserOutlined />}
	// 					onClick={() => navigate(`${SIGN_IN_PATH}`)}
	// 				>
	// 					{t("login_msg")} | {t("signup_msg")}
	// 				</Button>
	// 			</Space.Compact>
	// 			{/* <Dropdown overlay={menu} placement="bottomRight" arrow>
	// 				<Button className=" text-primary float-end rounded-3">
	// 					<MenuOutlined />
	// 				</Button>
	// 			</Dropdown> */}
	// 		</Col>
	// 	</Row>
	// );

	const SigninBtn = () =>
		isObjectEmpty(profile) && (
			<Button
				type="link"
				style={{
					fontSize: "1rem",
				}}
				size="medium"
				className="custom-center c-customRed"
				icon={<UserOutlined />}
				onClick={() => navigate(`${SIGN_IN_PATH}`)}
			>
				<span className="pt-1">
					{t("login_msg")} | {t("signup_msg")}
				</span>
			</Button>
		);

	const profileMenuItems = [
		{
			label: (
				<Space align="center">
					<Avatar
						size="small"
						{...(userPicture
							? { src: <img src={profile?.picture} alt="avatar" /> }
							: { icon: <UserOutlined /> })}
					/>
					{userName}
				</Space>
			),
			children: [
				{
					label: t("my_profile_msg"),
					icon: <UserOutlined />,
					key: "my_profile",
				},
				{
					label: t("sign_out_msg"),
					icon: <LogoutOutlined />,
					key: "sign_out",
				},
			],
		},
	];

	const onClickProfileMenuItemHandle = (e) => {
		switch (e.key) {
			case "my_profile":
				break;
			case "sign_out":
				signout();
				break;
			default:
				break;
		}
	};

	const ProfileMenu = () =>
		!isObjectEmpty(profile) && (
			<>
				<Menu
					onClick={onClickProfileMenuItemHandle}
					mode="horizontal"
					items={profileMenuItems}
				/>
			</>
		);

	const App = () => (
		<Flex justify="space-between" className="my-1 mx-3">
			<Flex justify="space-between" align="center">
				{image({
					src: svgThaiNowLogoWithWords,
					width: 50,
					className: "",
					onClick: () => navigate("/"),
					style: {
						cursor: "pointer",
					},
				})}
			</Flex>
			<Flex justify="space-between" align="center">
				<SwitchLanguage />
				<SigninBtn />
				<ProfileMenu />
			</Flex>
		</Flex>
	);

	return <App />;
}

export default DefaultHeader;

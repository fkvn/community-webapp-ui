import { Avatar, Button, Flex, Menu, Space } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { svgThaiNowLogoWithWords } from "../../../Assest/Asset";

import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import {
	MY_PROFILE_PATH,
	PROFILE_AVATAR_PROP,
	SIGN_IN_PATH,
	USERNAME_PROP,
} from "../../../Util/constVar";
import useImage from "../../Hook/useImage";
import SwitchLanguage from "../../Locale/SwitchLanguage";

function Header({ profile = {}, signout = () => {}, isLogin = false }) {
	const navigate = useNavigate();
	const { image } = useImage();

	const { t } = useTranslation();

	const { [`${PROFILE_AVATAR_PROP}`]: avatarUrl = "" } = profile;

	// const { signout } = useAuth();
	// const { profile } = useProfile();

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

	// useEffect(() => {
	// 	// offset top header
	// 	// $("#layout-main").css("margin-top", "7rem");
	// 	// const keywordParam = searchParams.get("keywords") || "";
	// 	// form.setFieldValue(SEARCH_INPUT_PROP, keywordParam);
	// }, []);

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
	const SigninBtn = () => (
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
						{...(avatarUrl
							? {
									src: <img src={avatarUrl} alt="avatar" />,
							  }
							: { icon: <UserOutlined /> })}
					/>
					{profile[`${USERNAME_PROP}`]}
				</Space>
			),
			key: "profile-menu",
			children: [
				{
					label: (
						<Link to={MY_PROFILE_PATH} className="text-decoration-none">
							{t("my_profile_msg")}
						</Link>
					),
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

	const ProfileMenu = () => (
		<Menu
			onClick={onClickProfileMenuItemHandle}
			mode="horizontal"
			items={profileMenuItems}
			// temp fix the error when auto collapsed as only 1 item for horizontal mode
			disabledOverflow={true}
		/>
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
				{isLogin ? <ProfileMenu /> : <SigninBtn />}
			</Flex>
		</Flex>
	);

	return <App />;
}

export default Header;

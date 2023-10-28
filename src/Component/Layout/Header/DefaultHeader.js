import { UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Menu, Row, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import $ from "jquery";
import { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import globalStyle from "../../../Assest/Style/scss/base/_global.scss";
import { svgThaiNowLogoWithWords } from "../../../Assest/env";
import { LOCATION_OBJ, SEARCH_INPUT_PROP } from "../../../Util/ConstVar";
import { thainowReducer } from "../../../redux-store/reducer/thainowReducer";
import useImage from "../../Hook/useImage";
import useSignin from "../../Hook/useSignin";
import SwitchLanguage from "../../Locale/SwitchLanguage";

function DefaultHeader() {
	const [searchParams] = useSearchParams();
	const [form] = useForm();
	const { image } = useImage();
	// const { displayLocation } = useCurrentLocation(false);
	const { [`${LOCATION_OBJ}`]: location } = useSelector(thainowReducer);
	const [showSearch, setShowSearch] = useState(false);
	const { t } = useTranslation();
	const { onClickSigninHandle } = useSignin();

	const menu = (
		<Menu
			items={[
				{
					key: "1",
					label: (
						<a href="/help-center" className="p-2">
							Help Center
						</a>
					),
				},
				{
					key: "2",
					label: (
						<a href="/aboutus" className="p-2">
							About Us
						</a>
					),
				},
			]}
		/>
	);

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
		const keywordParam = searchParams.get("keywords") || "";
		form.setFieldValue(SEARCH_INPUT_PROP, keywordParam);
		$("#layout-main").css("margin-top", "7rem");
	}, []);

	const app = (
		<Row
			justify="space-start"
			align="middle"
			className="w-100 px-4 px-lg-5 py-2"
			// style={{
			// 	backgroundImage: `url(${imageTopbarBgMobile})`,
			// 	backgroundSize: "cover",
			// }}
		>
			<Col xs={2}>
				<Navbar.Brand
					as="div"
					onClick={() => window.open("/", "_self")}
					style={{ cursor: "pointer" }}
					className="p-0"
				>
					{image({
						src: svgThaiNowLogoWithWords,
						width: 65,
					})}
				</Navbar.Brand>
			</Col>

			<Col xs={17}>
				<Row justify="center" className="mx-5" align="middle">
					<Col flex={3}>
						<Form form={form} id="default-top-bar">
							{/* {keywordInput} */}
						</Form>
					</Col>
					<Col flex="auto">
						{/* {displayLocation(
							{
								onClick: () => setShowSearch(true),
								containerClassName: "text-white mx-4 mt-1",
							},
							location
						)} */}
					</Col>
				</Row>

				{/* <OffCanvasSearch
					show={showSearch}
					onHide={() => setShowSearch(false)}
				/> */}
			</Col>

			<Col xs={4}>
				<Space.Compact block>
					<Space className="mx-4 ">
						<SwitchLanguage
							bordered={false}
							style={{
								fontSize: "1rem",
								paddingRight: ".5rem",
								color: "black",
							}}
						/>
					</Space>
					<Button
						type="primary"
						style={{
							minWidth: "165px",
							minHeight: "45px",
							borderRadius: "4px",
							background: globalStyle.mainBlueColor1,
						}}
						icon={<UserOutlined />}
						onClick={onClickSigninHandle}
					>
						{t("login_msg")} | {t("signup_msg")}
					</Button>
				</Space.Compact>
				{/* <Dropdown overlay={menu} placement="bottomRight" arrow>
					<Button className=" text-primary float-end rounded-3">
						<MenuOutlined />
					</Button>
				</Dropdown> */}
			</Col>
		</Row>
	);

	return app;
}

export default DefaultHeader;

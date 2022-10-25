import { MenuOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Form, Menu, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import $ from "jquery";
import { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { imageThainowLogo } from "../../../Assest/Asset";
import { thainowReducer } from "../../../redux-store/reducer/thainowReducer";
import { LOCATION_OBJ, SEARCH_INPUT_PROP } from "../../../Util/ConstVar";
import useSearchKeyword from "../../Hook/FormHook/useSearchKeyword";
import useCurrentLocation from "../../Hook/useCurrentLocation";
import useImage from "../../Hook/useImage";
import OffCanvasSearch from "../../Search/OffCanvasSearch";

function DefaultTopBar() {
	const [searchParams] = useSearchParams();
	const [form] = useForm();
	const { image } = useImage();
	const { displayLocation } = useCurrentLocation(false);
	const { [`${LOCATION_OBJ}`]: location } = useSelector(thainowReducer);
	const [showSearch, setShowSearch] = useState(false);

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

	const keywordInput = useSearchKeyword(
		{
			onClick: () => setShowSearch(true),
		},
		{
			onChange: () => setShowSearch(true),
		}
	);

	useEffect(() => {
		const keywordParam = searchParams.get("keywords") || "";
		form.setFieldValue(SEARCH_INPUT_PROP, keywordParam);
		$("#layout-main").css("margin-top", $("#layout header").outerHeight() + 25);
	});

	const app = (
		<Row
			justify="space-start"
			align="middle"
			className="w-100 px-4 px-lg-5 py-0 py-lg-2"
		>
			<Col xs={2}>
				<Navbar.Brand
					as="div"
					onClick={() => window.open("/", "_self")}
					style={{ cursor: "pointer" }}
				>
					{image({
						src: imageThainowLogo,
						width: 55,
						className: "my-2",
					})}
				</Navbar.Brand>
			</Col>

			<Col xs={20}>
				<Row justify="center" className="mx-5" align="middle">
					<Col flex={3}>
						<Form form={form}>{keywordInput}</Form>
					</Col>
					<Col flex="auto">
						{displayLocation(
							{
								onClick: () => setShowSearch(true),
								containerClassName: "text-white mx-4 mt-1",
							},
							location
						)}
					</Col>
				</Row>

				<OffCanvasSearch
					show={showSearch}
					onHide={() => setShowSearch(false)}
				/>
			</Col>

			<Col xs={2}>
				<Dropdown overlay={menu} placement="bottomRight" arrow>
					<Button className=" bg-white text-primary float-end">
						<MenuOutlined />
					</Button>
				</Dropdown>
			</Col>
		</Row>
	);

	return app;
}

export default DefaultTopBar;

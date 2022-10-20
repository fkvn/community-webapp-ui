import { MenuOutlined } from "@ant-design/icons";
import { Button, Dropdown, Form, Menu } from "antd";
import { useForm } from "antd/lib/form/Form";
import $ from "jquery";
import { useEffect, useState } from "react";
import { Navbar, Stack } from "react-bootstrap";
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
		$("#layout main").css("margin-top", $("#layout header").outerHeight() + 25);
	});

	const app = (
		<>
			<Stack direction="horizontal" gap={4}>
				<Navbar.Brand
					as="div"
					className="tedkvn-center"
					onClick={() => window.open("/", "_self")}
					style={{ cursor: "pointer" }}
				>
					{image({
						src: imageThainowLogo,
						width: 55,
						className: "my-2",
					})}
				</Navbar.Brand>

				<div id="searchbar" className="ms-auto w-100 ">
					<Stack direction="horizontal" gap={4}>
						<Form form={form} style={{ width: "60%" }}>
							{keywordInput}
						</Form>
						{displayLocation(
							{
								onClick: () => setShowSearch(true),
								containerClassName: "text-white w-25 h-100",
							},
							location
						)}
					</Stack>
				</div>

				<Dropdown overlay={menu} placement="bottomRight" arrow>
					<Button className="tedkvn-center bg-white text-primary">
						<MenuOutlined />
					</Button>
				</Dropdown>

				<OffCanvasSearch
					show={showSearch}
					onHide={() => setShowSearch(false)}
				/>
			</Stack>
		</>
	);
	return app;
}

export default DefaultTopBar;

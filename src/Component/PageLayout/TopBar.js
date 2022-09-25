import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { Button, Navbar, Stack } from "react-bootstrap";
import useImage from "../Hook/useImage";
import Search from "../Search/Search";

function TopBar({ keywords = "" }) {
	const { image } = useImage();

	const menu = (
		<Menu
			items={[
				{
					key: "1",
					label: (
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://www.antgroup.com"
						>
							3 menu item
						</a>
					),
				},
				{
					key: "2",
					label: (
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://www.aliyun.com"
						>
							2nd menu item
						</a>
					),
				},
				{
					key: "3",
					label: (
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://www.luohanacademy.com"
						>
							3rd menu item
						</a>
					),
				},
			]}
		/>
	);

	const app = (
		<Stack
			direction="horizontal"
			id="topbar"
			className="mx-4 mx-lg-5 w-100 "
			gap={4}
		>
			<Navbar.Brand as="div" className="tedkvn-center">
				{image({
					className: "rounded-circle ",
				})}
			</Navbar.Brand>

			<div id="searchbar" className=" ms-auto w-100">
				<div className="d-none  d-md-block">
					{" "}
					<Search defaultKeywords={keywords} direction="horizontal" />
				</div>
			</div>

			<Dropdown overlay={menu} placement="bottomRight" arrow>
				<Button className="tedkvn-center bg-white text-primary">
					<MenuOutlined />
				</Button>
			</Dropdown>
		</Stack>
	);

	return app;
}

export default TopBar;

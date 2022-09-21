import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, Image, Menu } from "antd";
import { Button, Navbar, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Search from "../Search/Search";

function TopBar({ keywords = "" }) {
	const navigate = useNavigate();

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
							1st menu item
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
			className="mx-4 mx-lg-5 w-100"
			gap={4}
		>
			<Navbar.Brand>
				<Image
					width={45}
					src="https://firebasestorage.googleapis.com/v0/b/mono-thainow.appspot.com/o/thainow-service-worker%2Fconfig%2Fimg-logo-round.png?alt=media&token=184f0afc-beb7-4992-9c24-63e3004444ef"
					preview={false}
					onClick={() => navigate("/")}
				/>
			</Navbar.Brand>
			<div id="searchbar" className="ms-auto w-100">
				<Search defaultKeywords={keywords} direction="horizontal" />
			</div>

			<Dropdown overlay={menu} placement="bottomRight" arrow>
				<Button className="tedkvn-center">
					<MenuOutlined />
				</Button>
			</Dropdown>
		</Stack>
	);

	return app;
}

export default TopBar;

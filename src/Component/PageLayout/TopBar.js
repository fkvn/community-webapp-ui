import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { Button, Navbar, Stack } from "react-bootstrap";
import { imageGuestAvatar } from "../../Assest/Asset";
import { PICTURE_PROP } from "../../Util/ConstVar";
import { isObjectEmpty } from "../../Util/Util";
import useImage from "../Hook/useImage";
import useProfile from "../Hook/useProfile";
import Search from "../Search/Search";

function TopBar({ setShowRightBar = () => alert("elll") }) {
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

	const { profile } = useProfile();

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

			<div id="searchbar" className="ms-auto w-100 d-none  d-md-block">
				<Search direction="horizontal" />
			</div>

			<div className="d-none d-md-block">
				<Dropdown overlay={menu} placement="bottomRight" arrow>
					<Button className="tedkvn-center bg-white text-primary">
						<MenuOutlined />
					</Button>
				</Dropdown>
			</div>

			<div className="ms-auto  d-block d-md-none">
				<div className="tedkvn-center">
					{image({
						className: "rounded-circle border-0 p-1",
						src: isObjectEmpty(profile)
							? imageGuestAvatar
							: profile?.info?.[`${PICTURE_PROP}`],
						onClick: setShowRightBar,
					})}
				</div>
			</div>
		</Stack>
	);

	return app;
}

export default TopBar;

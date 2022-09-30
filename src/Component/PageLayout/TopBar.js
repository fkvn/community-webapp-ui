import Icon, { MenuOutlined } from "@ant-design/icons";
import { Button, Dropdown, Form, Menu, Space } from "antd";
import $ from "jquery";
import { useEffect, useState } from "react";
import { Navbar, Stack } from "react-bootstrap";
import {
	iconLocationWhite,
	imageGuestAvatar,
	imageThainowLogo,
} from "../../Assest/Asset";
import { ADDRESS_PROP, PICTURE_PROP } from "../../Util/ConstVar";
import { isObjectEmpty } from "../../Util/Util";
import useSearch from "../Hook/FormHook/useSearch";
import useImage from "../Hook/useImage";
import useLocation from "../Hook/useLocation";
import useProfile from "../Hook/useProfile";
import OffCanvasSearch from "../Search/OffCanvasSearch";

function TopBar({ setShowRightBar = () => alert("elll") }) {
	const { image } = useImage();

	useEffect(() => {
		$("#layout main").css("margin-top", $("#layout header").height());
	});

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
	const keyword = useSearch({
		onClick: () => setShowSearch(true),
	});

	const { location } = useLocation(true);

	const activateScrolling = () => {
		const heightToHideFrom = $("#layout header").outerHeight();

		const threshold = 0;
		let lastScrollY = window.pageYOffset;
		let ticking = false;

		const updateScrollDir = () => {
			const scrollY = window.pageYOffset;

			if (Math.abs(scrollY - lastScrollY) < threshold) {
				ticking = false;
				return;
			}

			if (scrollY > lastScrollY && scrollY > heightToHideFrom) {
				$("#layout div#mobile-searchbar").addClass("nav-up");
			} else if (scrollY < heightToHideFrom) {
				$("#layout div#mobile-searchbar").removeClass("nav-up");
			} else {
				$("#layout div#mobile-searchbar").removeClass("nav-up");
			}

			lastScrollY = scrollY > 0 ? scrollY : 0;

			ticking = false;
		};

		const onScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(updateScrollDir);
				$("#layout main").css("margin-top", $("#layout header").height());
				ticking = true;
			}
		};

		window.addEventListener("scroll", onScroll);

		return () => window.removeEventListener("scroll", onScroll);
	};

	useEffect(() => {
		$("#layout main").css("margin-top", $("#layout header").height());
		activateScrolling();
	});

	const [showSearch, setShowSearch] = useState(false);

	const app = (
		<Stack
			direction="vertical"
			id="topbar"
			className="mx-4 mx-lg-5 w-100"
			gap={3}
		>
			<Stack direction="horizontal" gap={4}>
				{/* {activeScrolling && setActiveScrolling(false)} */}
				<Navbar.Brand as="div" className="tedkvn-center">
					{image({
						src: imageThainowLogo,
						width: 60,
						className: "my-2",
					})}
				</Navbar.Brand>

				<div id="searchbar" className="ms-auto w-100 d-none d-md-block">
					<Stack direction="horizontal" gap={4}>
						<Form disabled style={{ width: "60%" }}>
							{keyword}
						</Form>
						<Space
							direction="horizontal"
							className="text-white w-25 h-100 "
							onClick={() => setShowSearch(true)}
						>
							<Icon
								component={() => iconLocationWhite(20)}
								width={50}
								className="tedkvn-center"
							/>
							<div className="tedkvn-center">
								<span className=" tedkvn-text-ellipsis ">
									{location?.[`${ADDRESS_PROP}`]}
								</span>
							</div>
						</Space>
					</Stack>
					{/* <Search direction="horizontal" /> */}
				</div>

				<div className="ms-auto d-none d-md-block">
					<Dropdown overlay={menu} placement="bottomRight" arrow>
						<Button className="tedkvn-center bg-white text-primary">
							<MenuOutlined />
						</Button>
					</Dropdown>
				</div>

				<div className="ms-auto  d-block d-md-none">
					<div className="tedkvn-center">
						{image({
							width: 40,
							className: "rounded-circle p-1 bg-white",
							src: isObjectEmpty(profile)
								? imageGuestAvatar
								: profile?.info?.[`${PICTURE_PROP}`],
							onClick: setShowRightBar,
						})}
					</div>
				</div>
			</Stack>
			<div
				id="mobile-searchbar"
				className="w-100 d-block  d-md-none"
				style={{
					lineHeight: "normal",
				}}
			>
				<Form disabled>{keyword}</Form>
				<Space
					direction="horizontal"
					className="text-white w-100"
					onClick={() => setShowSearch(true)}
				>
					<Icon
						component={() => iconLocationWhite(20)}
						width={50}
						className="my-3"
					/>
					<div className="d-inline-block tedkvn-text-ellipsis h-100 ">
						{location?.[`${ADDRESS_PROP}`]}
					</div>
				</Space>
			</div>

			<OffCanvasSearch show={showSearch} onHide={() => setShowSearch(false)} />
		</Stack>
	);

	return app;
}

export default TopBar;

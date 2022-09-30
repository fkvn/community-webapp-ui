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
import OffCanvasProfile from "../Profile/OffCanvasProfile";
import OffCanvasSearch from "../Search/OffCanvasSearch";

function TopBar() {
	const { image } = useImage();
	const { location } = useLocation(true);

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

	const { profile } = useProfile();
	const keyword = useSearch({
		onClick: () => setShowSearch(true),
	});

	// const activateScrolling = () => {
	// 	const heightToHideFrom = $("#layout header").outerHeight();

	// 	const threshold = 0;
	// 	let lastScrollY = window.pageYOffset;
	// 	let ticking = false;

	// 	const updateScrollDir = () => {
	// 		const scrollY = window.pageYOffset;

	// 		if (Math.abs(scrollY - lastScrollY) < threshold) {
	// 			ticking = false;
	// 			return;
	// 		}

	// 		if (scrollY > lastScrollY && scrollY > 0.5 * heightToHideFrom) {
	// 			$("#layout div#mobile-searchbar").addClass("nav-up");
	// 		} else {
	// 			$("#layout div#mobile-searchbar").removeClass("nav-up");
	// 		}

	// 		// else if (scrollY < 0.5 * heightToHideFrom) {
	// 		// 	$("#layout div#mobile-searchbar").removeClass("nav-up");
	// 		// }

	// 		lastScrollY = scrollY > 0 ? scrollY : 0;

	// 		ticking = false;
	// 	};

	// 	const onScroll = () => {
	// 		if (!ticking) {
	// 			window.requestAnimationFrame(updateScrollDir);
	// 			$("#layout main").css("margin-top", $("#layout header").height());
	// 			ticking = true;
	// 		}
	// 	};

	// 	window.addEventListener("scroll", onScroll);

	// 	return () => window.removeEventListener("scroll", onScroll);
	// };

	useEffect(() => {
		$("#layout main").css("margin-top", $("#layout header").height());
		// activateScrolling();
	});

	const [showSearch, setShowSearch] = useState(false);
	const [showProfile, setShowProfile] = useState(false);

	const app = (
		<Stack
			direction="vertical"
			id="topbar"
			className="mx-4 mx-lg-5 w-100"
			gap={2}
		>
			<Stack direction="horizontal" gap={4}>
				{/* {activeScrolling && setActiveScrolling(false)} */}
				<Navbar.Brand as="div" className="tedkvn-center">
					{image({
						src: imageThainowLogo,
						width: 55,
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
								className="tedkvn-center "
							/>
							<div className="tedkvn-center tedkvn-text-ellipsis">
								{location?.[`${ADDRESS_PROP}`]}
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
							width: 35,
							className: "rounded-circle bg-white",
							style: { padding: ".15rem" },
							src: isObjectEmpty(profile)
								? imageGuestAvatar
								: profile?.info?.[`${PICTURE_PROP}`],
							onClick: () => setShowProfile(true),
						})}
					</div>
				</div>
			</Stack>

			<div
				id="mobile-searchbar"
				className="w-100 d-block d-md-none mt-1"
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
						className="tedkvn-center"
						style={{ margin: "1rem 0" }}
					/>
					<div
						className="my-auto tedkvn-text-ellipsis"
						style={{ width: "100%" }}
					>
						{location?.[`${ADDRESS_PROP}`]}
					</div>
				</Space>
			</div>

			<OffCanvasSearch show={showSearch} onHide={() => setShowSearch(false)} />
			<OffCanvasProfile
				show={showProfile}
				onHide={() => setShowProfile(false)}
			/>
		</Stack>
	);

	return app;
}

export default TopBar;

import React from "react";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import IconLinkButton from "./IconLinkButton";

import defaultProfileImage from "../../Assest/Image/Profile/UserIcon_Guest.png";
import threeBarsIcon from "../../Assest/Image/Icon/3barsIcon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import * as constVar from "../../Util/ConstVar";

function HeaderProfileButton({ formatFrames = false, user }) {
	const navigate = useNavigate();
	const location = useLocation();

	const profileUrl =
		user && user.profileUrl ? user.profileUrl : defaultProfileImage;

	const dropdownToggle = (
		<div className=" tedkvn-center p-1">
			<IconLinkButton imgSrc={threeBarsIcon} btnClassName="mr-5 shadow-none" />
			<IconLinkButton
				btnClassName="shadow-none"
				btnStyle={{ maxWidth: "3rem", minHeight: "2rem" }}
				imgSrc={profileUrl}
				imgClassName="rounded-circle"
			/>
		</div>
	);

	const dropdownItems = {
		noAuth: [
			{
				src: "/login",
				isLink: true,
				title: "Log In",
				DividerBefore: false,
			},

			{
				src: "/signup",
				isLink: true,
				title: "Sign Up",
				DividerBefore: false,
			},

			{
				src: "/help",
				isLink: true,
				title: "Help Center",
				DividerBefore: true,
			},
		],
		auth: [
			{
				title: "Sign Out",
				isLink: false,
				onClickHanlder: () => {
					localStorage.removeItem(constVar.THAINOW_USER_STORRAGE_OBJ);
					if (location.pathname === "/") {
						window.location.reload();
					} else {
						navigate("/", {
							replace: true,
							state: { loginRedirectUrl: location.pathname },
						});
					}
				},
				DividerBefore: false,
			},
			{
				src: "/help",
				isLink: true,
				title: "Help Center",
				DividerBefore: true,
			},
		],
	};

	const dropdownDisplayList = user ? dropdownItems.auth : dropdownItems.noAuth;

	const ProfileDropDownButton = ({ dropdownItems = [] }) => (
		<Dropdown as={ButtonGroup} className="d-inline mx-2">
			<Dropdown.Toggle
				id="landing-page-header-profile-dropdown-button"
				className="tedkvn-caret-off py-0 rounded-pill border border-2 border-dark"
				variant={`${formatFrames ? "primary" : "link"} `}
			>
				{dropdownToggle}
			</Dropdown.Toggle>

			{dropdownItems.length > 0 && (
				<Dropdown.Menu
					id="landing-page-header-profile-dropdown-button-menu"
					align="end"
					className="rounded-3  text-center"
					flip={true}
				>
					{dropdownItems.map((item, idx) => (
						<div key={idx}>
							{item.DividerBefore && <Dropdown.Divider />}

							{item.isLink && (
								<Link to={item.src} className="text-decoration-none text-dark">
									<Dropdown.Item as="span" className="p-2">
										{item.title}
									</Dropdown.Item>
								</Link>
							)}

							{!item.isLink && (
								<Dropdown.Item as="span" className="p-2">
									<Button
										variant="white"
										onClick={item.onClickHanlder}
										className="text-decoration-none text-dark"
									>
										{item.title}
									</Button>
								</Dropdown.Item>
							)}
						</div>
					))}
				</Dropdown.Menu>
			)}
		</Dropdown>
	);

	const app = (
		<>
			<ProfileDropDownButton dropdownItems={dropdownDisplayList} />
		</>
	);

	return app;
}

export default HeaderProfileButton;

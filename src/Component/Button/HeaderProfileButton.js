import React from "react";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import IconLinkButton from "./IconLinkButton";

import defaultProfileImage from "../../Assest/Image/Profile/UserIcon_Guest.png";
import threeBarsIcon from "../../Assest/Image/Icon/3barsIcon.png";

function HeaderProfileButton({ formatFrames = false }) {
	const dropdownToggle = (
		<div className=" tedkvn-center ">
			<IconLinkButton imgSrc={threeBarsIcon} btnClassName="mr-5 shadow-none" />
			<IconLinkButton
				btnClassName="shadow-none"
				btnStyle={{ maxWidth: "55px" }}
				imgSrc={defaultProfileImage}
				imgClassName="rounded-circle"
			/>
		</div>
	);

	const dropdownItems = [
		{
			src: "login",
			title: "Log In",
			DividerAfter: false,
		},

		{
			src: "signup",
			title: "Sign Up",
			DividerAfter: true,
		},

		{
			src: "help",
			title: "Help Center",
			DividerAfter: false,
		},
	];

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
							<Dropdown.Item href={item.src} className="p-2">
								{item.title}
							</Dropdown.Item>
							{item.DividerAfter && <Dropdown.Divider />}
						</div>
					))}
				</Dropdown.Menu>
			)}
		</Dropdown>
	);

	const app = (
		<>
			<ProfileDropDownButton dropdownItems={dropdownItems} />
		</>
	);

	return app;
}

export default HeaderProfileButton;

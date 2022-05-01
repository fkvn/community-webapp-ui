import React from "react";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import NavBrand from "../Navbar/NavBrand";
import { ButtonGroup } from "react-bootstrap";

import IconLinkButton from "../Button/IconLinkButton";

import thainowLogo from "../../Assest/Image/Brand/thainowLogo.png";
import notiIcon from "../../Assest/Image/Icon/notiIcon.png";
import languageIcon from "../../Assest/Image/Icon/languageIcon.png";
import HeaderProfileButton from "../Button/HeaderProfileButton";

function LandingPageHeader({ formatFrames = false }) {
	const navbrandObjList = [
		{
			src: thainowLogo,
			alt: "ThaiNow Logo",
			size: "100",
		},
	];

	const navbrandCompList = navbrandObjList.map((navbrand, idx) => (
		<NavBrand
			key={idx}
			src={navbrand.src}
			alt={navbrand.alt}
			width={navbrand.size}
			height={navbrand.size}
		/>
	));

	const headerRightButtonGroup = (
		<ButtonGroup aria-label="Navigation Button Group" className="tedkvn-center">
			<IconLinkButton
				btnAriaLabel="Notification"
				btnVariant={`${formatFrames ? "secondary" : ""} `}
				imgSrc={notiIcon}
			/>

			<IconLinkButton
				btnAriaLabel="Language"
				btnVariant={`${formatFrames ? "secondary" : ""} `}
				imgSrc={languageIcon}
				btnClassName="mx-3"
			/>

			<HeaderProfileButton formatFrames={formatFrames} />
		</ButtonGroup>
	);

	const app = (
		<Row className={`${formatFrames ? "bg-success" : ""} px-5 my-4`}>
			<Col
				xs={4}
				id="header-left"
				className={`${formatFrames ? "bg-primary" : ""} `}
			>
				{navbrandCompList}
			</Col>

			<Col
				xs={8}
				id="header-right"
				className={`${formatFrames ? "bg-danger" : ""} tedkvn-center-right`}
			>
				<div className="float-end ">{headerRightButtonGroup}</div>
			</Col>
		</Row>
	);
	return app;
}

export default LandingPageHeader;

import { Col, Image, Row, Stack } from "react-bootstrap";
import * as asset from "../../Assest/Asset";
import SearchContainer from "../../Container/SearchContainer/SearchContainer";
import * as constVar from "../../Util/ConstVar";
import LoadingButton from "../Button/LoadingButton";

function TopBarNavigation() {
	const brandLogo = (
		<Image
			src={asset.images[`${constVar.IMAGE_THAINOW_LOGO}`]}
			fluid
			width={70}
			height={70}
			className="mx-2"
		/>
	);

	const leftTopBar = (
		<>
			<Stack direction="horizontal" gap={3} className="h-100 w-100  px-5">
				<div>{brandLogo}</div>
				<div className="mx-auto ">
					<SearchContainer />
				</div>
			</Stack>
		</>
	);

	const signupButton = (
		<LoadingButton
			id="signupbutton"
			size="md"
			title="Signup"
			buttonStyle={{ background: "#E94833" }}
			className="px-2"
		/>
	);

	const languageButton = (
		<LoadingButton
			id="languagebutton"
			size="md"
			title="Thai Language"
			buttonStyle={{ background: "#0C529C" }}
			className="px-2"
		/>
	);

	const rightTopBar = (
		<>
			<Stack
				id="top-rightbar"
				direction="horizontal"
				gap={3}
				className="h-100 w-100"
			>
				<div className="ms-auto">{languageButton}</div>
				<div>{signupButton}</div>
			</Stack>
		</>
	);

	const app = (
		<Row id="topbar" className="border-bottom border-2">
			<Col xs={12} md={9}>
				{leftTopBar}
			</Col>
			<Col xs={12} md={3}>
				{rightTopBar}
			</Col>
		</Row>
	);
	return app;
}

export default TopBarNavigation;

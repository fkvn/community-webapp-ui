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

	const leftTopBar = <div>{brandLogo}</div>;

	// const signupButton = (
	// 	<LoadingButton
	// 		id="signupbutton"
	// 		size="md"
	// 		title="Signup"
	// 		buttonStyle={{ background: "#E94833" }}
	// 		className="px-2"
	// 		onClick={() => navigate("/signup" + continueParams)}
	// 	/>
	// );

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
				className="h-100 w-100 "
			>
				<div className="mx-auto d-none d-lg-block">
					<SearchContainer expanded={true} />
				</div>

				<Stack direction="horizontal" gap={4} className="ms-auto">
					<div className="d-block d-lg-none">
						<SearchContainer expanded={false} />
					</div>
					{languageButton}
					{/* {signupButton} */}
				</Stack>
			</Stack>
		</>
	);

	const app = (
		<Row id="topbar" className="fixed-top border-bottom bg-white border-2 ">
			<Col xs={2} className="tedkvn-center">
				{leftTopBar}
			</Col>
			<Col xs={10}>{rightTopBar}</Col>
		</Row>
	);
	return app;
}

export default TopBarNavigation;

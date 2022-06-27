import { Col, Image, Row } from "react-bootstrap";
import * as asset from "../../Assest/Asset";
import SearchContainer from "../../Container/SearchContainer/SearchContainer";
import * as constVar from "../../Util/ConstVar";

function TopBarNavigation() {
	const brandLogo = (
		<Image
			src={asset.images[`${constVar.IMAGE_THAINOW_LOGO}`]}
			fluid
			width={60}
			height={60}
			className="mx-2"
		/>
	);

	const leftTopBar = (
		<>
			<div className="d-inline-block px-2">{brandLogo}</div>
			<div className="d-inline-block">
				<SearchContainer />
			</div>
		</>
	);
	const rightTopBar = <>bbb</>;

	const app = (
		<Row id="topbar" className="border-bottom border-2">
			<Col xs={12} md={9} className=" tedkvn-center px-4">
				{leftTopBar}
			</Col>
			<Col xs={12} md={3} className="bg-danger ">
				{rightTopBar}
			</Col>
		</Row>
	);
	return app;
}

export default TopBarNavigation;

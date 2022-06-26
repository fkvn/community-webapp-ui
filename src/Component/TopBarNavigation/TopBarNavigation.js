import { Col, Image, Row } from "react-bootstrap";
import * as asset from "../../Assest/Asset";
import SearchContainer from "../../Container/SearchContainer/SearchContainer";
import * as constVar from "../../Util/ConstVar";

function TopBarNavigation() {
	const brandLogo = (
		<Image
			src={asset.images[`${constVar.IMAGE_THAINOW_LOGO}`]}
			fluid
			style={{ maxWidth: "90px", maxHeight: "90px" }}
		/>
	);

	const leftTopBar = (
		<>
			{brandLogo}
			<SearchContainer />
		</>
	);
	const rightTopBar = <>bbb</>;

	const app = (
		<Row className="bg-primary" style={{ height: "7rem" }}>
			<Col xs={12} md={9} className="bg-success tedkvn-center">
				{leftTopBar}
			</Col>
			<Col xs={12} md={3} className="bg-danger tedkvn-center">
				{rightTopBar}
			</Col>
		</Row>
	);
	return app;
}

export default TopBarNavigation;

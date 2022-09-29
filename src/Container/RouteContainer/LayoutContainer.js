import { Col, Layout, Row } from "antd";
import { useState } from "react";
import { imageTopbarBg } from "../../Assest/Asset";
import LeftLayout from "../../Component/PageLayout/LeftLayout";
import RightLayout from "../../Component/PageLayout/RightLayout";
import TopBar from "../../Component/PageLayout/TopBar";
import SearchContainer from "../SearchContainer/SearchContainer";

function LayoutContainer() {
	const { Header, Content, Footer } = Layout;

	const [showRightBar, setShowRightBar] = useState(false);

	const searchRightBar = (
		<div className="tedkvn-center">
			{" "}
			<SearchContainer />
		</div>
	);
	console.log("kay");

	const layout = (
		<Row id="layout">
			<Col xs={24}>
				<Header
					className="fixed-top tedkvn-center p-0"
					style={{ backgroundImage: `url(${imageTopbarBg})` }}
				>
					<TopBar setShowRightBar={() => setShowRightBar(!showRightBar)} />
				</Header>
				<Content>
					<Row>
						<Col xs={24} lg={18}>
							{showRightBar ? <RightLayout /> : <LeftLayout />}
						</Col>
						<Col xs={0} lg={6}>
							<RightLayout style={{ maxWidth: "25%" }} />
						</Col>
					</Row>
				</Content>
			</Col>
		</Row>
	);

	const app = <>{layout}</>;

	return app;
}

export default LayoutContainer;

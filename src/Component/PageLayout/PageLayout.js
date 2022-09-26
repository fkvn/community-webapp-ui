import { Col, Layout, Row } from "antd";
import { imageTopbarBg } from "../../Assest/Asset";
import LeftLayout from "./LeftLayout";
import RightLayout from "./RightLayout";
import TopBar from "./TopBar";

function PageLayout({ keywords = "" }) {
	const { Header, Content, Footer } = Layout;

	const app = (
		<Row id="layout">
			<Col xs={24}>
				<Header
					className="fixed-top tedkvn-center p-0"
					style={{ backgroundImage: `url(${imageTopbarBg})` }}
				>
					<TopBar keywords={keywords} />
				</Header>
				<Content>
					<Row>
						<Col xs={24} lg={18}>
							<LeftLayout />
						</Col>
						<Col xs={0} lg={6}>
							<RightLayout />
						</Col>
					</Row>
				</Content>
			</Col>
		</Row>
	);

	return app;
}

export default PageLayout;

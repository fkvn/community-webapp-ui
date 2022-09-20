import { Col, Layout, Row } from "antd";
import TopBar from "../TopBar/TopBar";

function PageLayout({ keywords = "" }) {
	const { Header, Content, Footer } = Layout;

	const app = (
		<Row id="layout">
			<Col xs={24}>
				<Header className="fixed-top tedkvn-center p-0">
					<TopBar keywords={keywords} />
				</Header>
				<Content>
					<Row>
						<Col xs={24} lg={18}>
							Left
						</Col>
						<Col xs={0} lg={6}>
							Right
						</Col>
					</Row>
				</Content>
				<Footer className=""> </Footer>
			</Col>
		</Row>
	);

	return app;
}

export default PageLayout;

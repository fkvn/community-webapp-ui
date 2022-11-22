import { Col, Grid, Layout, Row } from "antd";
import LeftLayout from "../../Component/PageLayout/LeftLayout";
import RightLayout from "../../Component/PageLayout/RightLayout";
import TopBar from "../../Component/PageLayout/TopBar/TopBar";

function LayoutContainer() {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const { Header } = Layout;

	const layout = (
		<Row id="layout" justify="center">
			<Col xs={24}>
				<Header className="fixed-top p-0">
					<TopBar />
				</Header>

				<Row id="layout-main" justify="space-between">
					<Col xs={24} xxl={18}>
						<LeftLayout />
					</Col>
					<Col xs={0} xxl={6}>
						<RightLayout />
					</Col>
				</Row>
			</Col>
		</Row>
	);

	const app = <>{layout}</>;

	return app;
}

export default LayoutContainer;

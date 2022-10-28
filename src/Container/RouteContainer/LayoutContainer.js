import { Col, Grid, Layout, Row } from "antd";
import { imageTopbarBgMobile } from "../../Assest/Asset";
import LeftLayout from "../../Component/PageLayout/LeftLayout";
import RightLayout from "../../Component/PageLayout/RightLayout";
import TopBar from "../../Component/PageLayout/TopBar/TopBar";

function LayoutContainer() {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const { Header } = Layout;
	console.log(screens);

	const layout = (
		<Row id="layout" justify="center">
			<Col xs={24}>
				<Header
					className="fixed-top p-0"
					style={{
						backgroundImage: `url(${
							screens?.md ? imageTopbarBgMobile : imageTopbarBgMobile
						})`,
					}}
				>
					<TopBar />
				</Header>

				<Row id="layout-main" justify="space-between">
					<Col xs={24} xl={18}>
						<LeftLayout />
					</Col>
					<Col xs={0} xl={6}>
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

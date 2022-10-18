import { Col, Grid, Layout, Row } from "antd";
import { imageTopbarBg, imageTopbarBgMobile } from "../../Assest/Asset";
import LeftLayout from "../../Component/PageLayout/LeftLayout";
import RightLayout from "../../Component/PageLayout/RightLayout";
import TopBar from "../../Component/PageLayout/TopBar/TopBar";

function LayoutContainer() {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const { Header, Content } = Layout;

	const layout = (
		<Row id="layout">
			<Col xs={24} xxl={{ span: 18, offset: 3 }}>
				{screens?.xs === true || screens?.sm === true ? (
					<Header
						className="fixed-top tedkvn-center p-0"
						style={{ backgroundImage: `url(${imageTopbarBgMobile})` }}
					>
						<TopBar />
					</Header>
				) : (
					<Header
						className="fixed-top tedkvn-center p-0 d-none d-md-block"
						style={{ backgroundImage: `url(${imageTopbarBg})` }}
					>
						<TopBar />
					</Header>
				)}

				<Content className="mx-3">
					<Row>
						<Col xs={24} xl={18}>
							<LeftLayout />
						</Col>
						<Col xs={0} xl={6}>
							<RightLayout
								style={{ maxWidth: screens?.xxl === true ? "20%" : "25%" }}
							/>
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

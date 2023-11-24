import { Col, Layout, Row } from "antd";
import HeaderContainer from "./Header/HeaderContainer";

function SPALayout() {
	const { Header } = Layout;

	const layout = (
		<Row id="layout" justify="center">
			<Col xs={24}>
				<Header
					className=" p-0 bg-white"
					style={{
						position: "sticky",
						top: 0,
						zIndex: 1,
						maxHeight: "100px",
						overflow: "hidden",
					}}
				>
					<HeaderContainer />
				</Header>

				{/* <Row id="layout-main" justify="space-between">
					<Col xs={24} xxl={18}>
						<LeftLayout />
					</Col>
					<Col xs={0} xxl={6}>
						<RightLayout />
					</Col>
				</Row> */}
			</Col>
		</Row>
	);

	const App = () => <>{layout}</>;

	return <App />;
}

export default SPALayout;

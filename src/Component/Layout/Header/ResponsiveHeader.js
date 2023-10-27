import { Col, Grid, Row } from "antd";
import DefaultHeader from "./DefaultHeader";

function ResponsiveHeader() {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const app = (
		<Row>
			<Col xs={24}>
				<DefaultHeader />
				<hr className="m-0" />
				{/* {isEmptyObject(screens) ||
				(screens.xs === false && screens.xxl === true) ? (
					<DefaultTopBar />
				) : (
					<MobileTopBar />
				)} */}
			</Col>
		</Row>
	);

	return app;
}

export default ResponsiveHeader;

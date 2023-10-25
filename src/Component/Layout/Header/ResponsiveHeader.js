import { Col, Grid, Row } from "antd";

function ResponsiveHeader() {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const app = (
		<Row>
			<Col xs={24}>
				<p className="text-white">ResponsiveHeader</p>
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

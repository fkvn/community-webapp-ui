import { Col, Grid, Row } from "antd";
import { isEmptyObject } from "jquery";
import DefaultTopBar from "./DefaultTopBar";
import MobileTopBar from "./MobileTopBar";
function TopBar() {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const app = (
		<Row>
			<Col xs={24}>
				{isEmptyObject(screens) ||
				(screens?.xs === false && screens?.xl === true) ? (
					<DefaultTopBar />
				) : (
					<MobileTopBar />
				)}
			</Col>
		</Row>
	);

	return app;
}

export default TopBar;

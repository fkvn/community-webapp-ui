import { Col, Row } from "antd";
import DefaultHeader from "./DefaultHeader";

function HeaderContainer() {
	// const { useBreakpoint } = Grid;
	// const screens = useBreakpoint();

	const App = () => (
		<Row>
			<Col xs={24}>
				<DefaultHeader />

				{/* {isEmptyObject(screens) ||
				(screens.xs === false && screens.xxl === true) ? (
					<DefaultTopBar />
				) : (
					<MobileTopBar />
				)} */}
			</Col>
		</Row>
	);

	return <App />;
}

export default HeaderContainer;

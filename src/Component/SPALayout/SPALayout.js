import { Col, Layout, Row } from "antd";
import { Outlet } from "react-router-dom";
import HeaderContainer from "./Header/HeaderContainer";

function SPALayout() {
	const { Header } = Layout;

	// const bodyRoutes = (
	// 	<Switch>
	// 		<Route index element={<>test signup</>}></Route>
	// 		<Route path="test" element={<NotFound />} />
	// 	</Switch>
	// );

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

				{/* Outlet is the component allows nested component   */}
				<Outlet />
			</Col>
		</Row>
	);

	const App = () => <>{layout}</>;

	return <App />;
}

export default SPALayout;

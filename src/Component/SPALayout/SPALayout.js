import { Col, Divider, Layout, Row } from "antd";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import HeaderContainer from "./Header/HeaderContainer";

function SPALayout() {
	const { Header } = Layout;

	const layout = (
		<Row
			id="layout"
			justify="center"
			style={{
				backgroundColor: "#f6f6fb",
			}}
		>
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
				<Divider className="m-0 p-0" />
				{/* Outlet is the component allows nested component at this area*/}
				<Outlet />
				<div
					style={
						{
							// maxHeight: "100px",
							// overflow: "hidden",
						}
					}
				>
					<Footer />
				</div>
			</Col>
		</Row>
	);

	const App = () => <>{layout}</>;

	return <App />;
}

export default SPALayout;

import { Divider, Flex, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import HeaderContainer from "./Header/HeaderContainer";

function MainLayout() {
	const { Header } = Layout;

	const layout = (
		<Flex
			id="layout"
			justify="center"
			style={{
				backgroundColor: "#f6f6fb",
			}}
			vertical
		>
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
				<Divider className="m-0 p-0" />
			</Header>
			{/* start main body outlet */}
			<Outlet />
			{/* end main body outlet */}
			<Footer />
		</Flex>
	);

	const App = () => <>{layout}</>;

	return <App />;
}

export default MainLayout;

import { Grid } from "antd";
import { Stack } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import DefaultTopBar from "./DefaultTopBar";
import MobileSearchTopBar from "./MobileSearchTopBar";

function TopBar() {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const app = (
		<Stack
			direction="vertical"
			id="topbar"
			className="mx-4 mx-lg-5 w-100 overflow-hidden"
			gap={2}
		>
			{!screens?.xs ? (
				<DefaultTopBar />
			) : (
				<Routes>
					<Route path="/search" element={<MobileSearchTopBar />} />
					<Route path="*" element={<DefaultTopBar />} />
				</Routes>
			)}
		</Stack>
	);

	return app;
}

export default TopBar;

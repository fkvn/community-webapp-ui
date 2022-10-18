import { Grid } from "antd";
import { Stack } from "react-bootstrap";
import DefaultTopBar from "./DefaultTopBar";
import MobileTopBar from "./MobileTopBar";
function TopBar() {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	console.log(
		screens?.xs === true || (screens?.xs === false && screens?.xl === false)
	);

	const app = (
		<Stack
			direction="vertical"
			id="topbar"
			className="mx-4 mx-xl-5 w-100 overflow-hidden"
			gap={2}
		>
			{!screens?.xs === true && screens?.xl === true ? (
				<DefaultTopBar />
			) : (
				<MobileTopBar />
			)}

			{/* {screens?.xs === true ||
				(screens?.xs === false && screens?.xl === false && )} */}
		</Stack>
	);

	return app;
}

export default TopBar;

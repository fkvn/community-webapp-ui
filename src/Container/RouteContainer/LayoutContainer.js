import { Stack } from "react-bootstrap";
import RightBar from "../../Component/RightBar/RightBar";
import TopBarNavigation from "../../Component/TopBarNavigation/TopBarNavigation";
import * as constVar from "../../Util/ConstVar";

function LayoutContainer({ user }) {
	const test = constVar.ERROR;

	const app = (
		<>
			<TopBarNavigation />
			<Stack
				direction="horizontal"
				className="w-100"
				gap={3}
				style={{ marginTop: "5rem" }}
			>
				<div id="left-bar" className="col-9 px-5"></div>
				<div id="right-bar" className="col-3 h-100 px-3">
					<RightBar />
				</div>
			</Stack>
			{/* <LandingPage user={user} />; */}
		</>
	);

	return app;
}

export default LayoutContainer;

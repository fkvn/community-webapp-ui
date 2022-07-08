import { Stack } from "react-bootstrap";
import ProfilePanelContainer from "../../Container/ProfilePanelContainer";

function RightBar() {
	const profilePanel = <ProfilePanelContainer />;
	const actionPanel = <></>;
	const newsPanel = <></>;

	const app = (
		<Stack gap={3} className="mx-auto w-100">
			{profilePanel}
			{actionPanel}
			{newsPanel}
		</Stack>
	);
	return app;
}

export default RightBar;

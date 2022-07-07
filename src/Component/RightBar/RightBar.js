import { Image, Stack } from "react-bootstrap";
import * as asset from "../../Assest/Asset";
import * as constVar from "../../Util/ConstVar";

function RightBar() {
	const profilePanel = (
		<Stack className="mx-auto mt-4" gap={3}>
			<div className="polygon">
				<Image
					id="shape"
					src={asset.images[`${constVar.IMAGE_GUEST_PROFILE}`]}
					fluid
				/>
			</div>
		</Stack>
	);
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

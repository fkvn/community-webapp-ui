import * as asset from "../../Assest/Asset";
import * as constVar from "../../Util/ConstVar";
import ImageFrame from "../ImageFrame/ImageFrame";

function GuestProfilePanel() {
	const app = (
		<>
			<ImageFrame
				frameClassName="polygon"
				customFrameStyle={true}
				src={asset.images[`${constVar.IMAGE_GUEST_PROFILE}`]}
				fluid
			/>
		</>
	);
	return app;
}

export default GuestProfilePanel;

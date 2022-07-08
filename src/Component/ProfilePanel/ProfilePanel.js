import { Stack } from "react-bootstrap";
import * as constVar from "../../Util/ConstVar";
import ImageFrame from "../ImageFrame/ImageFrame";

function ProfilePanel(props) {
	const { user = {}, company = {}, ...type } = props;

	// const [profile, setProfile] = useState({
	// 	[`${constVar.PROFILE_URL_PROP}`]: asset.images[`${constVar.IMAGE_GUEST_PROFILE}`],
	// });

	const getProfileUrl = (type = "") => {
		switch (type) {
			case constVar.PROFILE_USER_TYPE_PROP:
				return user.profileUrl;
			default:
				break;
		}
	};

	const ProfilePicture = ({ type = "" }) => (
		<ImageFrame
			frameClassName="polygon"
			customFrameStyle={true}
			src={getProfileUrl(type)}
			fluid
		/>
	);

	const app = (
		<Stack id="profile-panel" className="mx-auto" gap={3}>
			<ProfilePicture type={type[`${constVar.PROFILE_TYPE_PROP}`]} />
		</Stack>
	);
	return app;
}

export default ProfilePanel;

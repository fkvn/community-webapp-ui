import { Stack } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import * as asset from "../../Assest/Asset";
import * as constVar from "../../Util/ConstVar";
import LoadingButton from "../Button/LoadingButton";
import ImageFrame from "../ImageFrame/ImageFrame";

function ProfilePanel({ ...profile }) {
	const navigate = useNavigate();
	const location = useLocation();

	const UploadPhotoButton = ({ uploadPhotoOnClickHandler = () => {} }) => (
		<LoadingButton
			title="Upload Photo"
			variant="link"
			size="sm"
			onClick={uploadPhotoOnClickHandler}
		/>
	);

	const signupButton = (
		<LoadingButton
			id="signupbutton"
			variant="link"
			size="md"
			title="Register ThaiNow Account !"
			className="px-2 w-100"
			onClick={() =>
				navigate("/signup", {
					state: {
						continue: location.pathname + location.search,
					},
				})
			}
		/>
	);

	const TopBar = ({ type = constVar.PROFILE_GUEST_TYPE_PROP }) => (
		<div>
			<Stack direction="horizontal" className="mt-2 ">
				{type === constVar.PROFILE_GUEST_TYPE_PROP && signupButton}

				{(type === constVar.PROFILE_USER_TYPE_PROP ||
					type === constVar.PROFILE_COMPANY_TYPE_PROP) && (
					<>
						<LoadingButton
							variant="none"
							size="sm"
							iconOnly={true}
							withIcon={true}
							iconSrc={asset.icons[`${constVar.ICON_NOTIFICATION_BLACK}`]}
						/>
						<div className="ms-auto">
							<LoadingButton
								variant="none"
								size="sm"
								iconOnly={true}
								withIcon={true}
								iconSrc={asset.icons[`${constVar.ICON_THREE_BARS_BLACK}`]}
							/>
						</div>
					</>
				)}
			</Stack>
			<hr className=" my-2" />
		</div>
	);

	const ProfilePicture = ({
		type = constVar.PROFILE_GUEST_TYPE_PROP,
		uploadPhotoOnClickHandler = () => {},
	}) => (
		<Stack gap={1} className="mx-auto">
			<ImageFrame
				frameClassName="polygon"
				customFrameStyle={true}
				src={profile[`${constVar.PROFILE_URL_PROP}`]}
				fluid
			/>
			{(type === constVar.PROFILE_USER_TYPE_PROP ||
				type === constVar.PROFILE_COMPANY_TYPE_PROP) && (
				<UploadPhotoButton
					uploadPhotoOnClickHandler={uploadPhotoOnClickHandler}
				/>
			)}
		</Stack>
	);

	console.log(profile);

	const ProfileName = ({ name = "" }) => (
		<div className="text-center fs-4">Hi, {name}</div>
	);

	const MyProfileButton = ({
		type = constVar.PROFILE_GUEST_TYPE_PROP,
		myProfileOnClickHander = () => {},
	}) => (
		<>
			<LoadingButton
				title={`${
					type === constVar.PROFILE_GUEST_TYPE_PROP ? "Sign In" : "My Profile"
				}`}
				size="sm"
				variant="primary"
				onClick={myProfileOnClickHander}
			/>
		</>
	);

	const Body = ({ profile = {} }) => (
		<>
			<Stack gap={2}>
				<ProfilePicture
					type={profile[`${constVar.PROFILE_GUEST_TYPE_PROP}`]}
					uploadPhotoOnClickHandler={
						profile[`${constVar.UPLOAD_PHOTO_HANDLER}`]
					}
				/>
				<Stack gap={3}>
					<Stack gap={1}>
						<ProfileName name={profile[`${constVar.USERNAME_PROP}`]} />
						{(profile[`${constVar.PROFILE_TYPE_PROP}`] ===
							constVar.PROFILE_USER_TYPE_PROP ||
							profile[`${constVar.PROFILE_TYPE_PROP}`] ===
								constVar.PROFILE_COMPANY_TYPE_PROP) && (
							<LoadingButton
								variant="link"
								title="Switch Profile"
								className="shadow-none"
								onClick={() =>
									navigate("/switch-profile", {
										state: {
											continue: location.pathname + location.search,
										},
									})
								}
							/>
						)}
					</Stack>

					<Stack direction="horizontal" gap={5} className="mx-auto">
						<MyProfileButton
							type={profile[`${constVar.PROFILE_TYPE_PROP}`]}
							myProfileOnClickHander={
								profile[`${constVar.VISIT_MY_PROFILE_HANDLER}`]
							}
						/>

						<div className="ms-auto">
							{profile[`${constVar.PROFILE_TYPE_PROP}`] ===
								constVar.PROFILE_USER_TYPE_PROP ||
							profile[`${constVar.PROFILE_TYPE_PROP}`] ===
								constVar.PROFILE_COMPANY_TYPE_PROP ? (
								<LoadingButton
									title={`Sign Out`}
									size="sm"
									variant="secondary"
									onClick={() => navigate("/signout")}
								/>
							) : (
								<LoadingButton
									title={`Need Help?`}
									size="sm"
									variant="secondary"
									onClick={() => {}}
								/>
							)}
						</div>
					</Stack>
				</Stack>
			</Stack>
		</>
	);

	const app = (
		<>
			<Stack id="profile-panel" className="mx-auto w-100" gap={2}>
				<TopBar type={profile[`${constVar.PROFILE_TYPE_PROP}`]} />
				<Body profile={profile} />
			</Stack>
		</>
	);

	return app;
}

export default ProfilePanel;

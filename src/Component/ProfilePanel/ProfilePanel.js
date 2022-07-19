import { Stack } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import * as asset from "../../Assest/Asset";
import UploadAvatarContainer from "../../Container/UploadAvatarContainer";
import * as constVar from "../../Util/ConstVar";
import LoadingButton from "../Button/LoadingButton";
import ImageFrame from "../ImageFrame/ImageFrame";

function ProfilePanel({
	isSignedIn = false,
	id = "profile-panel",
	name = "",
	profileUrl = asset.images[`${constVar.IMAGE_GUEST_PROFILE}`],
	uploadPhotoOnClick = () => {},
	myProfileOnClickHander = () => {},
}) {
	const navigate = useNavigate();
	const location = useLocation();

	const UploadPhotoButton = () => (
		<UploadAvatarContainer
			className="text-center w-100"
			uploadPhotoOnClick={uploadPhotoOnClick}
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

	const TopBar = () => (
		<div>
			<Stack direction="horizontal" className="mt-2 ">
				{!isSignedIn && signupButton}

				{isSignedIn && (
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
								title={`Sign Out`}
								size="sm"
								variant="secondary "
								onClick={() => navigate("/signout")}
							/>

							{/* <LoadingButton
								variant="none"
								size="sm"
								iconOnly={true}
								withIcon={true}
								iconSrc={asset.icons[`${constVar.ICON_THREE_BARS_BLACK}`]}
							/> */}
						</div>
					</>
				)}
			</Stack>
			<hr className=" my-2" />
		</div>
	);

	const ProfilePicture = () => (
		<Stack gap={1} className="mx-auto">
			<ImageFrame
				frameClassName="polygon"
				customFrameStyle={true}
				src={profileUrl}
				fluid
			/>
			{isSignedIn && <UploadPhotoButton />}
		</Stack>
	);

	const ProfileName = () => (
		<div className="text-center fs-4">Hi, {name !== "" ? name : "welcome"}</div>
	);

	const MyProfileButton = () => (
		<>
			<LoadingButton
				title={`${!isSignedIn ? "Sign In" : "My Profile"}`}
				size="sm"
				variant="primary"
				onClick={myProfileOnClickHander}
			/>
		</>
	);

	const Body = ({ profile = {} }) => (
		<>
			<Stack gap={2}>
				<ProfilePicture />
				<Stack gap={3}>
					<Stack gap={1}>
						<ProfileName name={profile[`${constVar.USERNAME_PROP}`]} />
					</Stack>

					<Stack direction="horizontal" gap={5} className="mx-auto">
						{!isSignedIn ? (
							<LoadingButton
								// variant="info"
								size="sm"
								title="Sign In"
								className="shadow-none "
								onClick={() =>
									navigate("/signin", {
										state: {
											continue: location.pathname + location.search,
										},
									})
								}
							/>
						) : (
							<MyProfileButton />
						)}

						<div className="ms-auto">
							{isSignedIn ? (
								<LoadingButton
									// variant="info"
									size="sm"
									title="Switch Profile"
									className="shadow-none "
									onClick={() =>
										navigate("/switch-profile", {
											state: {
												continue: location.pathname + location.search,
											},
										})
									}
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
			{/* {isUploadPhoto && <UploadAvatarContainer />} */}
			<Stack id={id} className="mx-auto w-100" gap={2}>
				<TopBar />
				<Body />
			</Stack>
		</>
	);

	return app;
}

export default ProfilePanel;

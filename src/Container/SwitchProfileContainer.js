import { useEffect } from "react";
import { Button, Card, Col, Row, Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as asset from "../Assest/Asset";
import LoadingButton from "../Component/Button/LoadingButton";
import ImageFrame from "../Component/ImageFrame/ImageFrame";
import * as dispatchPromise from "../redux-store/dispatchPromise";
import * as constVar from "../Util/ConstVar";
import OffCanvasContainer from "./OffCanvasContainer";

function SwitchProfileContainer() {
	const navigate = useNavigate();

	const location = useLocation();

	const continueURL = location?.state?.continue || "/";

	console.log(location);

	const user = useSelector(
		(state) => state.thainowReducer[`${constVar.THAINOW_USER_OBJ}`] || {}
	);

	const profile = useSelector(
		(state) => state.thainowReducer[`${constVar.THAINOW_PROFILE_OBJ}`] || {}
	);

	const showOffCanvas = useSelector(
		(state) =>
			state.thainowReducer[`${constVar.THAINOW_OFF_CANVAS_OBJ}`]?.[
				`${constVar.SHOW_OFF_CANVAS}`
			] || false
	);

	const onCloseHandler = () => {
		navigate(continueURL);
	};

	useEffect(() => {
		const [storageUser, storageProfile] = [
			JSON.parse(localStorage.getItem(constVar.THAINOW_USER_OBJ || {})),
			JSON.parse(localStorage.getItem(constVar.THAINOW_PROFILE_OBJ || {})),
		];

		if (JSON.stringify(storageUser) !== "{}" && JSON.stringify(user) === "{}") {
			dispatchPromise.patchUserInfo({ ...storageUser }, true);
		}

		if (
			JSON.stringify(storageProfile) !== "{}" &&
			JSON.stringify(profile) === "{}"
		) {
			dispatchPromise.patchProfileInfo({ ...storageProfile }, true);
		}
	}, [profile, user]);

	useEffect(() => {
		if (!showOffCanvas) {
			dispatchPromise.patchOffCanvasInfo({
				[`${constVar.SHOW_OFF_CANVAS}`]: true,
			});
		}
	}, [showOffCanvas]);

	const title = (
		<div className="w-100 text-center">
			<div className="fs-3">
				{" "}
				Choose How to interact in{" "}
				<span style={{ color: "#E94833" }}>ThaiNow</span> community
			</div>
		</div>
	);

	const switchAccount = (
		<LoadingButton title="Switch to different account" variant="link" />
	);

	const subTitle = (
		<div className="w-100 text-center text-muted">
			You will post, comment, and react as your current signed-profile below
		</div>
	);

	const titleSection = (
		<Stack gap={3}>
			{title}
			{switchAccount}
			{subTitle}
		</Stack>
	);

	// company list - except the one that is current profile
	const companyProfiles = (user?.companies || []).reduce(
		(res, company) => [
			...res,
			company.id !== profile.id && {
				[`${constVar.ID_PROP}`]: company.id,
				[`${constVar.PROFILE_TYPE_PROP}`]: constVar.PROFILE_COMPANY_TYPE_PROP,
				[`${constVar.PROFILE_URL_PROP}`]: company.logoUrl,
				[`${constVar.PROFILE_NAME_PROP}`]: company.name,
				[`${constVar.DISABLED_PROP}`]:
					company?.status === constVar.PENDING_STATUS_PROP || false,
				[`${constVar.PROFILE_COMPANY_TYPE_PROP}`]: { ...company },
			},
		],
		[]
	);

	const totalProfiles = [
		profile,
		...(user.user?.id !== profile?.id
			? [
					{
						[`${constVar.ID_PROP}`]: user.user?.id,
						[`${constVar.PROFILE_TYPE_PROP}`]: constVar.PROFILE_USER_TYPE_PROP,
						[`${constVar.PROFILE_URL_PROP}`]: user.user?.profileUrl,

						[`${constVar.PROFILE_NAME_PROP}`]: user.user?.username,
						[`${constVar.PROFILE_USER_TYPE_PROP}`]: { ...user.user },
					},
			  ]
			: []),
		...companyProfiles,
	];

	// + 1 = 1 for add new account
	const totalCard = totalProfiles.length + 1;

	const profileGrid = (
		<Row xs={2} md={totalCard} className="g-4 text-center">
			{totalProfiles.map((profile, idx) => (
				<Col key={idx}>
					<Button
						className="p-0 m-0 border-0 "
						disabled={
							(idx > 1 && profile[`${constVar.DISABLED_PROP}`]) || false
						}
						onClick={() => {}}
					>
						<Card
							className={`${idx === 0 && "text-white"} border-0 py-3 px-4`}
							style={{
								background:
									idx === 0
										? "linear-gradient(142.18deg, #a73ee7 12.72%, #00ebff 89.12%)"
										: "white",
							}}
						>
							<div className="w-100 tedkvn-center py-2 rounded ">
								<ImageFrame
									frameClassName="polygon"
									customFrameStyle={true}
									src={profile[`${constVar.PROFILE_URL_PROP}`]}
									fluid
								/>
							</div>

							<Card.Body className="pt-2">
								<Card.Title>
									{profile[`${constVar.PROFILE_NAME_PROP}`]}
								</Card.Title>
								<Card.Text>
									{idx === 0 ? "(current signed-profile)" : ""}
								</Card.Text>
							</Card.Body>
						</Card>
					</Button>
				</Col>
			))}
			<Col>
				<Button
					variant="white"
					className="p-0 m-0 "
					onClick={() =>
						navigate("/signup/business", {
							state: {
								returnUrl: "/switch-profile",
								continue: continueURL,
							},
						})
					}
				>
					<Card
						className="py-3"
						style={{
							background: "#F8F8F8",
						}}
					>
						<div className="w-100 tedkvn-center rounded">
							<ImageFrame
								frameClassName="polygon"
								customFrameStyle={true}
								src={asset.images[`${constVar.IMAGE_ADD_FRAME}`]}
								fluid
							/>
						</div>

						<Card.Body className="">
							<Card.Title>New Business Profile</Card.Title>
						</Card.Body>
					</Card>
				</Button>
			</Col>
		</Row>
	);

	const app = (
		<OffCanvasContainer onClose={onCloseHandler}>
			<Stack
				gap={5}
				className={`mt-5 col-12 col-md-${totalCard < 4 ? "6" : "8"} mx-auto`}
			>
				{titleSection}
				{profileGrid}
			</Stack>
		</OffCanvasContainer>
	);
	return app;
}

export default SwitchProfileContainer;

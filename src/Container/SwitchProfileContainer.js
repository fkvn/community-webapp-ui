import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner, Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as asset from "../Assest/Asset";
import * as axiosPromise from "../Axios/axiosPromise";
import LoadingButton from "../Component/Button/LoadingButton";
import ImageFrame from "../Component/ImageFrame/ImageFrame";
import * as dispatchPromise from "../redux-store/dispatchPromise";
import * as constVar from "../Util/ConstVar";
import { patchProfileInfo } from "../Util/Util";
import OffCanvasContainer from "./OffCanvasContainer";

function SwitchProfileContainer() {
	const navigate = useNavigate();

	const location = useLocation();

	const continueURL = location?.state?.continue || "/";

	const user = useSelector(
		(state) => state.thainowReducer[`${constVar.THAINOW_USER_OBJ}`] || {}
	);

	const [companies, setCompanies] = useState([]);

	const profile = useSelector(
		(state) => state.thainowReducer[`${constVar.THAINOW_PROFILE_OBJ}`] || {}
	);

	const showOffCanvas = useSelector(
		(state) =>
			state.thainowReducer[`${constVar.THAINOW_OFF_CANVAS_OBJ}`]?.[
				`${constVar.SHOW_OFF_CANVAS}`
			] || false
	);

	useEffect(() => {
		if (!showOffCanvas) {
			dispatchPromise.patchOffCanvasInfo({
				[`${constVar.SHOW_OFF_CANVAS}`]: true,
			});
		}
	}, [showOffCanvas]);

	useEffect(() => {
		const [storageUser, storageProfile] = [
			JSON.parse(localStorage.getItem(constVar.THAINOW_USER_OBJ || {}))?.user ||
				{},
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

		if (JSON.stringify(user) !== "{}") {
			axiosPromise
				.getUserCompanies(user?.id)
				.then((res = []) => {
					// no error
					dispatchPromise.submitErrorHandler("", false);
					// set companies
					setCompanies(res);
				})
				.catch(() => {
					onCloseHandler();
				});
		}
	}, [profile, user]);

	const onCloseHandler = () => {
		navigate(continueURL);
	};

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
			You will post, comment, and react as your current signed-profile
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
	const companyProfiles = companies.reduce(
		(res, company) =>
			company.id !== profile.id
				? [
						...res,
						{
							...patchProfileInfo({
								type: constVar.PROFILE_COMPANY_TYPE_PROP,
								company: company,
							}),
							[`${constVar.DISABLED_PROP}`]:
								company?.status === constVar.PENDING_STATUS_PROP || false,

							...(company?.status === constVar.PENDING_STATUS_PROP && {
								[`${constVar.COMPANY_STATUS_PROP}`]: company.status,
							}),
						},
				  ]
				: res,
		[]
	);

	const sortedCompanyProfiles = [...companyProfiles].sort(
		(a, b) =>
			b[`${constVar.COMPANY_STATUS_PROP}`] -
			a[`${constVar.COMPANY_STATUS_PROP}`]
	);

	const totalProfiles = [
		profile,
		...(user?.id !== profile?.id
			? [
					{
						...patchProfileInfo({
							type: constVar.PROFILE_USER_TYPE_PROP,
							user: user,
						}),
						[`${constVar.DISABLED_PROP}`]: false,
					},
			  ]
			: []),
		...sortedCompanyProfiles,
	];

	// + 1 = 1 for add new account
	const totalCard = totalProfiles.length + 1;

	const onSwitchProfileHanlder = (profile = {}) => {
		if (JSON.stringify(profile) !== "{}") {
			// save to storage
			localStorage.setItem(
				constVar.THAINOW_PROFILE_OBJ,
				JSON.stringify(profile)
			);

			dispatchPromise.patchProfileInfo({ ...profile }, true);

			navigate(continueURL);
		} else {
			dispatchPromise.submitErrorHandler(
				"Switch Profile Failed. Please try again later or contact administrator!"
			);
		}
	};

	const profileGrid = (
		<Row xs={1} md={totalCard > 3 ? 3 : totalCard} className="g-4  text-center">
			{totalProfiles.map((profile, idx) => (
				<Col key={idx} className="h-100">
					<Button
						className="p-0 m-0 w-100   border-opacity-25"
						disabled={
							(idx > 0 && profile[`${constVar.DISABLED_PROP}`]) || false
						}
						onClick={() => onSwitchProfileHanlder(profile)}
					>
						<Card
							className={`${
								idx === 0 ? "text-white" : "text-dark"
							} border-0 py-3 px-4`}
							style={{
								background:
									idx === 0
										? "linear-gradient(142.18deg, #a73ee7 12.72%, #00ebff 89.12%)"
										: "aliceblue",
							}}
							// style={{
							// 	background:
							// 		idx === 0 &&
							// 		"linear-gradient(142.18deg, #a73ee7 12.72%, #00ebff 89.12%)",
							// }}
						>
							<div className="w-100 tedkvn-center py-2 rounded ">
								<ImageFrame
									frameClassName="polygon"
									customFrameStyle={true}
									src={profile[`${constVar.PROFILE_URL_PROP}`]}
									fluid
								/>
							</div>

							<Card.Body className="pt-2 ">
								<Card.Title className="">
									{profile[`${constVar.PROFILE_NAME_PROP}`]}
								</Card.Title>
								<Card.Text>
									{idx === 0
										? "(current signed-profile)"
										: profile[`${constVar.COMPANY_STATUS_PROP}`]
										? `(${profile[`${constVar.COMPANY_STATUS_PROP}`]})`
										: ""}
								</Card.Text>
							</Card.Body>
						</Card>
					</Button>
				</Col>
			))}
			<Col>
				<Button
					variant="white"
					className="p-0 m-0 bg-dark"
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
						className="py-3 bg-light"
						// style={{
						// 	background: "#F8F8F8",
						// }}
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
				{JSON.stringify(user) === "{}" && (
					<div className="tedkvn-center position-relative">
						<div>
							<Spinner animation="border" role="status" />
						</div>
						<div className="mx-4">
							Loading...
							<span className="text-danger">
								{" "}
								Please come back later if it is taking too long!
							</span>
						</div>
					</div>
				)}
				{profileGrid}
			</Stack>
		</OffCanvasContainer>
	);
	return app;
}

export default SwitchProfileContainer;

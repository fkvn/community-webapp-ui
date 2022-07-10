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

	const users = localStorage.getItem(constVar.THAINOW_USER_OBJ) || [];

	const profile = useSelector(
		(state) => state.thainowReducer[`${constVar.THAINOW_PROFILE_OBJ}`] || {}
	);

	const onCloseHandler = () => {
		navigate(continueURL);
	};

	useEffect(() => {
		if (users.length === 0) navigate(continueURL);

		dispatchPromise.patchOffCanvasInfo({
			[`${constVar.SHOW_OFF_CANVAS}`]: true,
		});
	});

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

	// company list
	const companies = profile[`${constVar.COMPANY_LIST}`];

	// + 2 = 1 for current account, 1 for add new account
	const totalCard = companies + 2;

	const profileGrid = (
		<Row xs={2} md={totalCard} className="g-4 text-center">
			{Array.from({ length: totalCard }).map((_, idx) => (
				<Col key={idx}>
					<Button
						variant="white"
						className="p-0 m-0"
						disabled={
							idx > 1 &&
							companies[idx + 1].status === constVar.PENDING_STATUS_PROP
						}
						onClick={() => {}}
					>
						<Card>
							<div
								className="w-100 tedkvn-center py-2 rounded"
								style={{
									background:
										"linear-gradient(142.18deg, #a73ee7 12.72%, #00ebff 89.12%)",
								}}
							>
								<ImageFrame
									frameClassName="polygon"
									customFrameStyle={true}
									src={
										idx === 0
											? profile.user.profileUrl
											: idx === totalCard - 1
											? asset.images[`${constVar.IMAGE_ADD_FRAME}`]
											: asset.images[`${constVar.IMAGE_BUSINESS_PROFILE}`]
									}
									fluid
								/>
							</div>

							<Card.Body className="mt-4 pt-0">
								<Card.Title>
									{/* {
								idx === 0 ? :	
								} */}
								</Card.Title>
								<Card.Text>
									This is a longer card with supporting text below as a natural
									lead-in to additional content. This content is a little bit
									longer.
								</Card.Text>
							</Card.Body>
						</Card>
					</Button>
				</Col>
			))}
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

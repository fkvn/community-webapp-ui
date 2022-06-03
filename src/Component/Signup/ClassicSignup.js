import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import thainowLogo from "../../Assest/Image/Brand/thainowLogo.png";
import BackButton from "../Button/BackButton";
import NewClassicSignupForm from "../Form/NewClassicSignupForm";

function ClassicSignup({
	formatFrames = false,
	sessionStorageObj = "thainow.classic.signup.info",
	validateEmailHandler = () => {},
	validatePhoneHandler = () => {},
	submitErrorHandler = () => {},
	sendOtpCodeHandler = () => {},
	verifyOtpCodeHandler = () => {},
	signupHandler = () => {},
}) {
	const navigate = useNavigate();

	let [searchParams] = useSearchParams();

	const continueURL = searchParams.get("continue") || "/";

	const continueParams =
		continueURL.length > 0 ? "?continue=" + continueURL : "";

	const BusinessRegisterButton = () => (
		<Button
			size="md"
			variant="link"
			style={{ position: "relative", top: "5px" }}
			className="fs-5 text-decoration-none p-0 text-success float-end"
			onClick={() => navigate("/signup/business" + continueParams)}
		>
			Business Register
		</Button>
	);

	const app = (
		<Container
			fluid
			className={`${formatFrames ? "bg-success " : ""} vh-100 tedkvn-center `}
		>
			<Row className={`${formatFrames ? "bg-primary" : ""}  tedkvn-center `}>
				<Col
					xs={12}
					className={`${formatFrames ? "bg-danger " : ""} overflow-auto border`}
					id="classicSignupFormCol"
					style={{
						maxHeight: "80vh",
					}}
				>
					<BackButton />
					<BusinessRegisterButton />
					<div className="text-center m-5 d-block">
						<Link to="/">
							<Image src={thainowLogo} width="100" />
						</Link>
					</div>

					<NewClassicSignupForm />
					{/* <ClassicSignupForm
						sessionStorageObj={sessionStorageObj}
						validateEmailHandler={validateEmailHandler}
						validatePhoneHandler={validatePhoneHandler}
						submitErrorHandler={submitErrorHandler}
						sendOtpCodeHandler={sendOtpCodeHandler}
						verifyOtpCodeHandler={verifyOtpCodeHandler}
						signupHandler={signupHandler}
					/> */}
				</Col>
			</Row>
		</Container>
	);
	return app;
}

export default ClassicSignup;

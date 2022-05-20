import React from "react";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import thainowLogo from "../../Assest/Image/Brand/thainowLogo.png";
import BackButton from "../Button/BackButton";
import SignupForm from "../Form/SignupForm";

function NewClassicSignup({
	formatFrames = false,
	continueParams = "",
	validateEmailHandler = () => {},
	validatePhoneHandler = () => {},
	submitErrorHandler = () => {},
}) {
	const navigate = useNavigate();

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
					<div className="text-center m-5">
						<Image src={thainowLogo} width="100" />
					</div>

					<SignupForm
						continueParams={continueParams}
						validateEmailHandler={validateEmailHandler}
						validatePhoneHandler={validatePhoneHandler}
						submitErrorHandler={submitErrorHandler}
					/>
				</Col>
			</Row>
		</Container>
	);
	return app;
}

export default NewClassicSignup;

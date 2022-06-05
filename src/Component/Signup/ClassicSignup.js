import React from "react";
import { Button, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormHeader from "../Form/FormHeader";
import FormLayout from "../Form/FormLayout";
import NewClassicSignupForm from "../Form/NewClassicSignupForm";

function ClassicSignup({
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

	// const app = (
	// 	<Container
	// 		fluid
	// 		className={`${formatFrames ? "bg-success " : ""} vh-100 tedkvn-center `}
	// 	>
	// 		<Row className={`${formatFrames ? "bg-primary" : ""}  tedkvn-center `}>
	// 			<Col
	// 				xs={12}
	// 				className={`${formatFrames ? "bg-danger " : ""} overflow-auto border`}
	// 				id="classicSignupFormCol"
	// 				style={{
	// 					maxHeight: "80vh",
	// 				}}
	// 			>
	// 				<BackButton />
	// 				<BusinessRegisterButton />
	// 				<div className="text-center m-5 d-block">
	// 					<Link to="/">
	// 						<Image src={thainowLogo} width="100" />
	// 					</Link>
	// 				</div>

	// 				<NewClassicSignupForm />
	// 				{/* <ClassicSignupForm
	// 					sessionStorageObj={sessionStorageObj}
	// 					validateEmailHandler={validateEmailHandler}
	// 					validatePhoneHandler={validatePhoneHandler}
	// 					submitErrorHandler={submitErrorHandler}
	// 					sendOtpCodeHandler={sendOtpCodeHandler}
	// 					verifyOtpCodeHandler={verifyOtpCodeHandler}
	// 					signupHandler={signupHandler}
	// 				/> */}
	// 			</Col>
	// 		</Row>
	// 	</Container>
	// );

	const buttons = [
		{
			title: "Back to Home",
			// type: "submit",
			variant: "link",
			onClick: () => {},
		},
	];

	const formHeader = (
		<FormHeader
			title={
				<Row>
					<p className="p-0 m-0 ">
						<span>Create Personal Account</span>
						<Button
							variant="link"
							href="/signup"
							className="px-0 pt-0 my-0 pb-0 px-md-2 pb-md-1 text-start d-block d-md-inline-block"
						>
							<small>Switch account</small>
						</Button>
					</p>
				</Row>
			}
			onClose={() => {}}
			// navButtons={buttons}
			// withCloseButon={false}
		/>
	);

	const formBody = (
		<>
			{" "}
			<NewClassicSignupForm />
		</>
	);

	const app = FormLayout(formHeader, formBody);

	return app;
}

export default ClassicSignup;

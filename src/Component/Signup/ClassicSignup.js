import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Row } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FormGroup } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import thainowLogo from "../../Assest/Image/Brand/thainowLogo.png";
import GoogleAutoComplete from "../AutoComplete/GoogleAutoComplete";
import ToastError from "../Error/ToastError";
import AgreementFormControl from "../Form/AgreementFormControl";
import EmailFormControl from "../Form/EmailFormControl";
import PasswordFormControl from "../Form/PasswordFormControl";
import PhoneFormControl from "../Form/PhoneFormControl";
import TextFormControl from "../Form/TextFormControl";

import * as constVar from "../../Util/ConstVar";
import { InputGroup } from "react-bootstrap";

function ClassicSignup({ formatFrames = false }) {
	const navigate = useNavigate();

	const backButton = (
		<Button
			size="md"
			variant="link"
			style={{ position: "relative", top: "5px", left: "0" }}
			className="fs-5 text-decoration-none p-0"
			onClick={() => {
				if (step === 1) navigate("/signup");
				else setStep(step - 1 > 0 ? step - 1 : 1);
			}}
		>
			Back
		</Button>
	);

	const businessRegisterButton = (
		<Button
			size="md"
			variant="link"
			style={{ position: "relative", top: "5px" }}
			className="fs-5 text-decoration-none p-0 text-success float-end"
			onClick={() => navigate("/signup/business")}
		>
			Business Register
		</Button>
	);

	const storedFirstNameInfo = JSON.parse(
		sessionStorage.getItem("thainow.signup.info")
	)?.firstName;

	const firstNameRef = React.createRef();
	const firstNameControl = (
		<Form.Group className="mb-3 fs-5 ">
			<TextFormControl
				id="signup-firstNameControl"
				withLabel={true}
				labelTitle="First Name"
				required={true}
				placeholder="Enter your first name"
				ref={firstNameRef}
				defaultValue={storedFirstNameInfo}
			/>
		</Form.Group>
	);

	const storedLastNameInfo = JSON.parse(
		sessionStorage.getItem("thainow.signup.info")
	)?.lastName;

	const lastNameRef = React.createRef();
	const lastNameControl = (
		<Form.Group className="mb-3 fs-5 ">
			<TextFormControl
				id="signup-lastNameControl"
				withLabel={true}
				labelTitle="Last Name"
				required={true}
				placeholder="Enter your last name"
				ref={lastNameRef}
				defaultValue={storedLastNameInfo}
			/>
		</Form.Group>
	);

	const namesControl = (
		<Row>
			<Col xs={12} md={6}>
				{firstNameControl}
			</Col>
			<Col xs={12} md={6}>
				{lastNameControl}
			</Col>
		</Row>
	);

	const storedEmailInfo = JSON.parse(
		sessionStorage.getItem("thainow.signup.info")
	)?.email;

	const emailRef = React.createRef(null);

	const emailFormControl = (
		<EmailFormControl
			id="classic-signup-emailFormControl"
			className="signup-emailFormControl"
			ref={emailRef}
			required={false}
			defaultValue={storedEmailInfo}
		/>
	);

	const storedPhoneInfo = JSON.parse(
		sessionStorage.getItem("thainow.signup.info")
	)?.phone;

	const phoneRef = React.createRef(null);
	const phoneFormControl = (
		<FormGroup className="my-3">
			<PhoneFormControl
				id="classic-signup-phoneFormControl"
				className="signup-phoneFormControl"
				ref={phoneRef}
				required={false}
				defaultValue={storedPhoneInfo}
			/>
		</FormGroup>
	);

	const storedAddressObjInfo =
		sessionStorage.getItem("thainow.signup.info") &&
		JSON.parse(sessionStorage.getItem("thainow.signup.info")).addressObj;

	const [addressObj, setAddressObj] = useState({});

	const onSelectLocationHandler = (addressObj) => {
		setAddressObj(addressObj);
	};

	useEffect(() => {
		if (storedAddressObjInfo !== "{}" && JSON.stringify(addressObj) === "{}") {
			setAddressObj(JSON.parse(storedAddressObjInfo));
		}
	}, [addressObj]);

	const addressFormControl = (
		<Form.Group className="fs-5 ">
			<GoogleAutoComplete
				id="signup-classic-addressControl"
				onSelectLocation={onSelectLocationHandler}
				defaultAddressObj={storedAddressObjInfo}
				addressObj={addressObj}
			/>
		</Form.Group>
	);

	const storedPasswordInfo = JSON.parse(
		sessionStorage.getItem("thainow.signup.info")
	)?.password;

	const passwordRef = React.createRef(null);
	const passwordFormControl = (
		<Form.Group className="my-3">
			<PasswordFormControl
				id="signup-classic-passwordFormControl"
				ref={passwordRef}
				autoComplete={false}
				defaultValue={storedPasswordInfo}
			/>
		</Form.Group>
	);

	const verifyPasswordFormControl = (
		<Form.Group className="my-3">
			<PasswordFormControl
				id="signup-classic-verifyPasswordFormControl"
				ref={passwordRef}
				verifyPasswordFormControl={true}
				autoComplete={false}
			/>
		</Form.Group>
	);

	const agreeCheckBox = <AgreementFormControl />;

	const saveCurrentStepInfo = () => {
		console.log("store: " + JSON.stringify(addressObj));

		sessionStorage.setItem(
			"thainow.signup.info",
			JSON.stringify({
				firstName: firstNameRef?.current?.value,
				lastName: lastNameRef?.current?.value,
				email: emailRef?.current?.value,
				phone: phoneRef?.current?.value,
				password: passwordRef?.current?.value,
				addressObj: JSON.stringify(addressObj),
			})
		);
	};

	const nextStepButton = (
		<Form.Group className="tedkvn-center">
			<Button size="md" className="w-50 mt-5 fs-5 rounded-pill" type="submit">
				Next
			</Button>
		</Form.Group>
	);

	const onSubmit = (e) => {
		e.preventDefault();
		saveCurrentStepInfo();
		setStep(step + 1);
	};

	const [step, setStep] = useState(1);

	const verificationOptions = (
		<>
			<Form.Text className="text-muted ">
				<span className="text-primary">
					We will verify your information, which way do you prefer to verify?
				</span>
			</Form.Text>
			<Form.Group className="tedkvn-center my-4">
				<Button
					className="rounded-pill m-4 px-4"
					size="lg"
					onClick={() => {
						setVerifyOption("email");
						setStep(step + 1);
					}}
				>
					Email Verification
				</Button>
				<Button variant="success" className="rounded-pill m-4 px-4" size="lg">
					Phone Verification
				</Button>
			</Form.Group>
		</>
	);

	const [verifyOption, setVerifyOption] = useState();

	const verificationControl = (
		<>
			<Form.Label
				{...(verifyOption === "email"
					? { htmlFor: "classic-signup-verify-emailFormControl" }
					: { htmlFor: "classic-signup-verify-phoneFormControl" })}
				htmlFor=""
				className={`fs-5 tedkvn-required `}
			>
				Email
			</Form.Label>
			<InputGroup className="mb-3 ">
				<EmailFormControl
					id="classic-signup-verify-emailFormControl"
					className="signup-emailFormControl bg-white"
					disabled={true}
					defaultValue={storedEmailInfo}
					ref={emailRef}
					withLabel={false}
				/>
				<Button
					variant="secondary"
					className="signup-verify-formControl-editBtn"
					onClick={() => setStep(step - 2)}
				>
					Change Email
				</Button>
			</InputGroup>
			<Form.Text>
				By click "Next", you will receive a verification code via your email
				address.
			</Form.Text>
		</>
	);

	const loginOptionPromt = (
		<Form.Group className="tedkvn-center mt-3 ">
			Already have an account?
			<Button
				size="md"
				className="p-0 px-2 fs-5 rounded-pill d-inline-block shadow-none"
				variant="link"
				href="/login"
			>
				Log In
			</Button>
		</Form.Group>
	);

	const signupForm = (
		<Form onSubmit={onSubmit}>
			{step === 1 && (
				<>
					{namesControl}
					{emailFormControl}
					{phoneFormControl}
					{addressFormControl}
					{passwordFormControl}
					{verifyPasswordFormControl}
					<Form.Text className="text-muted tedkvn-required">
						This is required field
					</Form.Text>
					{agreeCheckBox}

					{nextStepButton}
				</>
			)}

			{step === 2 && <div className="text-center">{verificationOptions}</div>}

			{step === 3 && (
				<>
					{verificationControl}
					{nextStepButton}{" "}
				</>
			)}

			{loginOptionPromt}
		</Form>
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
					{backButton}
					{businessRegisterButton}
					<div className="text-center m-5">
						<Image src={thainowLogo} width="100" />
					</div>
					{signupForm}
				</Col>
			</Row>
		</Container>
	);

	return app;
}

export default ClassicSignup;

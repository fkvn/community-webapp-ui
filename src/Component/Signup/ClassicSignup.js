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
import OtpVerifyFormControl from "../Form/OtpVerifyFormControl";

import axios from "../../Axios/axios";

function ClassicSignup({ formatFrames = false }) {
	const navigate = useNavigate();
	const [step, setStep] = useState(1);
	const backButton = (
		<Button
			size="md"
			variant="link"
			style={{ position: "relative", top: "5px", left: "0" }}
			className="fs-5 text-decoration-none p-0 shadow-none"
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

	const storedFirstNameInfo =
		JSON.parse(sessionStorage.getItem("thainow.signup.info"))?.firstName || "";

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

	const storedLastNameInfo =
		JSON.parse(sessionStorage.getItem("thainow.signup.info"))?.lastName || "";

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

	const storedEmailInfo =
		JSON.parse(sessionStorage.getItem("thainow.signup.info"))?.email || "";

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

	const storedPhoneInfo =
		JSON.parse(sessionStorage.getItem("thainow.signup.info"))?.phone || "";

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

	let storedAddressObjInfo = {};

	storedAddressObjInfo =
		JSON.parse(sessionStorage.getItem("thainow.signup.info"))?.addressObj || {};

	const [addressObj, setAddressObj] = useState({});

	const onSelectLocationHandler = (addressObj) => {
		setAddressObj(addressObj);
	};

	useEffect(() => {
		if (
			JSON.stringify(storedAddressObjInfo) !== "{}" &&
			JSON.stringify(addressObj) === "{}"
		) {
			setAddressObj(storedAddressObjInfo);
		}
	}, [storedAddressObjInfo, addressObj]);

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

	const storedPasswordInfo =
		JSON.parse(sessionStorage.getItem("thainow.signup.info"))?.password || "";

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
		let currentSignUpInfo = {};

		const storedSignUpInfo =
			JSON.parse(sessionStorage.getItem("thainow.signup.info")) || {};

		if (step === 1) {
			currentSignUpInfo = {
				firstName: firstNameRef?.current?.value,
				lastName: lastNameRef?.current?.value,
				email: emailRef?.current?.value,
				phone: phoneRef?.current?.value,
				password: passwordRef?.current?.value,
				addressObj: addressObj,
			};
		} else if (step === 3) {
			currentSignUpInfo = {
				...storedSignUpInfo,
				...(verifyOption === "email" &&
					!storedEmailInfo && { email: emailRef?.current?.value }),
				...(verifyOption === "phone" &&
					!storedPhoneInfo && { phone: phoneRef?.current?.value }),
			};
		} else {
			currentSignUpInfo = { ...storedSignUpInfo };
		}

		sessionStorage.setItem(
			"thainow.signup.info",
			JSON.stringify(currentSignUpInfo)
		);
	};

	const nextStepButton = (
		<Form.Group className="tedkvn-center">
			<Button size="md" className="w-50 mt-3 fs-5 rounded-pill" type="submit">
				{step === 3 ? "Send Code" : step === 4 ? "Verify Code" : "Next"}
			</Button>
		</Form.Group>
	);

	const sendOtpCode = (channel = "", email = "", phone = "") => {
		if (channel === "email" || channel === "sms") {
			return axios
				.post(`/auth/getToken`, {
					channel: channel,
					...(channel === "email" && email.length > 0 && { email }),
					...(channel === "sms" && phone.length > 0 && { phone }),
				})
				.then(() => {
					return true;
				})
				.catch(() => {
					return false;
				});
		}

		return false;
	};

	const verifyOtpCode = (channel = "", email = "", phone = "", token = "") => {
		console.log(channel);
		console.log(token);

		if (channel === "email" || channel === "sms") {
			return axios.post(`/auth/verifyToken`, {
				channel: channel,
				...(channel === "email" && email.length > 0 && { email }),
				...(channel === "sms" && phone.length > 0 && { phone }),
				token: token,
			});
		}

		return false;
	};

	const onSubmit = (e) => {
		e.preventDefault();

		saveCurrentStepInfo();

		if (step < 3) {
			setStep(step + 1);
		}

		if (step === 3) {
			let isSentCode = false;

			console.log("iscall");
			const channel =
				verifyOption === "email"
					? "email"
					: verifyOption === "phone"
					? "sms"
					: "";
			isSentCode = sendOtpCode(channel, storedEmailInfo, storedPhoneInfo);

			if (isSentCode) setStep(step + 1);
		}

		if (step === 4) {
			let isCodeVerified = false;
			const channel =
				verifyOption === "email"
					? "email"
					: verifyOption === "phone"
					? "sms"
					: "";

			verifyOtpCode(
				channel,
				storedEmailInfo,
				storedPhoneInfo,
				otpRef?.current?.value
			).then((res) => {
				if (res) setStep(step + 1);
			});
		}
	};

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
				<Button
					variant="success"
					className="rounded-pill m-4 px-4"
					size="lg"
					onClick={() => {
						setVerifyOption("phone");
						setStep(step + 1);
					}}
				>
					Phone Verification
				</Button>
			</Form.Group>
		</>
	);

	const [verifyOption, setVerifyOption] = useState();

	const emailVerifyFormControl = (
		<EmailFormControl
			id="classic-signup-verify-emailFormControl"
			className="signup-emailFormControl bg-white"
			disabled={storedEmailInfo ? true : false}
			defaultValue={storedEmailInfo}
			ref={emailRef}
			withLabel={false}
			required={true}
		/>
	);

	const phoneVerifyFormControl = (
		<PhoneFormControl
			id="classic-signup-verify-phoneFormControl"
			className="signup-phoneFormControl bg-white"
			ref={phoneRef}
			disabled={storedPhoneInfo ? true : false}
			required={true}
			withLabel={false}
			defaultValue={storedPhoneInfo}
		/>
	);

	const verificationControl = (
		<>
			<Form.Label
				{...(verifyOption === "email"
					? { htmlFor: "classic-signup-verify-emailFormControl" }
					: { htmlFor: "classic-signup-verify-phoneFormControl" })}
				htmlFor=""
				className={`fs-5 tedkvn-required `}
			>
				{verifyOption === "email" && "Email"}
				{verifyOption === "phone" && "Phone"}
			</Form.Label>
			{verifyOption === "email" &&
				(storedEmailInfo ? (
					<InputGroup className="mb-3 ">
						{emailVerifyFormControl}

						<Button
							variant="secondary"
							className="signup-verify-formControl-editBtn"
							onClick={() => setStep(step - 2)}
						>
							Change Email
						</Button>
					</InputGroup>
				) : (
					emailVerifyFormControl
				))}

			{verifyOption === "phone" &&
				(storedPhoneInfo ? (
					<InputGroup className="">
						{phoneVerifyFormControl}

						<Button
							variant="secondary"
							className="signup-verify-formControl-editBtn"
							onClick={() => setStep(step - 2)}
						>
							Change Phone
						</Button>
					</InputGroup>
				) : (
					phoneVerifyFormControl
				))}

			<Form.Group className="pt-4 ">
				<Form.Text className="text-danger">
					By click "Send Code", you will receive a verification code via your
					{verifyOption === "email" && " email address "}{" "}
					{verifyOption === "phone" && " phone number "}
				</Form.Text>
			</Form.Group>
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

	const otpRef = React.createRef("");

	const otpVerificationFormControl = (
		<Form.Group className="my-3">
			<OtpVerifyFormControl id="signup-otp-verify-formControl" ref={otpRef} />
			<Form.Group className="mt-2">
				<Button
					variant="link"
					className="p-0 shadow-none"
					onClick={() => setStep(step - 1)}
				>
					{" "}
					Resend Code
				</Button>
			</Form.Group>
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
					{verificationControl} {nextStepButton}
				</>
			)}

			{step === 4 && (
				<>
					{otpVerificationFormControl} {nextStepButton}
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

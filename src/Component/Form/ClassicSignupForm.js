import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button, InputGroup } from "react-bootstrap";

import EmailFormControl from "./FormControl/EmailFormControl";
import PhoneFormControl from "./FormControl/PhoneFormControl";
import TextFormControl from "./FormControl/TextFormControl";
import GoogleAutoComplete from "../AutoComplete/GoogleAutoComplete";
import NewPasswordFormControl from "./FormControl/PasswordFormControl";
import AgreementFormControl from "./FormControl/AgreementFormControl";
import LoadingButton from "../Button/LoadingButton";
import OtpVerifyFormControl from "./FormControl/OtpVerifyFormControl";
import { useNavigate, useSearchParams } from "react-router-dom";

function ClassicSignupForm({
	sessionStorageObj = "thainow.classic.signup.info",
	submitErrorHandler = () => {},
	validateEmailHandler = () => {},
	validatePhoneHandler = () => {},
	sendOtpCodeHandler = () => {},
	verifyOtpCodeHandler = () => {},
	signupHandler = () => {},
}) {
	const [step, setStep] = useState(1);

	const firstnameRef = React.createRef();
	const lastnameRef = React.createRef();
	const emailRef = React.createRef();
	const phoneRef = React.createRef();
	const passwordRef = React.createRef();
	const otpRef = React.createRef("");

	const [verifyOption, setVerifyOption] = useState("phone");

	const [onSubmitLoading, setOnSubmitLoading] = useState(false);

	const navigate = useNavigate();

	let [searchParams] = useSearchParams();

	const continueURL = searchParams.get("continue") || "/";

	const continueParams =
		continueURL.length > 0 ? "?continue=" + continueURL : "";

	const getSessionStorageObj = (objName) => {
		return JSON.parse(sessionStorage.getItem(objName)) || {};
	};

	const saveToSessionStore = (objName = "", prop = "", value = "") => {
		sessionStorage.setItem(
			objName,
			JSON.stringify({
				...(JSON.parse(sessionStorage.getItem(objName)) || {}),
				[`${prop}`]: value,
			})
		);
	};

	const onSubmitStep_1_Handler = (
		address = "",
		placeid = "",
		isValidPassword = false,
		isPasswordMatch = false,
		isValidEmail = false,
		isValidPhone = false,
		email = "",
		phone = ""
	) => {
		if (!isValidEmail) return submitErrorHandler("Invalid Email!");
		else if (!isValidPhone) return submitErrorHandler("Invalid Phone!");
		else if (address.length === 0 || placeid.length === 0)
			return submitErrorHandler("Invalid Address");
		else if (!isValidPassword) return submitErrorHandler("Invalid Password!");
		else if (!isPasswordMatch)
			return submitErrorHandler("Password Confirmation is not matched!");
		else {
			if (email.length > 0) {
				return validateEmailHandler(email);
			} else if (phone.length > 0) {
				return validatePhoneHandler(phone);
			} else {
				return new Promise((resolve, _) => resolve());
			}
		}
	};

	const onSubmitStep_3_Handler = (email = "", phone = "") => {
		switch (verifyOption) {
			case "email":
				if (email.length === 0) {
					return submitErrorHandler(
						"Invalid Email! Please provide or add a valid email address."
					);
				} else {
					return sendOtpCodeHandler("email", email);
				}

			case "phone":
				if (phone.length === 0) {
					return submitErrorHandler(
						"Invalid Phone! Please provide or add a valid phone number."
					);
				} else {
					return sendOtpCodeHandler("sms", phone);
				}

			default:
				return submitErrorHandler(
					"Sorry, the request failed. Please try again later."
				);
		}
	};

	const onSubmitStep_4_Hanlder = (signupInfo = {}, token = "") => {
		const [channel, value] =
			verifyOption === "email"
				? ["email", signupInfo.email || ""]
				: verifyOption === "phone"
				? ["sms", signupInfo.phone || ""]
				: ["", ""];

		if (
			token.length === 0 ||
			value.length === 0 ||
			JSON.stringify(signupInfo) === "{}"
		) {
			return submitErrorHandler(
				token.length === 0
					? "Invalid Token"
					: JSON.stringify(signupInfo) === "{}"
					? "Missing signup information!"
					: "Invalid Request"
			);
		} else {
			return verifyOtpCodeHandler(channel, value, token);
		}
	};

	const onSubmitHandle = (e) => {
		// stop form submit refresh
		e.preventDefault();

		// get signup object from session storage
		let signupInfo = getSessionStorageObj(sessionStorageObj);

		setOnSubmitLoading(true);

		if (step === 1)
			onSubmitStep_1_Handler(
				signupInfo.address.description,
				signupInfo.address.placeid,
				signupInfo.isValidPassword,
				signupInfo.isPasswordMatch,
				signupInfo.isValidEmail,
				signupInfo.isValidPhone,
				signupInfo.email,
				signupInfo.phone
			)
				.then(() => {
					setOnSubmitLoading(false);
					setStep(2);
				})
				.catch(() => setOnSubmitLoading());
		else if (step === 3) {
			onSubmitStep_3_Handler(signupInfo.email, signupInfo.phone)
				.then(() => {
					setOnSubmitLoading(false);
					setStep(4);
				})
				.catch(() => setOnSubmitLoading());
		} else if (step === 4) {
			onSubmitStep_4_Hanlder(
				signupInfo,
				otpRef?.current?.value.replace(/[^\d]/g, "")
			)
				.then(() => {
					signupHandler(signupInfo, "CLASSIC")
						.then(() => {
							sessionStorage.removeItem(sessionStorageObj);
							navigate("/signup/success" + continueParams, {
								state: {
									channel: verifyOption || "",
									email: signupInfo.email || "",
									phone: signupInfo.phone || "",
									password: signupInfo.password || "",
								},
							});
							setOnSubmitLoading(false);
						})
						.catch(() => setOnSubmitLoading(false));
				})
				.catch(() => setOnSubmitLoading(false));
		}
	};

	// set default value
	useEffect(() => {
		const signupInfo = getSessionStorageObj(sessionStorageObj);

		if (step === 1) {
			firstnameRef.current.value = signupInfo.firstname || "";
			lastnameRef.current.value = signupInfo.lastname || "";
		}

		// if (step < 4) {
		// 	saveToSessionStore(sessionStorageObj, "isVerified", false);
		// }
	});

	const FirstNameFormControl = () => (
		<Form.Group className="mb-3 fs-5">
			<TextFormControl
				id="signup-firstNameControl"
				withLabel={true}
				labelTitle="First Name"
				required={true}
				placeholder="Enter your first name"
				ref={firstnameRef}
				onChange={(p) =>
					saveToSessionStore(sessionStorageObj, "firstname", p.target.value)
				}
			/>
		</Form.Group>
	);

	const LastNameFormControl = () => (
		<Form.Group className="mb-3 fs-5 ">
			<TextFormControl
				id="signup-lastNameControl"
				withLabel={true}
				labelTitle="Last Name"
				required={true}
				placeholder="Enter your last name"
				ref={lastnameRef}
				onChange={(p) =>
					saveToSessionStore(sessionStorageObj, "lastname", p.target.value)
				}
			/>
		</Form.Group>
	);

	const NamesFormControl = () => (
		<Row>
			<Col xs={12} md={6}>
				<FirstNameFormControl />
			</Col>
			<Col xs={12} md={6}>
				<LastNameFormControl />
			</Col>
		</Row>
	);

	const emailFormControl = (
		<Form.Group className="fs-5">
			<EmailFormControl
				id="classic-signup-emailFormControl"
				className="signup-emailFormControl"
				ref={emailRef}
				required={false}
				defaultValue={getSessionStorageObj(sessionStorageObj).email || ""}
				onChange={(value, isValid) => {
					saveToSessionStore(sessionStorageObj, "isValidEmail", isValid);
					saveToSessionStore(sessionStorageObj, "email", value);
				}}
			/>
		</Form.Group>
	);

	const phoneFormControl = (
		<Form.Group className="fs-5 my-2">
			<PhoneFormControl
				id="classic-signup-phoneFormControl"
				className="signup-phoneFormControl"
				ref={phoneRef}
				required={false}
				defaultValue={getSessionStorageObj(sessionStorageObj).phone || ""}
				onChange={(value, isValid) => {
					saveToSessionStore(sessionStorageObj, "isValidPhone", isValid);
					saveToSessionStore(sessionStorageObj, "phone", value);
				}}
			/>
		</Form.Group>
	);

	const AddressFormControl = () => (
		<Form.Group className="fs-5 my-2">
			<GoogleAutoComplete sessionStorageObj={sessionStorageObj} />
		</Form.Group>
	);

	const passwordFormControl = (
		<Form.Group className="fs-5 my-2">
			<NewPasswordFormControl
				id="signup-classic-passwordFormControl"
				ref={passwordRef}
				defaultValue={getSessionStorageObj(sessionStorageObj).password || ""}
				onChange={(value, isValidPassword) => {
					saveToSessionStore(sessionStorageObj, "password", value);
					saveToSessionStore(
						sessionStorageObj,
						"isValidPassword",
						isValidPassword
					);
				}}
				attachedverifyPasswordFormControl={true}
				onVerifyChange={(value) =>
					saveToSessionStore(sessionStorageObj, "isPasswordMatch", value)
				}
			/>
		</Form.Group>
	);

	const nextStepButton = (
		<Form.Group>
			<LoadingButton
				size="md"
				className="px-4 rounded-pill shadow-none"
				type="submit"
				title={
					step === 3
						? "Send Code"
						: step === 4
						? "Verify and Signup"
						: "Next Step"
				}
				show={onSubmitLoading}
			/>
		</Form.Group>
	);

	const prevStepButton = (
		<Form.Group>
			<Button
				size="md"
				variant="secondary"
				className=" px-4  rounded-pill shadow-none"
				onClick={() => setStep(step - 1 > -1 ? step - 1 : 0)}
			>
				Previous Step
			</Button>
		</Form.Group>
	);

	const formNavigationButtons = (
		<Form.Group className="my-2">
			{step === 1 && <div className="float-end py-3">{nextStepButton}</div>}
			{step === 2 && <div className="text-center">{prevStepButton}</div>}
			{step > 2 && (
				<>
					<div className="float-start py-3">{prevStepButton}</div>
					<div className="float-end py-3">{nextStepButton}</div>
				</>
			)}
		</Form.Group>
	);

	// step 2 component

	const verificationOptionControl = (
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

	// step 3 components
	const EmailVerifyFormControl = ({ signupInfo = {} }) => (
		<>
			<EmailFormControl
				id="classic-signup-verify-emailFormControl"
				className={`signup-emailFormControl ${
					signupInfo.email ? "bg-white" : ""
				}`}
				disabled={true}
				defaultValue={signupInfo.email || ""}
				ref={emailRef}
				withLabel={false}
				required={true}
			/>
		</>
	);

	const PhoneVerifyFormControl = ({ signupInfo = {} }) => (
		<PhoneFormControl
			id="classic-signup-verify-phoneFormControl"
			ref={phoneRef}
			className={`signup-phoneFormControl ${
				signupInfo.phone ? "bg-white" : ""
			}`}
			disabled={true}
			required={true}
			withLabel={false}
			defaultValue={signupInfo.phone || ""}
			onChange={(value, isValid) => {
				saveToSessionStore(sessionStorageObj, "isValidPhone", isValid);
				saveToSessionStore(sessionStorageObj, "phone", value);
			}}
		/>
	);

	const VerificationControl = ({ signupInfo = {} }) => (
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
			{verifyOption === "email" && (
				<InputGroup className="mb-3 ">
					<EmailVerifyFormControl signupInfo={signupInfo} />

					<Button
						variant="secondary"
						className="signup-verify-formControl-editBtn"
						onClick={() => setStep(1)}
					>
						Update Email
					</Button>
				</InputGroup>
			)}

			{verifyOption === "phone" && (
				<InputGroup className="">
					<PhoneVerifyFormControl signupInfo={signupInfo} />

					<Button
						variant="secondary"
						className="signup-verify-formControl-editBtn"
						onClick={() => setStep(1)}
					>
						Update Phone
					</Button>
				</InputGroup>
			)}

			<Form.Group className="pt-4 ">
				<Form.Text className="text-danger">
					By click "Send Code", you will receive a verification code via your
					{verifyOption === "email" && " email address "}{" "}
					{verifyOption === "phone" && " phone number "}
				</Form.Text>
			</Form.Group>
		</>
	);

	//  step 4 component

	const otpVerificationFormControl = (
		<Form.Group className="my-3">
			<OtpVerifyFormControl id="signup-otp-verify-formControl" ref={otpRef} />
			<Form.Group className="mt-2">
				<Button
					variant="link"
					className="p-0 shadow-none"
					onClick={() => setStep(step - 1)}
				>
					Resend Code
				</Button>
			</Form.Group>
		</Form.Group>
	);

	//  step 5 component

	const app = step < 5 && (
		<>
			<Form onSubmit={onSubmitHandle}>
				{step === 1 && (
					<>
						<NamesFormControl />
						{emailFormControl}
						{phoneFormControl}
						<AddressFormControl />
						{passwordFormControl}
						<Form.Text className="text-muted tedkvn-required">
							This is required field
						</Form.Text>
						<AgreementFormControl />
					</>
				)}

				{step === 2 && verificationOptionControl}

				{step === 3 && (
					<VerificationControl
						signupInfo={getSessionStorageObj(sessionStorageObj)}
					/>
				)}

				{step === 4 && otpVerificationFormControl}

				{formNavigationButtons}
			</Form>
		</>
	);

	return app;
}

export default ClassicSignupForm;

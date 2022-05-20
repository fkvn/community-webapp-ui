import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

import EmailFormControl from "./FormControl/EmailFormControl";
import PhoneFormControl from "./FormControl/PhoneFormControl";
import TextFormControl from "./FormControl/TextFormControl";
import GoogleAutoComplete from "../AutoComplete/NewGoogleAutoComplete";
import NewPasswordFormControl from "./FormControl/PasswordFormControl";
import AgreementFormControl from "./FormControl/AgreementFormControl";
import LoadingButton from "../Button/LoadingButton";

function SignupForm({
	sessionStorageObj = "thainow.signup.info",
	continueParams = "",
	submitErrorHandler = () => {},
	validateEmailHandler = () => {},
	validatePhoneHandler = () => {},
}) {
	const [step, setStep] = useState(1);

	const firstnameRef = React.createRef();
	const lastnameRef = React.createRef();
	const emailRef = React.createRef();
	const phoneRef = React.createRef();
	const passwordRef = React.createRef();

	const [verifyOption, setVerifyOption] = useState("");

	const [onSubmitLoading, setOnSubmitLoading] = useState(false);

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

	const promiseHandler = (
		promise = () => {},
		success = () => {},
		followup = () => {}
	) => {
		promise("Invalid PHone ssssss").then((res) => {
			console.log("ssee");
			if (res) success();
			followup();
		});
	};

	const isStep1Valid = (
		address = "",
		placeid = "",
		isValidPassword = false,
		isPasswordMatch = false,
		isValidEmail = false,
		isValidPhone = false
	) => {
		if (!isValidEmail)
			promiseHandler(
				submitErrorHandler("Invalid Email!"),
				() => {},
				setOnSubmitLoading(false)
			);
		else if (!isValidPhone) submitErrorHandler("Invalid Phone!");
		else if (address.length === 0 || placeid.length === 0)
			submitErrorHandler("Invalid Address");
		else if (!isValidPassword) submitErrorHandler("Invalid Password!");
		else if (!isPasswordMatch)
			submitErrorHandler("Password Confirmation is not matched!");
		else return true;
	};

	const onSubmitStep1Handler = (
		address = "",
		placeid = "",
		isValidPassword = false,
		isPasswordMatch = false,
		isValidEmail = false,
		isValidPhone = false,
		email = "",
		phone = ""
	) => {
		const isValid = isStep1Valid(
			address,
			placeid,
			isValidPassword,
			isPasswordMatch,
			isValidEmail,
			isValidPhone
		);

		if (isValid) {
			if (email.length > 0 && phone.length === 0) {
				validateEmailHandler(email).then((res) => {
					if (res) setStep(step + 1);
					setOnSubmitLoading(false);
				});
			} else if (email.length === 0 && phone.length > 0) {
				validatePhoneHandler(phone).then((res) => {
					if (res) {
						setStep(step + 1);
					}
					setOnSubmitLoading(false);
				});
			} else if (email.length > 0 && phone.length > 0) {
				validateEmailHandler(email).then((res) => {
					if (res)
						validatePhoneHandler(phone).then((res) => {
							if (res) setStep(step + 1);
							setOnSubmitLoading(false);
						});
				});
			}
		} else {
			setOnSubmitLoading(false);
		}
	};

	const onSubmitHandle = (e) => {
		// stop form submit refresh
		e.preventDefault();

		// get signup object from session storage
		const signupInfo = getSessionStorageObj(sessionStorageObj);

		setOnSubmitLoading(true);

		if (step === 1)
			onSubmitStep1Handler(
				signupInfo.address.description,
				signupInfo.address.placeid,
				signupInfo.isValidPassword,
				signupInfo.isPasswordMatch,
				signupInfo.isValidEmail,
				signupInfo.isValidPhone,
				signupInfo.email,
				signupInfo.phone
			);
	};

	// set default value
	useEffect(() => {
		const signupInfo = getSessionStorageObj(sessionStorageObj);
		firstnameRef.current.value = signupInfo.firstname || "";
		lastnameRef.current.value = signupInfo.lastname || "";
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

	const NextStepButton = () => (
		<Form.Group className="tedkvn-center">
			{/* <Button size="md" className="w-50 mt-3 fs-5 rounded-pill" type="submit">
				{step === 3 ? "Send Code" : step === 4 ? "Verify Code" : "Next"}
			</Button> */}
			<LoadingButton
				size="md"
				className="w-50 mt-3 fs-5  rounded-pill"
				type="submit"
				title={step === 3 ? "Send Code" : step === 4 ? "Verify Code" : "Next"}
				show={onSubmitLoading}
			/>
		</Form.Group>
	);

	const LoginOptionPromt = () => (
		<Form.Group className="tedkvn-center mt-3 ">
			Already have an account?
			<Button
				size="md"
				className="p-0 px-2 fs-5 rounded-pill d-inline-block shadow-none"
				variant="link"
				href={"/login" + continueParams}
			>
				Log In
			</Button>
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

	const app = (
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

				{step !== 2 && <NextStepButton />}

				<LoginOptionPromt />
			</Form>
		</>
	);

	return app;
}

export default SignupForm;

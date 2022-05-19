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
import ToastError from "../Error/ToastError";

import * as constVar from "../../Util/ConstVar";

function SignupForm({
	sessionStorageObj = "thainow.signup.info",
	continueParams = "",
	submitError = () => {},
}) {
	const [step, setStep] = useState(1);

	const signupInfo =
		JSON.parse(sessionStorage.getItem(sessionStorageObj)) || {};

	const firstnameRef = React.createRef();
	const lastnameRef = React.createRef(signupInfo.lastname || "");
	const emailRef = React.createRef(signupInfo.email || "");
	const phoneRef = React.createRef(signupInfo.phone || "");
	const address = signupInfo.address || {};
	const passwordRef = React.createRef(signupInfo.password || "");

	const saveToSessionStore = (objName = "", prop = "", value = "") => {
		sessionStorage.setItem(
			objName,
			JSON.stringify({
				...(JSON.parse(sessionStorage.getItem(objName)) || {}),
				[`${prop}`]: value,
			})
		);
	};

	const isStep1Valid = (
		address = "",
		placeid = "",
		isValidPassword = false,
		isPasswordMatch = false
	) => {
		if (address.length === 0 || placeid.length === 0)
			submitError("Invalid Address");
		else if (!isValidPassword) submitError("Invalid Password!");
		else if (!isPasswordMatch)
			submitError("Password Confirmation is not matched!");
		else return true;
	};

	const onSubmitStep1Handler = (
		address = "",
		placeid = "",
		isValidPassword = false,
		isPasswordMatch = false
	) => {
		isStep1Valid(address, placeid, isValidPassword, isPasswordMatch);
	};

	const onSubmitHandle = (e) => {
		e.preventDefault();
		if (step === 1) onSubmitStep1Handler();
	};

	// set default value
	useEffect(() => {
		firstnameRef.current.value = signupInfo.firstname || "";
		lastnameRef.current.value = signupInfo.lastname || "";
	}, [signupInfo]);

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
				defaultValue={signupInfo.email || ""}
				onChange={(value) =>
					saveToSessionStore(sessionStorageObj, "email", value)
				}
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
				defaultValue={signupInfo.phone || ""}
				onChange={(value) =>
					saveToSessionStore(sessionStorageObj, "phone", value)
				}
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
				defaultValue={signupInfo.password || ""}
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
			<Button size="md" className="w-50 mt-3 fs-5 rounded-pill" type="submit">
				{step === 3 ? "Send Code" : step === 4 ? "Verify Code" : "Next"}
			</Button>
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

	const app = (
		<>
			<Form onSubmit={onSubmitHandle}>
				<NamesFormControl />
				{emailFormControl}
				{phoneFormControl}
				<AddressFormControl />
				{passwordFormControl}
				<Form.Text className="text-muted tedkvn-required">
					This is required field
				</Form.Text>
				<AgreementFormControl />
				<NextStepButton />
				<LoginOptionPromt />
			</Form>
		</>
	);

	return app;
}

export default SignupForm;

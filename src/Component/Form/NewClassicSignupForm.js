import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import AddressFromGroupControl from "./FormGroupControl/AddressFormGroupControl";
import AgreementFormGroupControl from "./FormGroupControl/AgreementFormGroupControl";
import EmailFromGroupControl from "./FormGroupControl/EmailFormGroupControl";
import NavigationStepBtnFormGroupControl from "./FormGroupControl/NavigationStepBtnFormGroupControl";
import PasswordFromGroupControl from "./FormGroupControl/PasswordFormGroupControl";
import PhoneFromGroupControl from "./FormGroupControl/PhoneFormGroupControl";
import ReadOnlyFormGroupControl from "./FormGroupControl/ReadOnlyFormGroupControl";
import UserContactFormGroupControl from "./FormGroupControl/UserContactFormGroupControl";
import UsernameFormGroupControl from "./FormGroupControl/UsernameFormGroupControl";

function NewClassicSignupForm({
	sessionStorageObjName = "thainow.classic.signup.info",
}) {
	const MAX_STEP = 4;

	const MIN_STEP = 1;

	const [step, setStep] = useState(1);

	const [onSubmitLoading, setOnSubmitLoading] = useState(false);

	const usernameFormGroupControl = (
		<UsernameFormGroupControl
			id="classic-signup-usernameFormGroupControl"
			required={true}
			sessionStorageObjName={sessionStorageObjName}
		/>
	);

	const emailFormGroupControl = (
		<EmailFromGroupControl
			id="classic-signup-emailFormControl"
			required={true}
			sessionStorageObjName={sessionStorageObjName}
		/>
	);

	const phoneFormGroupControl = (
		<PhoneFromGroupControl
			id="classic-signup-phoneFormControl"
			required={true}
			sessionStorageObjName={sessionStorageObjName}
		/>
	);

	const addressFormGroupControl = (
		<AddressFromGroupControl
			id="classic-signup-addressFormControl"
			sessionStorageObjName={sessionStorageObjName}
		/>
	);

	const passwordFormGroupControl = (
		<PasswordFromGroupControl
			id="classic-signup-passwordFormControl"
			required={true}
			sessionStorageObjName={sessionStorageObjName}
		/>
	);

	const agreementFormGroupControl = <AgreementFormGroupControl />;

	const navigationStepBtnFormGroupControl = (
		<NavigationStepBtnFormGroupControl
			step={step}
			setStep={setStep}
			nextstepBtnTitle={
				step === 3
					? "Send Code"
					: step === 4
					? "Verify and Signup"
					: "Next Step"
			}
			skipnextstep={[2]}
			minStep={MIN_STEP}
			maxStep={MAX_STEP}
			onSubmitLoading={onSubmitLoading}
		/>
	);

	const onSubmitHandle = (e) => {
		// stop form submit refresh
		e.preventDefault();
	};

	const headline = (
		<ReadOnlyFormGroupControl
			title="Sign up to Connect with great Thai resources"
			className="fs-5"
		/>
	);

	const loginFormIntro = (
		<Form.Group className="mb-4 text-center">
			<Container className="tedkvn-center p-0 " fluid>
				Already has an account?{" "}
				<Button
					variant="link"
					href="/signup"
					className="px-1 px-sm-0 mx-md-2 d-inline-block"
				>
					Sign in instead
				</Button>
			</Container>
		</Form.Group>
	);

	const app = step <= MAX_STEP && (
		<>
			{/* <Form onSubmit={onSubmitHandle}> */}
			{step === 1 && (
				<>
					{headline}
					<UserContactFormGroupControl
						sessionStorageObjName={sessionStorageObjName}
					/>
					{passwordFormGroupControl}
					{agreementFormGroupControl}
					{loginFormIntro}
				</>
			)}

			{/* {navigationStepBtnFormGroupControl} */}
			{/* </Form> */}
		</>
	);
	return app;
}

export default NewClassicSignupForm;

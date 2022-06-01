import React, { useState } from "react";
import { Form } from "react-bootstrap";
import AddressFromGroupControl from "./FormGroupControl/AddressFormGroupControl";
import AgreementFormGroupControl from "./FormGroupControl/AgreementFormGroupControl";
import EmailFromGroupControl from "./FormGroupControl/EmailFormGroupControl";
import NamesFormGroupControl from "./FormGroupControl/NamesFormGroupControl";
import NavigationStepBtnFormGroupControl from "./FormGroupControl/NavigationStepBtnFormGroupControl";
import PasswordFromGroupControl from "./FormGroupControl/PasswordFormGroupControl";
import PhoneFromGroupControl from "./FormGroupControl/PhoneFormGroupControl";

function NewClassicSignupForm({
	sessionStorageObjName = "thainow.classic.signup.info",
}) {
	const MAX_STEP = 4;

	const MIN_STEP = 1;

	const [step, setStep] = useState(1);

	const [onSubmitLoading, setOnSubmitLoading] = useState(false);

	const namesFormGroupControl = (
		<NamesFormGroupControl sessionStorageObjName={sessionStorageObjName} />
	);

	const emailFormGroupControl = (
		<EmailFromGroupControl
			formControlId="classic-signup-emailFormControl"
			sessionStorageObjName={sessionStorageObjName}
		/>
	);

	const phoneFormGroupControl = (
		<PhoneFromGroupControl
			formControlId="classic-signup-phoneFormControl"
			sessionStorageObjName={sessionStorageObjName}
		/>
	);

	const addressFormGroupControl = (
		<AddressFromGroupControl
			formControlId="classic-signup-addressFormControl"
			sessionStorageObjName={sessionStorageObjName}
		/>
	);

	const passwordFormGroupControl = (
		<PasswordFromGroupControl
			formControlId="classic-signup-passwordFormControl"
			sessionStorageObjName={sessionStorageObjName}
			withVerifyPasswordFormControl={true}
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

	const app = step <= MAX_STEP && (
		<>
			<Form onSubmit={onSubmitHandle}>
				{step === 1 && (
					<>
						{namesFormGroupControl}
						{emailFormGroupControl}
						{phoneFormGroupControl}
						{addressFormGroupControl}
						{passwordFormGroupControl}
						{agreementFormGroupControl}
					</>
				)}

				{navigationStepBtnFormGroupControl}
			</Form>
		</>
	);
	return app;
}

export default NewClassicSignupForm;

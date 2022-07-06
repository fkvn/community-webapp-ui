import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserAddressFormControlContainer from "../../../Container/FormContainer/FormControlContainer/UserFormControlContainer/UserAddressFormControlContainer";
import UserEmailFormControlContainer from "../../../Container/FormContainer/FormControlContainer/UserFormControlContainer/UserEmailFormControlContainer";
import UserPasswordFormControlContainer from "../../../Container/FormContainer/FormControlContainer/UserFormControlContainer/UserPasswordFormControlContainer";
import UserPhoneFormControlContainer from "../../../Container/FormContainer/FormControlContainer/UserFormControlContainer/UserPhoneFormControlContainer";
import UserUsernameFormControlContainer from "../../../Container/FormContainer/FormControlContainer/UserFormControlContainer/UserUsernameFormControlContainer";
import SelectVerifyMethodContainer from "../../../Container/FormContainer/FormGroupContainer/AuthFormGroupContainer/VerifyMethodContainer/SelectVerifyMethodContainer";
import SendVerifyCodeContainer from "../../../Container/FormContainer/FormGroupContainer/AuthFormGroupContainer/VerifyMethodContainer/SendVerifyCodeContainer";
import VerifyCodeContainer from "../../../Container/FormContainer/FormGroupContainer/AuthFormGroupContainer/VerifyMethodContainer/VerifyCodeContainer";
import * as constVar from "../../../Util/ConstVar";
import AgreementFormControl from "../FormControl/AgreementFormControl";
import AddressFromGroupControl from "../FormGroupControl/AddressFormGroupControl";
import FormGroupControl from "../FormGroupControl/FormGroupControl";
import PasswordFromGroupControl from "../FormGroupControl/PasswordFormGroupControl";
import SubmitButtonFormGroupControl from "../FormGroupControl/SubmitButtonFormGroupControl";

function UserSignupFormBody({
	id = "",
	step = -1,
	onSubmitLoading = false,
	continueURL = "",
	onBack = () => {},
	onSelectVerifyMethod = () => {},
}) {
	const navigate = useNavigate();

	const titleStep1 = (
		<div className="w-100 text-center">
			<div className="fs-3">
				{" "}
				Create a <span style={{ color: "#E94833" }}>ThaiNow</span> Account -
				Step {step} of 2
			</div>
		</div>
	);

	const loginPrompt = (
		<div className="text-center">
			Already have an account?
			<Button
				size="md"
				className="mb-1 rounded-pill d-inline-block shadow-none"
				variant="link"
				onClick={() =>
					navigate(
						`/login${continueURL.length > 0 ? "?continue=" + continueURL : ""}`
					)
				}
			>
				Log In
			</Button>
		</div>
	);

	const subTitleStep1 = (
		<div className="w-100 text-center">
			Thanks for joining ThaiNow community, please provide your information
		</div>
	);

	const usernameFormGroupControl = (
		<FormGroupControl
			{...(id && { id: id + "-username" })}
			required={true}
			withLabel={true}
			label="What should we call you?"
			RenderFormControl={UserUsernameFormControlContainer}
		/>
	);

	const addressFormGroupControl = (
		<AddressFromGroupControl
			{...(id && { id: id + "-address" })}
			required={true}
			withLabel={true}
			label="Where are you from?"
			placeholder="at street, city, or zipcode?"
			RenderFormControl={UserAddressFormControlContainer}
		/>
	);

	const passwordFromGroupControl = (
		<PasswordFromGroupControl
			{...(id && { id: id + "-password" })}
			required={true}
			withLabel={true}
			label="Create Password"
			RenderFormControl={UserPasswordFormControlContainer}
		/>
	);

	const formControlsStep1 = (
		<Stack
			{...(id && { id: "form-body-fields-" + id })}
			gap={3}
			className="col-7 col-xl-4 mx-auto m-4"
		>
			{usernameFormGroupControl}
			{addressFormGroupControl}
			{passwordFromGroupControl}
			<AgreementFormControl />
			<div className="text-center pt-3">
				<SubmitButtonFormGroupControl
					className="px-5"
					title="Sign up"
					isLoading={onSubmitLoading}
				/>
			</div>
		</Stack>
	);

	const renderStep1 = (
		<>
			{" "}
			{titleStep1}
			{loginPrompt}
			{subTitleStep1}
			{formControlsStep1}
		</>
	);

	const titleStep2and3and4 = (
		<div className="w-100 text-center">
			<div className="fs-3 my-4">
				{" "}
				Create a <span style={{ color: "#E94833" }}>ThaiNow</span> Account -
				Step {step > 2 ? 2 : step} of 2
			</div>
		</div>
	);

	const formControlsStep2 = (
		<Stack
			{...(id && { id: "form-body-fields-" + id })}
			gap={3}
			className="col-7 col-xl-4 mx-auto w-100 m-4"
		>
			<SelectVerifyMethodContainer
				title={titleStep2and3and4}
				storageObjName={constVar.THAINOW_USER_SIGN_UP_STORAGE_OBJ}
				onBack={onBack}
				onSelectVerifyMethod={onSelectVerifyMethod}
				onSubmitLoading={onSubmitLoading}
			/>
		</Stack>
	);

	const renderStep2 = <>{formControlsStep2}</>;

	const formControlsStep3 = (
		<Stack
			{...(id && { id: "form-body-fields-" + id })}
			gap={3}
			className="col-7 col-xl-4 mx-auto w-100 m-4"
		>
			<SendVerifyCodeContainer
				title={titleStep2and3and4}
				storageObjName={constVar.THAINOW_USER_SIGN_UP_STORAGE_OBJ}
				onBack={onBack}
				onSubmitLoading={onSubmitLoading}
				EmailRenderFormControl={UserEmailFormControlContainer}
				PhoneRenderFormControl={UserPhoneFormControlContainer}
			/>
		</Stack>
	);

	const renderStep3 = <>{formControlsStep3}</>;

	const formControlsStep4 = (
		<Stack
			{...(id && { id: "form-body-fields-" + id })}
			gap={3}
			className="col-7 col-xl-4 mx-auto w-100 m-4"
		>
			<VerifyCodeContainer
				title={titleStep2and3and4}
				storageObjName={constVar.THAINOW_USER_SIGN_UP_STORAGE_OBJ}
				onBack={onBack}
				onSubmitLoading={onSubmitLoading}
			/>
		</Stack>
	);

	const renderStep4 = <>{formControlsStep4}</>;

	const app = (
		<Stack
			{...(id && { id: "form-body-" + id })}
			gap={3}
			className="col-12 col-md-7 mx-auto my-5"
		>
			{step === 1 && renderStep1}
			{step === 2 && renderStep2}
			{step === 3 && renderStep3}
			{step === 4 && renderStep4}
		</Stack>
	);
	return app;
}

export default UserSignupFormBody;

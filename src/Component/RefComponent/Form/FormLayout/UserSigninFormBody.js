import { Stack } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import UserEmailFormControlContainer from "../../../Container/FormContainer/FormControlContainer/UserFormControlContainer/UserEmailFormControlContainer";
import UserPasswordFormControlContainer from "../../../Container/FormContainer/FormControlContainer/UserFormControlContainer/UserPasswordFormControlContainer";
import UserPhoneFormControlContainer from "../../../Container/FormContainer/FormControlContainer/UserFormControlContainer/UserPhoneFormControlContainer";
import LoadingButton from "../../Button/LoadingButton";
import EmailFromGroupControl from "../FormGroupControl/EmailFormGroupControl";
import PasswordFromGroupControl from "../FormGroupControl/PasswordFormGroupControl";
import PhoneFromGroupControl from "../FormGroupControl/PhoneFormGroupControl";
import SubmitButtonFormGroupControl from "../FormGroupControl/SubmitButtonFormGroupControl";

import * as constVar from "../../../Util/ConstVar";

function UserSigninFormBody({
	id = "",
	step = -1,
	onSubmitLoading = false,
	signinMethod = constVar.EMAIL_PROP,
	onSelectSigninMethod = () => {},
}) {
	// const [signinMethod, setSigninMethod] = useState(constVar.EMAIL_PROP);

	const navigate = useNavigate();
	const location = useLocation();

	const title = (
		<div className="w-100 text-center">
			<div className="fs-3">
				{" "}
				Sign In to your <span style={{ color: "#E94833" }}>ThaiNow</span>{" "}
				Account
			</div>
		</div>
	);

	const signupPrompt = (
		<div className="text-center">
			Don't have an account?
			<LoadingButton
				id="signupbutton"
				className="mb-1 rounded-pill d-inline-block shadow-none"
				variant="link"
				size="md"
				title="Sign up"
				onClick={() =>
					navigate("/signup", {
						state: {
							continue: location.state?.continue || "",
						},
					})
				}
			/>
		</div>
	);

	const emailFormGroupControl = (
		<EmailFromGroupControl
			required={true}
			RenderFormControl={UserEmailFormControlContainer}
			renderProps={{
				storageObjName: constVar.THAINOW_USER_SIGN_IN_OBJ,
			}}
		/>
	);

	const phoneFormGroupControl = (
		<PhoneFromGroupControl
			required={true}
			RenderFormControl={UserPhoneFormControlContainer}
			renderProps={{
				storageObjName: constVar.THAINOW_USER_SIGN_IN_OBJ,
			}}
		/>
	);

	const passwordFromGroupControl = (
		<PasswordFromGroupControl
			{...(id && { id: id + "-password" })}
			required={true}
			withLabel={true}
			label="Create Password"
			RenderFormControl={UserPasswordFormControlContainer}
			renderProps={{
				autocomplete: true,
				storageObjName: constVar.THAINOW_USER_SIGN_IN_OBJ,
			}}
		/>
	);

	const formControls = (
		<Stack
			{...(id && { id: "form-body-fields-" + id })}
			gap={3}
			className="col-7 col-xl-5 mx-auto m-4"
		>
			{signinMethod === "email" && emailFormGroupControl}
			{signinMethod === "phone" && phoneFormGroupControl}

			<LoadingButton
				type="button"
				title={`Sign in with ${
					signinMethod === constVar.EMAIL_PROP ? "Phone" : "Email"
				} instead`}
				variant="link"
				className="text-start px-0"
				onClick={() => {
					const channel =
						signinMethod === constVar.EMAIL_PROP
							? constVar.PHONE_PROP
							: constVar.EMAIL_PROP;
					onSelectSigninMethod(channel);
				}}
			/>

			{passwordFromGroupControl}

			<div className="text-center pt-3">
				<SubmitButtonFormGroupControl
					id="signin"
					className="px-5"
					title="Sign In"
					isLoading={onSubmitLoading}
				/>
			</div>
		</Stack>
	);

	const renderStep1 = (
		<>
			{" "}
			{title}
			{signupPrompt}
			{formControls}
		</>
	);

	const app = (
		<Stack
			{...(id && { id: "form-body-" + id })}
			gap={3}
			className="col-12 col-md-7 mx-auto my-5"
		>
			{step === 1 && renderStep1}
		</Stack>
	);
	return app;
}

export default UserSigninFormBody;

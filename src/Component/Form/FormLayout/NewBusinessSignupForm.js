import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import SelectVerifyMethodContainer from "../../../Container/FormContainer/FormGroupContainer/AuthFormGroupContainer/VerifyMethodContainer/SelectVerifyMethodContainer";
import CompanyContactFormGroupContainer from "../../../Container/FormContainer/FormGroupContainer/CompanyFormGroupContainer/CompanyContactFormGroupContainer";
import CompanyMoreInfoFormGroupContainer from "../../../Container/FormContainer/FormGroupContainer/CompanyFormGroupContainer/CompanyMoreInfoFormGroupContainer";
import BusinessInfoFormGroupContainer from "../../../Container/FormContainer/FormGroupContainer/UserFormGroupContainer/BusinessInfoFormGroupContainer";
import AgreementFormGroupControl from "../FormGroupControl/AgreementFormGroupControl";
import PrevstepFormGroupControl from "../FormGroupControl/PrevstepFormGroupControl";
import ReadOnlyFormGroupControl from "../FormGroupControl/ReadOnlyFormGroupControl";
import SubmitButtonFormGroupControl from "../FormGroupControl/SubmitButtonFormGroupControl";

import UserEmailFormControlContainer from "../../../Container/FormContainer/FormControlContainer/UserFormControlContainer/UserEmailFormControlContainer";
import UserPhoneFormControlContainer from "../../../Container/FormContainer/FormControlContainer/UserFormControlContainer/UserPhoneFormControlContainer";
import SendVerifyCodeContainer from "../../../Container/FormContainer/FormGroupContainer/AuthFormGroupContainer/VerifyMethodContainer/SendVerifyCodeContainer";
import VerifyCodeContainer from "../../../Container/FormContainer/FormGroupContainer/AuthFormGroupContainer/VerifyMethodContainer/VerifyCodeContainer";
import * as constVar from "../../../Util/ConstVar";

function NewBusinessSignupForm({
	step = -1,
	onBack = () => {},
	onSubmitLoading = false,
	onSelectVerifyMethod = () => {},
}) {
	const navigate = useNavigate();

	let [searchParams] = useSearchParams();

	const continueUrl = searchParams.get("continue") || "/";

	const continueParams =
		continueUrl.length > 0 ? "?continue=" + continueUrl : "";

	const step_1_headline = (
		<ReadOnlyFormGroupControl
			title={
				<>
					<p>Start bringing your resouces to Thai community in the U.S.</p>
					<p className="text-center">Please tell us about your business</p>
				</>
			}
			style={{ fontSize: "1.2rem" }}
		/>
	);

	const agreementFormGroupControl = <AgreementFormGroupControl />;

	const loginFormIntro = (
		<Form.Group className="mb-4 text-center">
			<Container className="tedkvn-center p-0 " fluid>
				<Button
					variant="link"
					href={`/login${continueParams}`}
					className="px-1 px-sm-0 mx-md-2 d-inline-block"
				>
					Sign in instead
				</Button>
			</Container>
		</Form.Group>
	);

	const RenderStep1 = () => (
		<>
			{step_1_headline}{" "}
			<CompanyContactFormGroupContainer formGroupClassName="mt-3" />
			<CompanyMoreInfoFormGroupContainer formGroupClassName="mt-4" />
			{agreementFormGroupControl}
			<div className="text-center pt-3">
				<SubmitButtonFormGroupControl className="px-5" show={onSubmitLoading} />
			</div>
			{loginFormIntro}
		</>
	);
	const step_2_headline = (
		<ReadOnlyFormGroupControl
			title={
				<>
					<div className="text-center ">
						Thanks for providing your business infomration.{" "}
						<PrevstepFormGroupControl
							formGroupClassName="d-inline-block"
							className="p-0 mb-1"
							variant="link"
							title="Update business info"
							onClick={() => onBack()}
						/>
					</div>
					<p className="text-center pt-3">Now, please tell us who you are </p>
				</>
			}
			style={{ fontSize: "1.2rem" }}
		/>
	);

	const RenderStep2 = () => (
		<>
			{step_2_headline}
			<BusinessInfoFormGroupContainer />
			<div className="text-center pt-3">
				<SubmitButtonFormGroupControl className="px-5" show={onSubmitLoading} />
			</div>
			<div className="text-center ">
				<PrevstepFormGroupControl
					className="p-0 mb-1"
					variant="link"
					title="Go Back"
					onClick={() => onBack()}
				/>
			</div>
		</>
	);

	const RenderStep3 = () => (
		<>
			<SelectVerifyMethodContainer
				storageObjName={constVar.THAINOW_USER_SIGN_UP_OBJ}
				onSubmitLoading={onSubmitLoading}
				onSelectVerifyMethod={onSelectVerifyMethod}
				onBack={onBack}
			/>
		</>
	);

	const RenderStep4 = () => (
		<>
			<SendVerifyCodeContainer
				storageObjName={constVar.THAINOW_USER_SIGN_UP_OBJ}
				onSubmitLoading={onSubmitLoading}
				onBack={onBack}
				EmailRenderFormControl={UserEmailFormControlContainer}
				PhoneRenderFormControl={UserPhoneFormControlContainer}
			/>
		</>
	);

	const RenderStep5 = () => (
		<>
			<VerifyCodeContainer
				storageObjName={constVar.THAINOW_USER_SIGN_UP_OBJ}
				onSubmitLoading={onSubmitLoading}
				onBack={onBack}
			/>
		</>
	);

	const app = step > 0 && (
		<>
			{step === 1 && <RenderStep1 />}
			{step === 2 && <RenderStep2 />}
			{step === 3 && <RenderStep3 />}
			{step === 4 && <RenderStep4 />}
			{step === 5 && <RenderStep5 />}
		</>
	);
	return app;
}

export default NewBusinessSignupForm;

import CompanyContactFormGroupContainer from "../../../Container/FormContainer/FormGroupContainer/CompanyFormGroupContainer/CompanyContactFormGroupContainer";
import CompanyMoreInfoFormGroupContainer from "../../../Container/FormContainer/FormGroupContainer/CompanyFormGroupContainer/CompanyMoreInfoFormGroupContainer";
import * as constVar from "../../../Util/ConstVar";
import ReadOnlyFormGroupControl from "../FormGroupControl/ReadOnlyFormGroupControl";
import SubmitButtonFormGroupControl from "../FormGroupControl/SubmitButtonFormGroupControl";

function NewBusinessSignupForm({
	storageObjName = "",
	step = -1,
	onBack = () => {},
	onSubmitLoading = false,
}) {
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

	const RenderStep1 = () => (
		<>
			{step_1_headline}{" "}
			<CompanyContactFormGroupContainer
				storageObjName={constVar.THAINOW_COMPANY_SIGN_UP_STORAGE_OBJ}
				formGroupClassName="mt-3"
			/>
			<CompanyMoreInfoFormGroupContainer
				storageObjName={constVar.THAINOW_COMPANY_SIGN_UP_STORAGE_OBJ}
				formGroupClassName="mt-4"
			/>
			<div className="text-center pt-3">
				<SubmitButtonFormGroupControl className="px-5" show={onSubmitLoading} />
			</div>
		</>
	);

	const app = step > 0 && (
		<>
			{step === 1 && <RenderStep1 />}
			{/* {step === 2 && <RenderStep2 />}
			{step === 3 && <RenderStep3 />}
			{step === 4 && <RenderStep4 />} */}
		</>
	);
	return app;
}

export default NewBusinessSignupForm;

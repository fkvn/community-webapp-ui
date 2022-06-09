import CompanyIndustryFormGroupControl from "../FormGroupControl/CompanyInfoFormGroupControl/CompanyIndustryFormGroupControl";
import ReadOnlyFormGroupControl from "../FormGroupControl/ReadOnlyFormGroupControl";

function NewBusinessSignupForm({
	storageObjName = "",
	step = 1,
	onBack = () => {},
	onSubmitLoading = false,
	industryList = [],
	positionList = [],
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
			<CompanyIndustryFormGroupControl
				required={true}
				storageObjName={storageObjName}
				formGroupClassName="mt-4"
			/>
			{/* <CompanyContactFormGroupControl
				storageObjName={storageObjName}
				formGroupClassName="mt-3"
			/>
			<CompanyMoreInfoFormGroupControl formGroupClassName="mt-3" /> */}
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

import React from "react";
import { Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import CompanyAddressFormControlContainer from "../../../Container/FormContainer/FormControlContainer/CompanyFormControlContainer/CompanyAddressFormControlContainer";
import CompanyIndustryFormControlContainer from "../../../Container/FormContainer/FormControlContainer/CompanyFormControlContainer/CompanyIndustryFormControlContainer";
import CompanyNameFormControlContainer from "../../../Container/FormContainer/FormControlContainer/CompanyFormControlContainer/CompanyNameFormControlContainer";
import AddressFromGroupControl from "../FormGroupControl/AddressFormGroupControl";
import FormGroupControl from "../FormGroupControl/FormGroupControl";

import CompanyEmailFormControlContainer from "../../../Container/FormContainer/FormControlContainer/CompanyFormControlContainer/CompanyEmailFormControlContainer";
import CompanyInformalCheckFormControlContainer from "../../../Container/FormContainer/FormControlContainer/CompanyFormControlContainer/CompanyInformalCheckFormControlContainer";
import CompanyPhoneFormControlContainer from "../../../Container/FormContainer/FormControlContainer/CompanyFormControlContainer/CompanyPhoneFormControlContainer";
import CompanyWebsiteFormControlContainer from "../../../Container/FormContainer/FormControlContainer/CompanyFormControlContainer/CompanyWebsiteFormControlContainer";
import * as constVar from "../../../Util/ConstVar";
import AgreementFormGroupControl from "../FormGroupControl/AgreementFormGroupControl";
import EmailFromGroupControl from "../FormGroupControl/EmailFormGroupControl";
import PhoneFromGroupControl from "../FormGroupControl/PhoneFormGroupControl";
import SubmitButtonFormGroupControl from "../FormGroupControl/SubmitButtonFormGroupControl";
import UrlFormGroupControl from "../FormGroupControl/UrlFormGroupControl";

function BusinessSignupFormBody({
	id = "",
	step = -1,
	onSubmitLoading = false,
}) {
	const titleStep1 = (
		<div className="w-100 text-center">
			<div className="fs-3">
				Register a <span style={{ color: "#E94833" }}>Business</span> Profile
			</div>
			<div className="my-3 text-muted">
				Thanks for joining ThaiNow community, please tell us about your business
			</div>
		</div>
	);

	const companyNameFomrGroupControl = (
		<FormGroupControl
			required={true}
			withLabel={true}
			label="What is your business name"
			RenderFormControl={CompanyNameFormControlContainer}
			note="When you use your business profile to post, share or review content with others, your business name will show up with it."
		/>
	);

	const companyIndustryFormGroupControl = (
		<FormGroupControl
			required={true}
			withLabel={true}
			label="Business Industry"
			RenderFormControl={CompanyIndustryFormControlContainer}
		/>
	);

	const isInformal = useSelector(
		(state) =>
			state.thainowReducer[`${constVar.THAINOW_COMPANY_SIGN_UP_OBJ}`][
				`${constVar.COMPANY_INFORMAL_PROP}`
			] || ""
	);

	const companyAddressFormGroupControl = (
		<AddressFromGroupControl
			required={true}
			withLabel={true}
			label={
				isInformal ? "Where do you provide your services?" : "Business Location"
			}
			RenderFormControl={CompanyAddressFormControlContainer}
		/>
	);

	const companyInformalCheckFormGroupControl = (
		<FormGroupControl
			inputGroupClassName="border-0 checkbox"
			RenderFormControl={CompanyInformalCheckFormControlContainer}
		/>
	);

	const phoneFormGroupControl = (
		<PhoneFromGroupControl
			label={`Business Phone Number ${isInformal ? "" : "(optional)"}`}
			required={isInformal ? true : false}
			RenderFormControl={CompanyPhoneFormControlContainer}
		/>
	);

	const emailFormGroupControl = (
		<EmailFromGroupControl
			label="Business Email (optional)"
			RenderFormControl={CompanyEmailFormControlContainer}
		/>
	);

	const websiteFormGroupControl = (
		<UrlFormGroupControl
			label="Business Website (optional)"
			placeholder="Website or social media sites (Facebook, Instagram, Line, Etc.)"
			RenderFormControl={CompanyWebsiteFormControlContainer}
		/>
	);

	const formControlsStep1 = (
		<Stack
			{...(id && { id: "form-body-fields-" + id })}
			gap={3}
			className="col-7 col-xl-5 mx-auto m-4"
		>
			{companyNameFomrGroupControl}
			{companyIndustryFormGroupControl}
			{!isInformal && companyAddressFormGroupControl}
			{isInformal && <>{phoneFormGroupControl}</>}
			{companyInformalCheckFormGroupControl}
			{emailFormGroupControl}
			{!isInformal && phoneFormGroupControl}
			{websiteFormGroupControl}
			<AgreementFormGroupControl withAdsAgreement={false} />
			<div className="text-center pt-3">
				<SubmitButtonFormGroupControl
					title="Register Business"
					className="px-5"
					show={onSubmitLoading}
				/>
			</div>
		</Stack>
	);

	const renderStep1 = (
		<>
			{titleStep1}
			{formControlsStep1}
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

export default BusinessSignupFormBody;

import { Col, Form, Row } from "react-bootstrap";
import AddressFromGroupControl from "../../../../Component/Form/FormGroupControl/AddressFormGroupControl";
import FormGroupControl from "../../../../Component/Form/FormGroupControl/FormGroupControl";

import CompanyIndustryFormControlContainer from "../../FormControlContainer/CompanyFormControlContainer/CompanyIndustryFormControlContainer";

import CompanyAddressFormControlContainer from "../../FormControlContainer/CompanyFormControlContainer/CompanyAddressFormControlContainer";
import CompanyInformalCheckFormControlContainer from "../../FormControlContainer/CompanyFormControlContainer/CompanyInformalCheckFormControlContainer";
import CompanyNameFormControlContainer from "../../FormControlContainer/CompanyFormControlContainer/CompanyNameFormControlContainer";

import { useSelector } from "react-redux";
import PhoneFromGroupControl from "../../../../Component/Form/FormGroupControl/PhoneFormGroupControl";
import UrlFormGroupControl from "../../../../Component/Form/FormGroupControl/UrlFormGroupControl";
import * as constVar from "../../../../Util/ConstVar";
import CompanyPhoneFormControlContainer from "../../FormControlContainer/CompanyFormControlContainer/CompanyPhoneFormControlContainer";
import CompanyWebsiteFormControlContainer from "../../FormControlContainer/CompanyFormControlContainer/CompanyWebsiteFormControlContainer";

function CompanyContactFormGroupContainer({
	storageObjName = constVar.THAINOW_COMPANY_SIGN_UP_OBJ,
	formGroupClassName = "",
}) {
	const companyNameFomrGroupControl = (
		<FormGroupControl
			required={true}
			withLabel={true}
			label="Business Name"
			storageObjName={storageObjName}
			RenderFormControl={CompanyNameFormControlContainer}
		/>
	);

	const companyIndustryFormGroupControl = (
		<FormGroupControl
			required={true}
			withLabel={true}
			label="Business Industry"
			storageObjName={storageObjName}
			RenderFormControl={CompanyIndustryFormControlContainer}
		/>
	);

	const companyOnlineCheckFormGroupControl = (
		<FormGroupControl
			storageObjName={storageObjName}
			formGroupClassName="mb-4"
			RenderFormControl={CompanyInformalCheckFormControlContainer}
		/>
	);

	const isInformal = useSelector(
		(state) =>
			state.thainowReducer[`${storageObjName}`][
				`${constVar.COMPANY_INFORMAL_PROP}`
			] || ""
	);

	const companyAddressFormGroupControl = (
		<AddressFromGroupControl
			required={true}
			withLabel={true}
			label={isInformal ? "Business Service Area" : "Business Public Address"}
			placeholder={
				isInformal
					? "Where customers can search for you"
					: "Where is your business"
			}
			storageObjName={storageObjName}
			RenderFormControl={CompanyAddressFormControlContainer}
		/>
	);

	const websiteFormGroupControl = (
		<UrlFormGroupControl
			required={true}
			storageObjName={storageObjName}
			label="Business Website"
			placeholder="Website or social media sites (Facebook, Instagram, Line, Etc.)"
			RenderFormControl={CompanyWebsiteFormControlContainer}
		/>
	);

	const phoneFormGroupControl = (
		<PhoneFromGroupControl
			required={true}
			label="Business Phone"
			storageObjName={storageObjName}
			RenderFormControl={CompanyPhoneFormControlContainer}
		/>
	);

	const app = (
		<>
			<Form.Group className={`tedkvn-formGroupControl ${formGroupClassName}`}>
				<Row className="mt-3">
					<Col xs={12} md={6}>
						{companyNameFomrGroupControl}
					</Col>
					<Col xs={12} md={6}>
						{companyIndustryFormGroupControl}
					</Col>
				</Row>
			</Form.Group>

			{companyOnlineCheckFormGroupControl}

			{isInformal && <>{phoneFormGroupControl}</>}

			{companyAddressFormGroupControl}
		</>
	);
	return app;
}

export default CompanyContactFormGroupContainer;

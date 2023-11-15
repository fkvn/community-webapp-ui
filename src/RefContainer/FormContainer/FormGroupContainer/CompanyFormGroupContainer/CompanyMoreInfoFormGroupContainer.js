import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import EmailFromGroupControl from "../../../../Component/Form/FormGroupControl/EmailFormGroupControl";
import FormGroupControl from "../../../../Component/Form/FormGroupControl/FormGroupControl";
import PhoneFromGroupControl from "../../../../Component/Form/FormGroupControl/PhoneFormGroupControl";
import UrlFormGroupControl from "../../../../Component/Form/FormGroupControl/UrlFormGroupControl";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";
import CompanyEmailFormControlContainer from "../../FormControlContainer/CompanyFormControlContainer/CompanyEmailFormControlContainer";
import CompanyPhoneFormControlContainer from "../../FormControlContainer/CompanyFormControlContainer/CompanyPhoneFormControlContainer";
import CompanySizeFormControlContainer from "../../FormControlContainer/CompanyFormControlContainer/CompanySizeFormControlContainer";
import CompanyWebsiteFormControlContainer from "../../FormControlContainer/CompanyFormControlContainer/CompanyWebsiteFormControlContainer";

function CompanyMoreInfoFormGroupContainer({
	storageObjName = constVar.THAINOW_COMPANY_SIGN_UP_OBJ,
	formGroupClassName = "",
}) {
	const [extraInfo, setExtraInfo] = useState(
		util.getSessionStorageObj(storageObjName)[
			`${constVar.COMPANY_SUBMIT_EXTRA_INFO_VALIDATION}`
		] || false
	);

	// toggle when users want to save extra info for their customers
	const onSubmitExtraInfoHandler = () => {
		util.saveToSessionStore(
			storageObjName,
			constVar.COMPANY_SUBMIT_EXTRA_INFO_VALIDATION,
			!extraInfo
		);

		setExtraInfo(!extraInfo);
	};

	const emailFormGroupControl = (
		<EmailFromGroupControl
			label="Business Email"
			storageObjName={storageObjName}
			RenderFormControl={CompanyEmailFormControlContainer}
		/>
	);

	const phoneFormGroupControl = (
		<PhoneFromGroupControl
			label="Business Phone"
			storageObjName={storageObjName}
			RenderFormControl={CompanyPhoneFormControlContainer}
		/>
	);

	const websiteFormGroupControl = (
		<UrlFormGroupControl
			label="Business Website"
			placeholder="Website or social media sites (Facebook, Instagram, Line, Etc.)"
			storageObjName={storageObjName}
			RenderFormControl={CompanyWebsiteFormControlContainer}
		/>
	);

	const sizeFormGroupControl = (
		<FormGroupControl
			withLabel={true}
			label="Business Size"
			storageObjName={storageObjName}
			RenderFormControl={CompanySizeFormControlContainer}
		/>
	);

	const isInformal = useSelector(
		(state) =>
			state.thainowReducer[`${storageObjName}`][
				`${constVar.COMPANY_INFORMAL_PROP}`
			] || ""
	);

	const app = (
		<Form.Group className={`custom-formGroupControl ${formGroupClassName}`}>
			<Form.Check
				type="checkbox"
				label={`Provide More Information (Optional)`}
				className="text-primary"
				onClick={() => onSubmitExtraInfoHandler()}
				defaultChecked={
					util.getSessionStorageObj(storageObjName)[
						`${constVar.COMPANY_SUBMIT_EXTRA_INFO_VALIDATION}`
					]
				}
			/>

			{extraInfo && (
				<>
					{" "}
					<Row>
						<Col xs={12} md={6}>
							{emailFormGroupControl}
						</Col>
						<Col xs={12} md={6}>
							{websiteFormGroupControl}
						</Col>
					</Row>{" "}
					{!isInformal && (
						<Row>
							<Col xs={12} md={6}>
								{phoneFormGroupControl}
							</Col>
							<Col xs={12} md={6}>
								{sizeFormGroupControl}
							</Col>
						</Row>
					)}
				</>
			)}
		</Form.Group>
	);

	return app;
}

export default CompanyMoreInfoFormGroupContainer;

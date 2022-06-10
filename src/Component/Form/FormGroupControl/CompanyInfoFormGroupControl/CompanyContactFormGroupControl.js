import { Col, Form, Row } from "react-bootstrap";
import CompanyAddressFormControlContainer from "../../../../Container/FormContainer/FormControlContainer/CompanyFormControlContainer/CompanyAddressFormControlContainer";
import AddressFromGroupControl from "../AddressFormGroupControl";
import CompanyIndustryFormGroupControl from "./CompanyIndustryFormGroupControl";

function CompanyContactFormGroupControl({
	storageObjName = "",
	formGroupClassName = "",
	addressRequired = true,
}) {
	const companynameFormGroupControl = (
		<CompanyIndustryFormGroupControl
			required={true}
			withLabel={false}
			storageObjName={storageObjName}
			// formGroupClassName="mt-4"
		/>
	);

	const addressFormGroupControl = (
		<AddressFromGroupControl
			required={addressRequired}
			placeholder="Where is your business"
			storageObjName={storageObjName}
			RenderFormControl={CompanyAddressFormControlContainer}
		/>
	);

	const app = (
		<Form.Group className={`tedkvn-formGroupControl ${formGroupClassName}`}>
			<Form.Label className={`formLabel tedkvn-required`}>
				Business Public Info
			</Form.Label>
			<Row>
				<Col xs={12} md={5}>
					{companynameFormGroupControl}
				</Col>
				<Col xs={12} md={7}>
					{addressFormGroupControl}
				</Col>
			</Row>
		</Form.Group>
	);
	return app;
}

export default CompanyContactFormGroupControl;

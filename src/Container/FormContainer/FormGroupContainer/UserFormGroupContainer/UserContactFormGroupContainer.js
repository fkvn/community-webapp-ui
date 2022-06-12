import { Col, Form, Row } from "react-bootstrap";
import AddressFromGroupControl from "../../../../Component/Form/FormGroupControl/AddressFormGroupControl";
import FormGroupControl from "../../../../Component/Form/FormGroupControl/FormGroupControl";
import UserAddressFormControlContainer from "../../FormControlContainer/UserFormControlContainer/UserAddressFormControlContainer";
import UserUsernameFormControlContainer from "../../FormControlContainer/UserFormControlContainer/UserUsernameFormControlContainer";

function UserContactFormGroupContainer({ storageObjName = "" }) {
	const usernameFormGroupControl = (
		<FormGroupControl
			id="classic-signup-usernameFormControl"
			required={true}
			withLabel={false}
			storageObjName={storageObjName}
			RenderFormControl={UserUsernameFormControlContainer}
		/>
	);

	const addressFormGroupControl = (
		<AddressFromGroupControl
			id="classic-signup-addressFormControl"
			required={true}
			storageObjName={storageObjName}
			RenderFormControl={UserAddressFormControlContainer}
		/>
	);

	const app = (
		<Form.Group className="tedkvn-formGroupControl mt-5">
			<Form.Label className={`formLabel tedkvn-required`}>
				User Contact Info
			</Form.Label>
			<Row>
				<Col xs={12} md={5}>
					{usernameFormGroupControl}
				</Col>
				<Col xs={12} md={7}>
					{addressFormGroupControl}
				</Col>
			</Row>
		</Form.Group>
	);
	return app;
}

export default UserContactFormGroupContainer;

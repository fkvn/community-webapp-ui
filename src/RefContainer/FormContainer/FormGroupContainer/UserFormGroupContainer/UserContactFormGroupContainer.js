import { Col, Form, Row } from "react-bootstrap";
import AddressFromGroupControl from "../../../../Component/Form/FormGroupControl/AddressFormGroupControl";
import FormGroupControl from "../../../../Component/Form/FormGroupControl/FormGroupControl";
import UserAddressFormControlContainer from "../../FormControlContainer/UserFormControlContainer/UserAddressFormControlContainer";
import UserUsernameFormControlContainer from "../../FormControlContainer/UserFormControlContainer/UserUsernameFormControlContainer";

import * as constVar from "../../../../Util/ConstVar";

function UserContactFormGroupContainer({
	storageObjName = constVar.THAINOW_USER_SIGN_UP_OBJ,
}) {
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
		<Form.Group className="custom-formGroupControl mt-5">
			<Form.Label className={`formLabel custom-required`}>
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

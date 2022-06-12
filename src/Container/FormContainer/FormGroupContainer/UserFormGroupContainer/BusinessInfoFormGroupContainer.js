import { Col, Form, Row } from "react-bootstrap";
import FormGroupControl from "../../../../Component/Form/FormGroupControl/FormGroupControl";
import PasswordFromGroupControl from "../../../../Component/Form/FormGroupControl/PasswordFormGroupControl";
import UserPasswordFormControlContainer from "../../FormControlContainer/UserFormControlContainer/UserPasswordFormControlContainer";

import UserPositionFormControlContainer from "../../FormControlContainer/UserFormControlContainer/UserPositionFormControlContainer";
import UserUsernameFormControlContainer from "../../FormControlContainer/UserFormControlContainer/UserUsernameFormControlContainer";

import * as constVar from "../../../../Util/ConstVar";

function BusinessInfoFormGroupContainer({
	storageObjName = constVar.THAINOW_USER_SIGN_UP_STORAGE_OBJ,
}) {
	const positionFormGroupControl = (
		<FormGroupControl
			required={true}
			withLabel={true}
			label="Your position"
			storageObjName={storageObjName}
			RenderFormControl={UserPositionFormControlContainer}
		/>
	);

	const usernameFormGroupControl = (
		<FormGroupControl
			id="classic-signup-usernameFormControl"
			required={true}
			withLabel={false}
			storageObjName={storageObjName}
			RenderFormControl={UserUsernameFormControlContainer}
		/>
	);

	const passwordFormGroupControl = (
		<PasswordFromGroupControl
			withLabel={false}
			required={true}
			storageObjName={storageObjName}
			RenderFormControl={UserPasswordFormControlContainer}
		/>
	);

	const app = (
		<Form.Group className="tedkvn-formGroupControl mt-3">
			{positionFormGroupControl}
			<Form.Group>
				<Form.Label className="mb-0 mt-3">Your Account Information</Form.Label>
				<Row>
					<Col xs={12} md={4}>
						{usernameFormGroupControl}
					</Col>
					<Col xs={12} md={8}>
						{passwordFormGroupControl}
					</Col>
				</Row>
			</Form.Group>
		</Form.Group>
	);
	return app;
}

export default BusinessInfoFormGroupContainer;

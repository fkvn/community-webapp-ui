import React from "react";
import NewPasswordFormControl from "../FormControl/NewPasswordFormControl";

function PasswordFromGroupControl({
	formGroupClassName = "",
	formControlId = "",
	sessionStorageObjName = "",
	withVerifyPasswordFormControl = false,
}) {
	const app = (
		<NewPasswordFormControl
			formGroupClassName={formGroupClassName}
			{...(formControlId && { id: formControlId })}
			withLabel={true}
			required={true}
			sessionStorageObjName={sessionStorageObjName}
			withVerifyPasswordFormControl={withVerifyPasswordFormControl}
		/>
	);
	return app;
}

export default PasswordFromGroupControl;

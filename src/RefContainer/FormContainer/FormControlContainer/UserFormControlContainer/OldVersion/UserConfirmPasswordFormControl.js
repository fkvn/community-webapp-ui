import * as constVar from "../../../../../Util/ConstVar";
import * as util from "../../../../../Util/Util";
import ConfirmPasswordFormControl from "../ConfirmPasswordFormControl";

//  This is old version that not integrated with Redux
function UserConfirmPasswordFormControl({
	id = "",
	className = "",
	placeholder = "",
	required = false,
	disabled = false,
	passwordChanged = false,
	onConfirmPasswordValidation = () => {},
	storageObjName = "",
}) {
	const onMergeStorageHandler = (isPasswordMatch = false) => {
		util.saveToSessionStore(
			storageObjName,
			constVar.CONFIRM_PASSWORD_VALIDATION,
			isPasswordMatch
		);
	};

	const onGetCurrentPassword = () => {
		return (
			util.getSessionStorageObj(storageObjName)[`${constVar.PASSWORD_PROP}`] ||
			""
		);
	};

	const app = (
		<ConfirmPasswordFormControl
			{...(id && { id: id })}
			{...(placeholder && { placeholder: placeholder })}
			className={className}
			required={required}
			disabled={disabled}
			passwordChanged={passwordChanged}
			onConfirmPasswordValidation={onConfirmPasswordValidation}
			onMergeStorage={onMergeStorageHandler}
			onGetCurrentPassword={onGetCurrentPassword}
		/>
	);
	return app;
}

export default UserConfirmPasswordFormControl;

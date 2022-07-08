import { useEffect } from "react";
import { useSelector } from "react-redux";
import PasswordFormControl from "../../../../Component/Form/FormControl/PasswordFormControl";
import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";

function UserPasswordFormControlContainer({
	id = "",
	className = "",
	placeholder = "",
	required = false,
	disabled = false,
	onPasswordValidation = () => {},
	autocomplete = false,
	storageObjName = constVar.THAINOW_USER_SIGN_UP_OBJ,
}) {
	const password = useSelector(
		(state) =>
			state.thainowReducer[`${storageObjName}`]?.[
				`${constVar.PASSWORD_PROP}`
			] || ""
	);

	const getSessionPassword = () => {
		return (
			util.getSessionStorageObj(storageObjName)[`${constVar.PASSWORD_PROP}`] ||
			""
		);
	};

	const dispatchHandler = ({ ...props }) => {
		switch (storageObjName) {
			case constVar.THAINOW_USER_SIGN_UP_OBJ:
				return dispatchPromise.patchSignupUserInfo({ ...props });
			case constVar.THAINOW_USER_SIGN_IN_OBJ:
				return dispatchPromise.patchSigninUserInfo({ ...props });
			default:
				return async () => {};
		}
	};

	const updateReduxStorePassword = (password = "", isValidPassword = false) => {
		dispatchHandler({
			[`${constVar.PASSWORD_PROP}`]: password,
			[`${constVar.PASSWORD_VALIDATION}`]: isValidPassword,
		});
	};

	const updateSessionPassword = (password = "", isValidPassword = false) => {
		util.saveToSessionStore(storageObjName, constVar.PASSWORD_PROP, password);

		util.saveToSessionStore(
			storageObjName,
			constVar.PASSWORD_VALIDATION,
			isValidPassword
		);
	};

	const onMergeStorageHandler = (password = "") => {
		// validate password
		const isValidPassword = onPasswordValidation(password) || false;

		// update store
		updateReduxStorePassword(password, isValidPassword);

		// update storage
		updateSessionPassword(password, isValidPassword);
	};

	const onLoadDefaultValueHandler = () => {
		// get information from the first time load
		const defaultPassword = getSessionPassword();

		// validate password
		const isValidPassword = onPasswordValidation(defaultPassword) || false;

		if (password !== defaultPassword) {
			updateReduxStorePassword(defaultPassword, isValidPassword);
		}
	};

	//this is to check when the field is filled by redux store value changed
	useEffect(() => {
		// validate password
		const isValidPassword = onPasswordValidation(password) || false;

		const isValidStorePassword =
			dispatchPromise.getState()[`${storageObjName}`]?.[
				`${constVar.PASSWORD_VALIDATION}`
			] || isValidPassword;

		if (isValidStorePassword !== isValidPassword) {
			dispatchHandler({
				[`${constVar.PASSWORD_VALIDATION}`]: isValidPassword,
			});
		}
	}, [password, storageObjName, onPasswordValidation]);

	const app = (
		<PasswordFormControl
			{...(id && { id: id })}
			password={password}
			{...(placeholder && { placeholder: placeholder })}
			className={className}
			required={required}
			disabled={disabled}
			autocomplete={autocomplete}
			onMergeStorage={onMergeStorageHandler}
			onLoadDefaultValue={onLoadDefaultValueHandler}
		/>
	);
	return app;
}

export default UserPasswordFormControlContainer;

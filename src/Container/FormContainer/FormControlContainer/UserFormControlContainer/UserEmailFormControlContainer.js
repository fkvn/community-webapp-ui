import React from "react";
import { useSelector } from "react-redux";
import EmailFormControl from "../../../../Component/Form/FormControl/EmailFormControl";
import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../Util/ConstVar";

function UserEmailFormControlContainer({
	id = "",
	className = "",
	placeholder = "",
	required = false,
	disabled = false,
	onEmailValidation = () => {},
	sessionStorageObjName = "",
}) {
	const email = useSelector(
		(state) =>
			state.thainowReducer[`${sessionStorageObjName}`][
				`${constVar.STORAGE_EMAIL_PROP}`
			] || ""
	);

	// const getSessionEmail = () => {
	// 	return [
	// 		util.getSessionStorageObj(sessionStorageObjName)[
	// 			`${constVar.STORAGE_EMAIL_PROP}`
	// 		] || "",
	// 		util.getSessionStorageObj(sessionStorageObjName)[
	// 			`${constVar.STORAGE_EMAIL_VALIDATION}`
	// 		] || false,
	// 	];
	// };

	const updateReduxStoreEmail = (email = "", isValidEmail = true) => {
		dispatchPromise.patchSignupClassicInfo({
			[`${constVar.STORAGE_EMAIL_PROP}`]: email,
			[`${constVar.STORAGE_EMAIL_VALIDATION}`]: isValidEmail,
		});
	};

	// const updateSessionEmail = (email = "", isValidEmail = true) => {
	// 	util.saveToSessionStore(
	// 		sessionStorageObjName,
	// 		constVar.STORAGE_EMAIL_PROP,
	// 		email
	// 	);

	// 	util.saveToSessionStore(
	// 		sessionStorageObjName,
	// 		constVar.STORAGE_EMAIL_VALIDATION,
	// 		isValidEmail
	// 	);
	// };

	const onMergeStorageSessionHandler = (email = "", isValidEmail = true) => {
		// update store
		updateReduxStoreEmail(email, isValidEmail);

		// update storage
		// updateSessionEmail(email, isValidEmail);

		// validate password
		onEmailValidation(isValidEmail);
	};

	const onLoadDefaultValueHandler = () => {
		// // get information from the first time load
		// const [defaultEmail, isValidEmail] = getSessionEmail();
		// if (email !== defaultEmail) {
		// 	updateReduxStoreEmail(defaultEmail);
		// }
		// // validate password
		// onEmailValidation(isValidEmail);
	};

	const app = (
		<EmailFormControl
			{...(id && { id: id })}
			{...(placeholder && { placeholder: placeholder })}
			className={className}
			email={email}
			required={required}
			disabled={disabled}
			onEmailValidation={onEmailValidation}
			onMergeStorageSession={onMergeStorageSessionHandler}
			onLoadDefaultValue={onLoadDefaultValueHandler}
		/>
	);
	return app;
}

export default UserEmailFormControlContainer;

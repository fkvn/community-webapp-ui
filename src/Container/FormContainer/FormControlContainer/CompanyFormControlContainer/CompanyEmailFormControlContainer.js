import { useEffect } from "react";
import { useSelector } from "react-redux";
import EmailFormControl from "../../../../Component/Form/FormControl/EmailFormControl";
import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";

function CompanyEmailFormControlContainer({
	id = "",
	className = "",
	placeholder = "Enter your email",
	required = false,
	disabled = false,
	onEmailValidation = () => {},
	storageObjName = "",
}) {
	const [email, isValidEmail] = useSelector((state) => [
		state.thainowReducer[`${storageObjName}`][
			`${constVar.STORAGE_EMAIL_PROP}`
		] || "",
		state.thainowReducer[`${storageObjName}`][
			`${constVar.STORAGE_EMAIL_VALIDATION}`
		] || false,
	]);

	const getSessionEmail = () => {
		return [
			util.getSessionStorageObj(storageObjName)[
				`${constVar.STORAGE_EMAIL_PROP}`
			] || "",
			util.getSessionStorageObj(storageObjName)[
				`${constVar.STORAGE_EMAIL_VALIDATION}`
			] || false,
		];
	};

	const updateReduxStoreEmail = (email = "", isValidEmail = true) => {
		dispatchPromise.patchSignupCompanyInfo({
			[`${constVar.STORAGE_EMAIL_PROP}`]: email,
			[`${constVar.STORAGE_EMAIL_VALIDATION}`]: isValidEmail,
		});
	};

	const updateSessionEmail = (email = "", isValidEmail = true) => {
		util.saveToSessionStore(storageObjName, constVar.STORAGE_EMAIL_PROP, email);

		util.saveToSessionStore(
			storageObjName,
			constVar.STORAGE_EMAIL_VALIDATION,
			isValidEmail
		);
	};

	const onMergeStorageHandler = (email = "", isValidEmail = true) => {
		// update store
		updateReduxStoreEmail(email, isValidEmail);

		// update storage
		updateSessionEmail(email, isValidEmail);

		// validate password
		onEmailValidation(isValidEmail);
	};

	const onLoadDefaultValueHandler = () => {
		// get information from the first time load
		const [defaultEmail, isValidEmail] = getSessionEmail();
		if (email !== defaultEmail) {
			updateReduxStoreEmail(defaultEmail);
		}
		// validate password
		onEmailValidation(isValidEmail);
	};

	// this is to check when the field is filled by redux store value changed
	useEffect(() => {
		// validate password
		onEmailValidation(isValidEmail);
	});

	const app = (
		<EmailFormControl
			{...(id && { id: id })}
			{...(placeholder && { placeholder: placeholder })}
			className={className}
			email={email}
			required={required}
			disabled={disabled}
			onEmailValidation={onEmailValidation}
			onMergeStorage={onMergeStorageHandler}
			onLoadDefaultValue={onLoadDefaultValueHandler}
		/>
	);
	return app;
}

export default CompanyEmailFormControlContainer;

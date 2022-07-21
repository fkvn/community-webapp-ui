import { useEffect } from "react";
import { useSelector } from "react-redux";
import FormControlControlled from "../../../../Component/Form/FormControl/FormControlControlled";
import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";

function CompanyEmailFormControlContainer({
	id = "",
	className = "",
	placeholder = "Enter business email",
	required = false,
	disabled = false,
	onEmailValidation = () => {},
	storageObjName = constVar.THAINOW_COMPANY_SIGN_UP_OBJ,
}) {
	const email = useSelector(
		(state) =>
			state.thainowReducer[`${storageObjName}`]?.[
				`${constVar.COMPANY_EMAIL_PROP}`
			] || ""
	);

	const getSessionEmail = () => {
		return (
			util.getSessionStorageObj(storageObjName)[
				`${constVar.COMPANY_EMAIL_PROP}`
			] || ""
		);
	};

	const updateReduxStoreEmail = (email = "", isValidEmail = true) => {
		dispatchPromise.patchSignupCompanyInfoPromise({
			[`${constVar.COMPANY_EMAIL_PROP}`]: email,
			[`${constVar.COMPANY_EMAIL_VALIDATION}`]: isValidEmail,
		});
	};

	const updateSessionEmail = (email = "", isValidEmail = true) => {
		util.saveToSessionStore(storageObjName, constVar.COMPANY_EMAIL_PROP, email);

		util.saveToSessionStore(
			storageObjName,
			constVar.COMPANY_EMAIL_VALIDATION,
			isValidEmail
		);
	};

	const onMergeStorageHandler = (email = "") => {
		// validate password
		const isValidEmail = onEmailValidation(email);

		// update store
		updateReduxStoreEmail(email, isValidEmail);

		// update storage
		updateSessionEmail(email, isValidEmail);
	};

	const onLoadDefaultValueHandler = () => {
		// get information from the first time load
		const defaultEmail = getSessionEmail();

		// validate password
		const isValidEmail = onEmailValidation(defaultEmail);

		if (email !== defaultEmail) {
			updateReduxStoreEmail(defaultEmail, isValidEmail);
		}
	};

	//this is to check when the field is filled by redux store value changed
	useEffect(() => {
		const isValidEmail = onEmailValidation(email);

		const isValidStoreEmail =
			dispatchPromise.getState()[`${storageObjName}`][
				`${constVar.COMPANY_EMAIL_VALIDATION}`
			] || isValidEmail;

		if (isValidStoreEmail !== isValidEmail) {
			dispatchPromise.patchSignupCompanyInfoPromise({
				[`${constVar.COMPANY_EMAIL_VALIDATION}`]: isValidEmail,
			});
		}
	}, [email, storageObjName, onEmailValidation]);

	const app = (
		<FormControlControlled
			type="email"
			{...(id && { id: id })}
			{...(placeholder && { placeholder: placeholder })}
			className={className}
			value={email}
			required={required}
			disabled={disabled}
			onMergeStorage={onMergeStorageHandler}
			onLoadDefaultValue={onLoadDefaultValueHandler}
		/>
	);
	return app;
}

export default CompanyEmailFormControlContainer;

import { useEffect } from "react";
import { useSelector } from "react-redux";
import PhoneFormControl from "../../../../Component/Form/FormControl/PhoneFormControl";
import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";

function CompanyPhoneFormControlContainer({
	id = "",
	className = "",
	placeholder = "",
	required = false,
	disabled = false,
	onPhoneValidation = () => {},
	storageObjName = constVar.THAINOW_COMPANY_SIGN_UP_OBJ,
}) {
	const formattedPhone = useSelector(
		(state) =>
			state.thainowReducer[`${storageObjName}`][
				`${constVar.COMPANY_PHONE_PROP}`
			] || ""
	);

	const getSessionPhone = () => {
		return (
			util.getSessionStorageObj(storageObjName)[
				`${constVar.COMPANY_PHONE_PROP}`
			] || ""
		);
	};

	const updateReduxStorePhone = (formattedPhone = "", isValidPhone = true) => {
		dispatchPromise.patchSignupCompanyInfo({
			[`${constVar.COMPANY_PHONE_PROP}`]: formattedPhone,
			[`${constVar.COMPANY_PHONE_VALIDATION}`]: isValidPhone,
		});
	};

	const updateSessionPhone = (formattedPhone = "", isValidPhone = true) => {
		util.saveToSessionStore(
			storageObjName,
			constVar.COMPANY_PHONE_PROP,
			formattedPhone
		);

		util.saveToSessionStore(
			storageObjName,
			constVar.COMPANY_PHONE_VALIDATION,
			isValidPhone
		);
	};

	const onMergeStorageHandler = (formattedPhone = "") => {
		const isValidPhone = onPhoneValidation(formattedPhone);

		// update storage
		updateReduxStorePhone(formattedPhone, isValidPhone);

		// update storage
		updateSessionPhone(formattedPhone, isValidPhone);
	};

	const onLoadDefaultValueHandler = () => {
		// get information from the first time load
		// phone must be formatted as (xxx) xxx-xxxx
		const defaultFormattedPhone = getSessionPhone();

		// validate password
		const isValidPhone = onPhoneValidation(defaultFormattedPhone);

		if (formattedPhone !== defaultFormattedPhone) {
			updateReduxStorePhone(defaultFormattedPhone, isValidPhone);
		}
	};

	// this is to check when the field is filled by redux store value changed
	useEffect(() => {
		const isValidPhone = onPhoneValidation(formattedPhone);

		const isValidStorePhone =
			dispatchPromise.getState()[`${storageObjName}`][
				`${constVar.COMPANY_PHONE_VALIDATION}`
			] || isValidPhone;

		if (isValidStorePhone !== isValidPhone) {
			dispatchPromise.patchSignupCompanyInfo({
				[`${constVar.COMPANY_PHONE_VALIDATION}`]: isValidPhone,
			});
		}
	}, [formattedPhone, storageObjName, onPhoneValidation]);

	const app = (
		<PhoneFormControl
			{...(id && { id: id })}
			{...(placeholder && { placeholder: placeholder })}
			className={className}
			required={required}
			disabled={disabled}
			formattedPhone={formattedPhone}
			onMergeStorage={onMergeStorageHandler}
			onLoadDefaultValue={onLoadDefaultValueHandler}
		/>
	);
	return app;
}

export default CompanyPhoneFormControlContainer;

import React from "react";
import { useSelector } from "react-redux";
import PhoneFormControl from "../../../../Component/Form/FormControl/PhoneFormControl";
import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../Util/ConstVar";

function UserPhoneFormControlContainer({
	id = "",
	className = "",
	required = false,
	disabled = false,
	onPhoneValidation = () => {},
	storageObjName = "",
}) {
	const phone = useSelector(
		(state) =>
			state.thainowReducer[`${storageObjName}`][
				`${constVar.STORAGE_PHONE_PROP}`
			] || ""
	);

	const updateReduxStorePhone = (formattedPhone = "", isValidPhone = true) => {
		dispatchPromise.patchSignupClassicInfo({
			[`${constVar.STORAGE_PHONE_PROP}`]: formattedPhone,
			[`${constVar.STORAGE_PHONE_VALIDATION}`]: isValidPhone,
		});
	};

	// const getSessionPhone = () => {
	// 	return [
	// 		util.getSessionStorageObj(storageObjName)[
	// 			`${constVar.STORAGE_PHONE_PROP}`
	// 		] || "",
	// 		util.getSessionStorageObj(storageObjName)[
	// 			`${constVar.STORAGE_PHONE_VALIDATION}`
	// 		] || false,
	// 	];
	// };

	// const updateSessionPhone = (formattedPhone = "", isValidPhone = true) => {
	// 	util.saveToSessionStore(
	// 		storageObjName,
	// 		constVar.STORAGE_PHONE_PROP,
	// 		formattedPhone
	// 	);

	// 	util.saveToSessionStore(
	// 		storageObjName,
	// 		constVar.STORAGE_PHONE_VALIDATION,
	// 		isValidPhone
	// 	);
	// };

	const onMergeStorageSessionHandler = (
		formattedPhone = "",
		isValidPhone = true
	) => {
		// update storage
		updateReduxStorePhone(formattedPhone, isValidPhone);

		// update storage
		// updateSessionPhone(formattedPhone, isValidPhone);

		// validate phone
		onPhoneValidation(isValidPhone);
	};

	const onLoadDefaultValueHandler = () => {
		// get information from the first time load
		// const [defaultPhone, isValidPhone] = getSessionPhone();
		// if (phone !== defaultPhone) {
		// 	updateReduxStorePhone(defaultPhone);
		// }
		// // validate phone
		// onPhoneValidation(isValidPhone);
	};

	const app = (
		<PhoneFormControl
			{...(id && { id: id })}
			className={className}
			required={required}
			disabled={disabled}
			formattedPhone={phone}
			onPhoneValidation={onPhoneValidation}
			onMergeStorageSession={onMergeStorageSessionHandler}
			onLoadDefaultValue={onLoadDefaultValueHandler}
		/>
	);
	return app;
}

export default UserPhoneFormControlContainer;

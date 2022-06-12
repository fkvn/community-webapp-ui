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
		dispatchPromise.patchSignupUserInfo({
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

	const onMergeStorageHandler = (formattedPhone = "") => {
		const isValidPhone = onPhoneValidation(formattedPhone);

		// update storage
		updateReduxStorePhone(formattedPhone, isValidPhone);

		// update storage
		// updateSessionPhone(formattedPhone, isValidPhone);

		// validate phone
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
			onMergeStorage={onMergeStorageHandler}
			onLoadDefaultValue={onLoadDefaultValueHandler}
		/>
	);
	return app;
}

export default UserPhoneFormControlContainer;

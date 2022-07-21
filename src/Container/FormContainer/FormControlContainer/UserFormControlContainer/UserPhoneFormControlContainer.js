import { useEffect } from "react";
import { useSelector } from "react-redux";
import PhoneFormControl from "../../../../Component/Form/FormControl/PhoneFormControl";
import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";

function UserPhoneFormControlContainer({
	id = "",
	className = "",
	required = false,
	disabled = false,
	onPhoneValidation = () => {},
	storageObjName = constVar.THAINOW_USER_SIGN_UP_OBJ,
	saveAndLoadValue = true,
}) {
	const phone = useSelector(
		(state) =>
			state.thainowReducer[`${storageObjName}`]?.[`${constVar.PHONE_PROP}`] ||
			""
	);

	const getSessionPhone = () => {
		return (
			util.getSessionStorageObj(storageObjName)[`${constVar.PHONE_PROP}`] || ""
		);
	};

	const dispatchHandler = ({ ...props }) => {
		switch (storageObjName) {
			case constVar.THAINOW_USER_SIGN_UP_OBJ:
				return dispatchPromise.patchSignupUserInfoPromise({ ...props });
			case constVar.THAINOW_USER_SIGN_IN_OBJ:
				return dispatchPromise.patchSigninUserInfoPromise({ ...props });
			default:
				return async () => {};
		}
	};

	const updateReduxStorePhone = (formattedPhone = "", isValidPhone = true) => {
		dispatchHandler({
			[`${constVar.PHONE_PROP}`]: formattedPhone,
			[`${constVar.PHONE_VALIDATION}`]: isValidPhone,
		});
	};

	const updateSessionPhone = (formattedPhone = "", isValidPhone = true) => {
		util.saveToSessionStore(
			storageObjName,
			constVar.PHONE_PROP,
			formattedPhone
		);

		util.saveToSessionStore(
			storageObjName,
			constVar.PHONE_VALIDATION,
			isValidPhone
		);
	};

	const onMergeStorageHandler = (formattedPhone = "") => {
		// validate phone
		const isValidPhone = onPhoneValidation(formattedPhone);

		// update storage
		updateReduxStorePhone(formattedPhone, isValidPhone);

		// update storage
		if (saveAndLoadValue) updateSessionPhone(formattedPhone, isValidPhone);
	};

	const onLoadDefaultValueHandler = () => {
		if (saveAndLoadValue) {
			// get information from the first time load
			const defaultPhone = getSessionPhone();

			// validate password
			const isValidPhone = onPhoneValidation(defaultPhone);

			if (phone !== defaultPhone) {
				updateReduxStorePhone(defaultPhone, isValidPhone);
			}
		}
	};

	//this is to check when the field is filled by redux store value changed
	useEffect(() => {
		const isValidPhone = onPhoneValidation(phone);

		const isValidStorePhone =
			dispatchPromise.getState()[`${storageObjName}`]?.[
				`${constVar.PHONE_VALIDATION}`
			] || isValidPhone;

		if (isValidStorePhone !== isValidPhone) {
			dispatchHandler({
				[`${constVar.PHONE_VALIDATION}`]: isValidPhone,
			});
		}
	}, [phone, storageObjName, onPhoneValidation]);

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

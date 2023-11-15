import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import FormControlControlled from "../../../../Component/Form/FormControl/FormControlControlled";
import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";

function UserEmailFormControlContainer({
	id = "",
	className = "",
	placeholder = "Enter valid email",
	required = false,
	disabled = false,
	onEmailValidation = () => {},
	storageObjName = constVar.THAINOW_USER_SIGN_UP_OBJ,
	saveAndLoadValue = true,
}) {
	const email = useSelector(
		(state) =>
			state.thainowReducer[`${storageObjName}`]?.[`${constVar.EMAIL_PROP}`] ||
			""
	);

	const getSessionEmail = () => {
		return (
			util.getSessionStorageObj(storageObjName)[`${constVar.EMAIL_PROP}`] || ""
		);
	};

	const dispatchHandler = useCallback(
		({ ...props }) => {
			switch (storageObjName) {
				case constVar.THAINOW_USER_SIGN_UP_OBJ:
					return dispatchPromise.patchSignupUserInfoPromise({ ...props });
				case constVar.THAINOW_USER_SIGN_IN_OBJ:
					return dispatchPromise.patchSigninUserInfoPromise({ ...props });
				default:
					return async () => {};
			}
		},
		[storageObjName]
	);

	const updateReduxStoreEmail = (email = "", isValidEmail = true) => {
		dispatchHandler({
			[`${constVar.EMAIL_PROP}`]: email,
			[`${constVar.EMAIL_VALIDATION}`]: isValidEmail,
		});
	};

	const updateSessionEmail = (email = "", isValidEmail = true) => {
		util.saveToSessionStore(storageObjName, constVar.EMAIL_PROP, email);

		util.saveToSessionStore(
			storageObjName,
			constVar.EMAIL_VALIDATION,
			isValidEmail
		);
	};

	const onMergeStorageHandler = (email = "") => {
		// validate email
		const isValidEmail = onEmailValidation(email);

		// update store
		updateReduxStoreEmail(email, isValidEmail);

		// update storage
		if (saveAndLoadValue) updateSessionEmail(email, isValidEmail);
	};

	const onLoadDefaultValueHandler = () => {
		if (saveAndLoadValue) {
			// get information from the first time load
			const defaultEmail = getSessionEmail();

			// validate password
			const isValidEmail = onEmailValidation(defaultEmail);

			if (email !== defaultEmail) {
				updateReduxStoreEmail(defaultEmail, isValidEmail);
			}
		}
	};

	//this is to check when the field is filled by redux store value changed
	useEffect(() => {
		const isValidEmail = onEmailValidation(email);

		const isValidStoreEmail =
			dispatchPromise.getState()[`${storageObjName}`]?.[
				`${constVar.EMAIL_VALIDATION}`
			] || isValidEmail;

		if (isValidStoreEmail !== isValidEmail) {
			dispatchHandler({
				[`${constVar.EMAIL_VALIDATION}`]: isValidEmail,
			});
		}
	}, [email, storageObjName, onEmailValidation, dispatchHandler]);

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

export default UserEmailFormControlContainer;

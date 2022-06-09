import React from "react";
import { useSelector } from "react-redux";
import GoogleAutoComplete from "../../../../Component/AutoComplete/GoogleAutoComplete";
import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";

function UserAddressFormControlContainer({
	id = "",
	placeholder = "Where are you from",
	required = false,
	sessionStorageObjName = "",
	onAddressValidation = () => {},
}) {
	const address = useSelector(
		(state) =>
			state.thainowReducer[`${sessionStorageObjName}`][
				`${constVar.STORAGE_ADDRESS_PROP}`
			] || {}
	);

	const getSessionAddress = () => {
		return (
			util.getSessionStorageObj(sessionStorageObjName)[
				`${constVar.STORAGE_ADDRESS_PROP}`
			] || {}
		);
	};

	const updateReduxStoreAddress = (description = "", placeid = "") => {
		dispatchPromise.patchSignupClassicInfo({
			[`${constVar.STORAGE_ADDRESS_PROP}`]: {
				description: description,
				...(placeid && { placeid: placeid }),
			},
		});
	};

	const updateSessionAddress = (description = "", placeid = "") => {
		util.saveToSessionStore(
			sessionStorageObjName,
			constVar.STORAGE_ADDRESS_PROP,
			{
				description: description,
				...(placeid && { placeid: placeid }),
			}
		);
	};

	const onMergeStorageSessionHandler = (description = "", placeid = "") => {
		// update store
		updateReduxStoreAddress(description, placeid);

		// update storage
		updateSessionAddress(description, placeid);

		// check if placeid is missing
		if (description.length > 0 && placeid.length === 0) {
			// notify that address is not valid because it is changing
			onAddressValidation(false);
		} else {
			// notify that address is valid
			onAddressValidation(true);
		}
	};

	const onLoadDefaultValueHandler = () => {
		// get information from the first time load
		const defaultAddress = getSessionAddress();

		// update store
		if (JSON.stringify(address) !== JSON.stringify(defaultAddress)) {
			updateReduxStoreAddress(
				defaultAddress.description,
				defaultAddress.placeid
			);
		}

		// double-check in case placeid is missing
		if (defaultAddress.placeid?.length === 0) {
			// notify that address is not valid because it is changing
			onAddressValidation(false);
		} else {
			// notify that address is valid
			onAddressValidation(true);
		}
	};

	const app = (
		<GoogleAutoComplete
			{...(id && { id: id })}
			{...(placeholder && { placeholder: placeholder })}
			value={address.description || ""}
			required={required}
			onMergeStorageSession={onMergeStorageSessionHandler}
			onLoadDefaultValue={onLoadDefaultValueHandler}
		/>
	);
	return app;
}

export default UserAddressFormControlContainer;

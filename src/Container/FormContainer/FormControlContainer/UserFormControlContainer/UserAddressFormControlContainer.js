import { useEffect } from "react";
import { useSelector } from "react-redux";
import GoogleAutoComplete from "../../../../Component/AutoComplete/GoogleAutoComplete";
import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";

function UserAddressFormControlContainer({
	id = "",
	placeholder = "Where are you from",
	required = false,
	storageObjName = constVar.THAINOW_USER_SIGN_UP_OBJ,
	onAddressValidation = () => {},
}) {
	const [address, showAddressList] = useSelector((state) => [
		state.thainowReducer[`${storageObjName}`]?.[`${constVar.ADDRESS_PROP}`] ||
			{},
		state.thainowReducer[`${storageObjName}`]?.showAddressList || false,
	]);

	const getSessionAddress = () => {
		return (
			util.getSessionStorageObj(storageObjName)[`${constVar.ADDRESS_PROP}`] ||
			{}
		);
	};

	const updateReduxStoreAddress = (
		description = "",
		placeid = "",
		show = false
	) => {
		dispatchPromise.patchSignupUserInfo({
			[`${constVar.ADDRESS_PROP}`]: {
				description: description,
				...(placeid && { placeid: placeid }),
			},
			showAddressList: show,
		});
	};

	const updateSessionAddress = (description = "", placeid = "") => {
		util.saveToSessionStore(storageObjName, constVar.ADDRESS_PROP, {
			description: description,
			...(placeid && { placeid: placeid }),
		});
	};

	const onMergeStorageHandler = (value = "", onSelect = false) => {
		const description = onSelect ? value.description : value || "";
		const placeid = onSelect ? value.placeid : "";

		// update store
		updateReduxStoreAddress(
			description,
			placeid,
			description.length > 0 && !onSelect
		);

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

		// // // update store
		if (
			address.description !== defaultAddress.description ||
			address.placeid !== defaultAddress.placeid
		) {
			updateReduxStoreAddress(
				defaultAddress.description,
				defaultAddress.placeid
			);
		}
		// double-check in case placeid is missing
		if (defaultAddress.description && defaultAddress.placeid?.length === 0) {
			// notify that address is not valid because it is changing
			onAddressValidation(false);
		} else {
			// notify that address is valid
			onAddressValidation(true);
		}
	};

	// this is to check when the field is filled by redux store value changed
	useEffect(() => {
		// check if placeid is missing

		const { description = "", placeid = "" } = address;

		if (description.length > 0 && placeid.length === 0) {
			// notify that address is not valid because it is changing
			onAddressValidation(false);
		} else {
			// notify that address is valid
			onAddressValidation(true);
		}
	}, [address, onAddressValidation]);

	const app = (
		<GoogleAutoComplete
			{...(id && { id: id })}
			{...(placeholder && { placeholder: placeholder })}
			value={address.description || ""}
			showAddressList={showAddressList}
			required={required}
			onMergeStorage={onMergeStorageHandler}
			onLoadDefaultValue={onLoadDefaultValueHandler}
		/>
	);
	return app;
}

export default UserAddressFormControlContainer;

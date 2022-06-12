import { useEffect } from "react";
import { useSelector } from "react-redux";
import FormControlControlled from "../../../../Component/Form/FormControl/FormControlControlled";
import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";

function CompanyWebsiteFormControlContainer({
	id = "",
	className = "",
	placeholder = "Business website",
	required = false,
	disabled = false,
	onUrlValidation = () => {},
	storageObjName = "",
}) {
	const website = useSelector(
		(state) =>
			state.thainowReducer[`${storageObjName}`][
				`${constVar.STORAGE_COMPANY_WEBSITE_PROP}`
			] || ""
	);

	const getSessionWebsite = () => {
		return (
			util.getSessionStorageObj(storageObjName)[
				`${constVar.STORAGE_COMPANY_WEBSITE_PROP}`
			] || ""
		);
	};

	const updateReduxStoreWebsite = (url = "", isValidUrl = true) => {
		dispatchPromise.patchSignupCompanyInfo({
			[`${constVar.STORAGE_COMPANY_WEBSITE_PROP}`]: url,
			[`${constVar.STORAGE_COMPANY_WEBSITE_VALIDATION}`]: isValidUrl,
		});
	};

	const updateSessionWebsite = (url = "", isValidUrl = true) => {
		util.saveToSessionStore(
			storageObjName,
			constVar.STORAGE_COMPANY_WEBSITE_PROP,
			url
		);

		util.saveToSessionStore(
			storageObjName,
			constVar.STORAGE_COMPANY_WEBSITE_VALIDATION,
			isValidUrl
		);
	};

	const onMergeStorageHandler = (url = "") => {
		// validate password
		const isValidUrl = onUrlValidation(url);

		// update store
		updateReduxStoreWebsite(url, isValidUrl);

		// update storage
		updateSessionWebsite(url, isValidUrl);
	};

	const onLoadDefaultValueHandler = () => {
		// get information from the first time load
		const defaultWebsite = getSessionWebsite();

		// validate password
		const isValidUrl = onUrlValidation(defaultWebsite);

		if (website !== defaultWebsite) {
			updateReduxStoreWebsite(defaultWebsite, isValidUrl);
		}
	};

	//this is to check when the field is filled by redux store value changed
	useEffect(() => {
		const isValidUrl = onUrlValidation(website);

		const isValidStoreWebsite =
			dispatchPromise.getState()[`${storageObjName}`][
				`${constVar.STORAGE_COMPANY_WEBSITE_VALIDATION}`
			] || isValidUrl;

		if (isValidStoreWebsite !== isValidUrl) {
			dispatchPromise.patchSignupCompanyInfo({
				[`${constVar.STORAGE_COMPANY_WEBSITE_VALIDATION}`]: isValidUrl,
			});
		}
	}, [website, storageObjName, onUrlValidation]);

	const app = (
		<FormControlControlled
			type="url"
			{...(id && { id: id })}
			{...(placeholder && { placeholder: placeholder })}
			className={className}
			value={website}
			required={required}
			disabled={disabled}
			onMergeStorage={onMergeStorageHandler}
			onLoadDefaultValue={onLoadDefaultValueHandler}
		/>
	);
	return app;
}

export default CompanyWebsiteFormControlContainer;

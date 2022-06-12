import { useSelector } from "react-redux";
import FormControlControlled from "../../../../Component/Form/FormControl/FormControlControlled";
import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";

function CompanyOnlineCheckFormControlContainer({
	id = "",
	className = "",
	required = false,
	disabled = false,
	storageObjName = "",
}) {
	const isOnlineStore = useSelector(
		(state) =>
			state.thainowReducer[`${storageObjName}`][
				`${constVar.STORAGE_COMPANY_IS_ONLINE_PROP}`
			] || false
	);

	const getSessionIsOnline = () => {
		return (
			util.getSessionStorageObj(storageObjName)[
				`${constVar.STORAGE_COMPANY_IS_ONLINE_PROP}`
			] || false
		);
	};

	const updateReduxStoreIsOnline = (isOnlineStore = false) => {
		dispatchPromise.patchSignupCompanyInfo({
			[`${constVar.STORAGE_COMPANY_IS_ONLINE_PROP}`]: isOnlineStore,
		});
	};

	const updateSessionIsOnline = (isOnlineStore = false) => {
		util.saveToSessionStore(
			storageObjName,
			constVar.STORAGE_COMPANY_IS_ONLINE_PROP,
			isOnlineStore
		);
	};

	const onClickHanlder = () => {
		// update store
		updateReduxStoreIsOnline(!isOnlineStore);

		// update storage
		updateSessionIsOnline(!isOnlineStore);
	};

	const onLoadDefaultValueHandler = () => {
		// get information from the first time load
		const isDefaultOnline = getSessionIsOnline();

		if (isOnlineStore !== isDefaultOnline) {
			updateReduxStoreIsOnline(isDefaultOnline);
		}
	};

	// console.log(isOnlineStore);

	const app = (
		<FormControlControlled
			{...(id && { id: id })}
			type="checkbox"
			label="Online Store (Freelancer or Self-Employed)"
			className={className}
			required={required}
			disabled={disabled}
			onClick={onClickHanlder}
			onLoadDefaultValue={onLoadDefaultValueHandler}
			value={isOnlineStore}
		/>
	);
	return app;
}

export default CompanyOnlineCheckFormControlContainer;

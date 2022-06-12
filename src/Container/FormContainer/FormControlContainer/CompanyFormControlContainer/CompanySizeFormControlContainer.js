import { useSelector } from "react-redux";
import SelectFormControl from "../../../../Component/Form/FormControl/SelectFormControl";
import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";

function CompanySizeFormControlContainer({
	id = "",
	className = "",
	placeholder = "Business Size",
	required = false,
	disabled = false,
	storageObjName = "",
}) {
	const options = [...constVar.COMPANY_SIZE_LIST];

	const size = useSelector(
		(state) =>
			state.thainowReducer[`${storageObjName}`][
				`${constVar.STORAGE_COMPANY_SIZE_PROP}`
			] || ""
	);

	const getSessionSize = () => {
		return (
			util.getSessionStorageObj(storageObjName)[
				`${constVar.STORAGE_COMPANY_SIZE_PROP}`
			] || ""
		);
	};

	const updateReduxStoreSize = (size = "") => {
		dispatchPromise.patchSignupCompanyInfo({
			[`${constVar.STORAGE_COMPANY_SIZE_PROP}`]: size,
		});
	};

	const updateSessionSize = (size = "") => {
		util.saveToSessionStore(
			storageObjName,
			constVar.STORAGE_COMPANY_SIZE_PROP,
			size
		);
	};

	const onMergeStorageHandler = (option = "") => {
		// update store
		updateReduxStoreSize(option);

		// update storage
		updateSessionSize(option);
	};

	const onLoadDefaultValueHandler = () => {
		// get information from the first time load
		const defaultSize = getSessionSize();

		if (size !== defaultSize) {
			updateReduxStoreSize(defaultSize);
		}
	};

	const app = (
		<SelectFormControl
			{...(id && { id: id })}
			{...(placeholder && { placeholder: placeholder })}
			className={className}
			options={options}
			value={size}
			required={required}
			disabled={disabled}
			onMergeStorage={onMergeStorageHandler}
			onLoadDefaultValue={onLoadDefaultValueHandler}
		/>
	);
	return app;
}

export default CompanySizeFormControlContainer;

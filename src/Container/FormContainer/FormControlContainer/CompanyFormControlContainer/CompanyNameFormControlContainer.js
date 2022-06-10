import { useState } from "react";
import { useSelector } from "react-redux";
import DropDownFormControl from "../../../../Component/Form/FormControl/DropDownFormControl";
import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";

function CompanyNameFormControlContainer({
	id = "",
	placeholder = "Business Name",
	required = false,
	disabled = false,
	storageObjName = "",
	onGetCompanyPredictionPromise = () => {},
}) {
	const name = useSelector(
		(state) =>
			state.thainowReducer[`${storageObjName}`]?.[
				`${constVar.STORAGE_COMPANY_NAME_PROP}`
			] || ""
	);

	const [filterCompanies, setFilterCompanies] = useState([]);

	const getSessionName = () => {
		return (
			util.getSessionStorageObj(storageObjName)?.[
				`${constVar.STORAGE_COMPANY_NAME_PROP}`
			] || ""
		);
	};

	const updateReduxStore = ({ ...props }) => {
		dispatchPromise.patchSignupCompanyInfo({
			...props,
		});
	};

	const updateSession = ({ ...props }) => {
		sessionStorage.setItem(
			storageObjName,
			JSON.stringify({
				...util.getSessionStorageObj(storageObjName),
				...props,
			})
		);
	};

	const onLoadDefaultValueHandler = () => {
		// get information from the first time load
		const defaultName = getSessionName();

		if (name !== defaultName) {
			updateReduxStore(defaultName);
		}

		setFilterCompanies([]);
	};

	const onMergeStorageHandler = (value = "", onSelect = false) => {
		const name = onSelect ? { ...value } : value || "";

		// update store
		updateReduxStore({ ...name });

		// save progress
		updateSession({ ...name });
	};

	const onUpdatePredictionHanlder = (value = "", onSelect = false) => {
		const name = onSelect ? value.description : value || "";

		// update predictions
		if (onSelect || name === "") {
			setFilterCompanies([]);
		} else {
			onGetCompanyPredictionPromise(name).then((predictions) => {
				setFilterCompanies(
					predictions.map((prediction) => {
						return {
							...prediction,
							description:
								prediction.status === "APPROVED" ? (
									<div>
										<div className="float-start">{prediction.name}</div>
										<div className="float-end">REGISTERED</div>
									</div>
								) : (
									""
								),
							disabled: prediction.status === "APPROVED",
						};
					})
				);
			});
		}
	};

	const app = (
		<DropDownFormControl
			{...(id && { id: id })}
			required={required}
			value={name}
			disabled={disabled}
			placeholder={placeholder}
			dropdownItems={filterCompanies || []}
			onLoadDefaultValue={onLoadDefaultValueHandler}
			onMergeStorage={onMergeStorageHandler}
			onUpdatePrediction={onUpdatePredictionHanlder}
		/>
	);
	return app;
}

export default CompanyNameFormControlContainer;

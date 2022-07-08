import { useState } from "react";
import { useSelector } from "react-redux";
import * as axiosPromise from "../../../../Axios/axiosPromise";
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
}) {
	const [name, showCompanyList] = useSelector((state) => [
		state.thainowReducer[`${storageObjName}`]?.[
			`${constVar.COMPANY_NAME_PROP}`
		] || "",
		state.thainowReducer[`${storageObjName}`]?.showCompanyList || false,
	]);

	const [filterCompanies, setFilterCompanies] = useState([]);

	const onGetCompanyPredictionPromise = async (keywords = "") => {
		return axiosPromise.getPromise(
			axiosPromise.searchCompanyPromise(keywords, true, 0)
		);
	};

	const getSessionName = () => {
		return (
			util.getSessionStorageObj(storageObjName)[
				`${constVar.COMPANY_NAME_PROP}`
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
			updateReduxStore({ name: defaultName });
		}

		setFilterCompanies([]);
	};

	const onMergeStorageHandler = (value = "", onSelect = false) => {
		const { description, ...props } = onSelect
			? { ...value }
			: { name: value } || "";

		// update store
		updateReduxStore({
			...props,
			showCompanyList: onSelect || name === "" ? false : true,
		});

		// save progress
		updateSession({ ...props });
	};

	const onUpdatePredictionHanlder = (value = "", onSelect = false) => {
		const name = onSelect ? "" : value || "";

		// update predictions
		if (onSelect || name === "") {
			setFilterCompanies([]);
		} else {
			onGetCompanyPredictionPromise(name).then((predictions = []) => {
				setFilterCompanies(
					predictions.map((prediction) => {
						return {
							...prediction,
							showCompanyList: false,
							showIndustryList: false,
							showAddressList: false,
							description:
								prediction.status === "APPROVED" ? (
									<div>
										<div className="float-start">{prediction.name} </div>
										<div className="float-end mx-2"> (REGISTERED)</div>
									</div>
								) : (
									<div className="float-start">{prediction.name}</div>
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
			showDropdownItems={showCompanyList}
			onLoadDefaultValue={onLoadDefaultValueHandler}
			onMergeStorage={onMergeStorageHandler}
			onUpdatePrediction={onUpdatePredictionHanlder}
		/>
	);
	return app;
}

export default CompanyNameFormControlContainer;

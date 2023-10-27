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
	storageObjName = constVar.THAINOW_COMPANY_SIGN_UP_OBJ,
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
		dispatchPromise.patchSignupCompanyInfoPromise({
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

	const onMergeStorageHandler = (value = "", onSelect = false, idx = -1) => {
		const { description, location, ...props } = onSelect
			? { ...value }
			: { name: value || "" };

		// update store
		updateReduxStore({
			...props,
			...(onSelect && {
				[`${constVar.COMPANY_ADDRESS_PROP}`]: {
					description: location?.description || "",
					placeid: location?.placeid || "",
				},
			}),
			showCompanyList: onSelect || name === "" || idx === 0 ? false : true,
		});

		// save progress
		updateSession({
			...props,
			[`${constVar.COMPANY_ADDRESS_PROP}`]: {
				description: location?.description || "",
				placeid: location?.placeid || "",
			},
		});
	};

	const onUpdatePredictionHanlder = (
		value = "",
		onSelect = false,
		idx = -1
	) => {
		const name = onSelect ? "" : value || "";

		// update predictions
		if (onSelect || name === "" || idx === 0) {
			setFilterCompanies([]);
		} else {
			onGetCompanyPredictionPromise(name).then((predictions = []) => {
				setFilterCompanies([
					...(predictions.length > 0
						? [
								{
									description: "None of below - New business",
								},
						  ]
						: []),
					...predictions.map((prediction) => {
						return {
							...prediction,
							showCompanyList: false,
							showIndustryList: false,
							showAddressList: false,
							description:
								prediction.status === "REGISTERED" ? (
									<div>
										<div className="float-start">{prediction.name} </div>
										<div className="float-end mx-2"> (REGISTERED)</div>
									</div>
								) : (
									<div className="float-start">{prediction.name}</div>
								),
							disabled: prediction.status === "REGISTERED",
						};
					}),
				]);
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
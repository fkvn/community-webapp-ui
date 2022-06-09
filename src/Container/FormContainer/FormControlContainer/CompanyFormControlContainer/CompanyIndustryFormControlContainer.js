import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import DropDownFormControl from "../../../../Component/Form/FormControl/DropDownFormControl";
import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";

function CompanyIndustryFormControlContainer({
	id = "",
	placeholder = "Enter your busines industry",
	required = false,
	disabled = false,
	storageObjName = "",
}) {
	const getCompanyInfo = () => {
		return dispatchPromise.getState()[`${constVar.STORAGE_COMPANY_PROP}`];
	};

	const industry = useSelector(
		(state) =>
			state.thainowReducer[`${storageObjName}`][
				`${constVar.STORAGE_COMPANY_PROP}`
			]?.[`${constVar.STORAGE_COMPANY_INDUSTRY_PROP}`] || ""
	);

	const industryList = [
		...constVar.COMPANY_INDUSTRY_LIST.map((item) => {
			return { description: item, value: item };
		}),
	];

	const [filterIndustries, setFilterIndustries] = useState(industryList);

	const getSessionIndustry = () => {
		const company =
			util.getSessionStorageObj(storageObjName)?.[
				`${constVar.STORAGE_COMPANY_PROP}`
			] || {};

		return company[`${constVar.STORAGE_COMPANY_INDUSTRY_PROP}`] || "";
	};

	const updateReduxStoreIndustry = (industry = "") => {
		dispatchPromise.patchBusinessSignupInfo({
			[`${constVar.STORAGE_COMPANY_PROP}`]: {
				...getCompanyInfo(),
				[`${constVar.STORAGE_COMPANY_INDUSTRY_PROP}`]: industry,
			},
		});
	};

	const updateSessionIndustry = (industry = "") => {
		util.saveToSessionStore(storageObjName, constVar.STORAGE_COMPANY_PROP, {
			...util.getSessionStorageObj(storageObjName)[
				`${constVar.STORAGE_COMPANY_PROP}`
			],
			[`${constVar.STORAGE_COMPANY_INDUSTRY_PROP}`]: industry,
		});
	};

	const onLoadDefaultValueHandler = useCallback(() => {
		// get information from the first time load
		const defaultIndustry = getSessionIndustry();

		if (industry !== defaultIndustry) {
			updateReduxStoreIndustry(defaultIndustry);
		}

		setFilterIndustries([]);
	});

	const onMergeStorageSessionHandler = (value, onSelect = false) => {
		const industry = onSelect ? value.description : value || "";

		// update store
		updateReduxStoreIndustry(industry);

		// save progress
		updateSessionIndustry(industry);
	};

	const onUpdatePredictionHanlder = (value, onSelect = false) => {
		const industry = onSelect ? value.description : value || "";

		// return suggestions
		if (onSelect || industry === "") {
			setFilterIndustries([]);
		} else {
			// update list
			const filteredIndustryList = industryList.filter(
				(item) =>
					item.description.toLowerCase().indexOf(industry.toLowerCase()) > -1
			);

			setFilterIndustries(filteredIndustryList);
		}
	};

	const app = (
		<DropDownFormControl
			{...(id && { id: id })}
			value={industry}
			required={required}
			disabled={disabled}
			placeholder={placeholder}
			dropdownItems={filterIndustries}
			onLoadDefaultValue={onLoadDefaultValueHandler}
			onMergeStorageSession={onMergeStorageSessionHandler}
			onUpdatePrediction={onUpdatePredictionHanlder}
		/>
	);
	return app;
}

export default CompanyIndustryFormControlContainer;

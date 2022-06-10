import { useState } from "react";
import { useSelector } from "react-redux";
import DropDownFormControl from "../../../../Component/Form/FormControl/DropDownFormControl";
import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";

function CompanyIndustryFormControlContainer({
	id = "",

	placeholder = "Busines industry",
	required = false,
	disabled = false,
	storageObjName = "",
}) {
	const [industry, showIndustryList] = useSelector((state) => [
		state.thainowReducer[`${storageObjName}`]?.[
			`${constVar.STORAGE_COMPANY_INDUSTRY_PROP}`
		] || "",
		state.thainowReducer[`${storageObjName}`].showIndustryList || false,
	]);

	const industryList = [
		...constVar.COMPANY_INDUSTRY_LIST.map((item) => {
			return { description: item, value: item };
		}),
	];

	const [filterIndustries, setFilterIndustries] = useState(industryList);

	const getSessionIndustry = () => {
		return (
			util.getSessionStorageObj(storageObjName)[
				`${constVar.STORAGE_COMPANY_INDUSTRY_PROP}`
			] || ""
		);
	};

	const updateReduxStoreIndustry = (industry = "") => {
		dispatchPromise.patchSignupCompanyInfo({
			[`${constVar.STORAGE_COMPANY_INDUSTRY_PROP}`]: industry,
		});
	};

	const updateReduxStoreShowList = (show = false) => {
		dispatchPromise.patchSignupCompanyInfo({
			showIndustryList: show,
		});
	};

	const updateSessionIndustry = (industry = "") => {
		util.saveToSessionStore(
			storageObjName,
			constVar.STORAGE_COMPANY_INDUSTRY_PROP,
			industry
		);
	};

	const onLoadDefaultValueHandler = () => {
		// get information from the first time load
		const defaultIndustry = getSessionIndustry();

		if (industry !== defaultIndustry) {
			updateReduxStoreIndustry(defaultIndustry);
		}

		setFilterIndustries([]);
	};

	const onMergeStorageHandler = (value = "", onSelect = false) => {
		console.log("merge industry");
		const industry = onSelect ? value.description : value || "";

		// update store
		updateReduxStoreIndustry(industry);

		// save progress
		updateSessionIndustry(industry);
	};

	const onUpdatePredictionHanlder = (value = "", onSelect = false) => {
		const industry = onSelect ? value.description : value || "";

		// return suggestions
		if (onSelect || industry === "") {
			setFilterIndustries([]);
			updateReduxStoreShowList(false);
		} else {
			// update list
			const filteredIndustryList = industryList.filter(
				(item) =>
					item.description.toLowerCase().indexOf(industry.toLowerCase()) > -1
			);

			setFilterIndustries(filteredIndustryList);
			updateReduxStoreShowList(true);
		}
	};

	const app = (
		<DropDownFormControl
			{...(id && { id: id })}
			value={industry}
			required={required}
			disabled={disabled}
			placeholder={placeholder}
			dropdownItems={filterIndustries || []}
			showDropdownItems={showIndustryList}
			onLoadDefaultValue={onLoadDefaultValueHandler}
			onMergeStorage={onMergeStorageHandler}
			onUpdatePrediction={onUpdatePredictionHanlder}
		/>
	);

	return app;
}

export default CompanyIndustryFormControlContainer;

import { useCallback, useEffect, useState } from "react";
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
	const [loading, setLoading] = useState(true);

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
	});

	useEffect(() => {
		// first time load
		if (loading) {
			onLoadDefaultValueHandler();
			setLoading(false);
		}
	}, [loading, setLoading, onLoadDefaultValueHandler]);

	const onChangeHandler = (industry = "") => {
		// update store
		updateReduxStoreIndustry(industry);

		// save progress
		updateSessionIndustry(industry);

		// return suggestions
		if (industry === "") {
			setFilterIndustries(industryList);
			setShowList(false);
		} else {
			// update list
			const filteredIndustryList = industryList.filter(
				(item) =>
					item.description.toLowerCase().indexOf(industry.toLowerCase()) > -1
			);

			setFilterIndustries(filteredIndustryList);

			setShowList(true);
		}
	};

	const onSelectItemHandler = (industry = {}) => {
		// update store
		updateReduxStoreIndustry(industry.description || "");

		// save progress
		updateSessionIndustry(industry.description || "");

		setShowList(false);
	};

	const [showList, setShowList] = useState(false);

	const app = (
		<DropDownFormControl
			{...(id && { id: id })}
			value={industry}
			required={required}
			disabled={disabled}
			placeholder={placeholder}
			onChangeHandler={onChangeHandler}
			dropdownItems={showList ? filterIndustries : []}
			onSelectItemHandler={onSelectItemHandler}
		/>
	);
	return app;
}

export default CompanyIndustryFormControlContainer;

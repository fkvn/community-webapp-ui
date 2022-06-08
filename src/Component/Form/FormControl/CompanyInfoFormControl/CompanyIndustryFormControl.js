import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";
import DropDownFormControl from "../DropDownFormControl";

function CompanyIndustryFormControl({
	id = "",
	placeholder = "Enter your busines industry",
	required = false,
	disabled = false,
	industryList = [],
	sessionStorageObjName = "",
}) {
	const [loading, setLoading] = useState(true);

	const industryRef = React.createRef("");

	const [filterIndustries, setFilterIndustries] = useState(industryList);

	useEffect(() => {
		// first time load
		if (loading) {
			const defaultCompany =
				util.getSessionStorageObj(sessionStorageObjName)[
					`${constVar.STORAGE_COMPANY_PROP}`
				] || {};

			const industry =
				defaultCompany[`${constVar.STORAGE_COMPANY_INDUSTRY_PROP}`] || "";

			if (industryRef.current) {
				industryRef.current.value = industry;
			}

			setLoading(false);
		}
	}, [loading, setLoading, industryRef, sessionStorageObjName]);

	const onChangeHandler = (value = "") => {
		util.saveToSessionStore(
			sessionStorageObjName,
			constVar.STORAGE_COMPANY_PROP,
			{
				...util.getSessionStorageObj(sessionStorageObjName)[
					`${constVar.STORAGE_COMPANY_PROP}`
				],
				[`${constVar.STORAGE_COMPANY_INDUSTRY_PROP}`]: value,
			}
		);

		if (value === "") {
			setFilterIndustries(industryList);
			setShowList(false);
		} else {
			// update list
			const filteredIndustryList = industryList.filter(
				(industry) =>
					industry.description.toLowerCase().indexOf(value.toLowerCase()) > -1
			);

			setFilterIndustries(filteredIndustryList);

			setShowList(true);
		}
	};

	// const onSelectItemHandler = (industry = "") => {
	// 	util.saveToSessionStore(
	// 		sessionStorageObjName,
	// 		constVar.STORAGE_COMPANY_PROP,
	// 		{
	// 			...util.getSessionStorageObj(sessionStorageObjName)[
	// 				`${constVar.STORAGE_COMPANY_PROP}`
	// 			],
	// 			[`${constVar.STORAGE_COMPANY_INDUSTRY_PROP}`]: industry.description,
	// 		}
	// 	);

	// 	if (industryRef.current) {
	// 		industryRef.current.value = industry.description;
	// 	}

	// 	setShowList(false);
	// };

	const signupInfo = useSelector(
		(state) => state.thainowReducer[`${sessionStorageObjName}`]
	);

	const onSelectItemHandler = (industry = "") => {
		util.saveToSessionStore(
			sessionStorageObjName,
			constVar.STORAGE_COMPANY_PROP,
			{
				...util.getSessionStorageObj(sessionStorageObjName)[
					`${constVar.STORAGE_COMPANY_PROP}`
				],
				[`${constVar.STORAGE_COMPANY_INDUSTRY_PROP}`]: industry.description,
			}
		);

		if (industryRef.current) {
			industryRef.current.value = industry.description;
		}

		setShowList(false);
	};

	const [showList, setShowList] = useState(false);

	const app = (
		<DropDownFormControl
			{...(id && { id: id })}
			ref={industryRef}
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

export default CompanyIndustryFormControl;

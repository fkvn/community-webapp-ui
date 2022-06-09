import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
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
		console.log("industry loading");
		// first time load
		if (loading) {
			console.log("industry first load");
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
		console.log("industry changing");
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

	const companyInfo = useSelector(
		(state) =>
			state.thainowReducer[`${sessionStorageObjName}`][
				`${constVar.STORAGE_COMPANY_PROP}`
			] || {}
	);

	const onSelectItemHandler = (industry = "") => {
		console.log("industry select");
		dispatchPromise.patchBusinessSignupInfo({
			[`${constVar.STORAGE_COMPANY_PROP}`]: {
				...companyInfo,
				[`${constVar.STORAGE_COMPANY_INDUSTRY_PROP}`]: industry.description,
				[`${constVar.STORAGE_COMPANY_NAME_PROP}`]: "Test Name aaaa bbb",
			},
		});

		util.saveToSessionStore(
			sessionStorageObjName,
			constVar.STORAGE_COMPANY_PROP,
			{
				...util.getSessionStorageObj(sessionStorageObjName)[
					`${constVar.STORAGE_COMPANY_PROP}`
				],
				[`${constVar.STORAGE_COMPANY_INDUSTRY_PROP}`]: industry.description,
				[`${constVar.STORAGE_COMPANY_NAME_PROP}`]: "Test Name aaaa bbb",
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

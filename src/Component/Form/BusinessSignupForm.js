import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import GoogleAutoComplete from "../AutoComplete/GoogleAutoComplete";
import LoadingButton from "../Button/LoadingButton";
import AgreementFormControl from "./FormControl/AgreementFormControl";
import PhoneFormControl from "./FormControl/PhoneFormControl";
import SelectFormControl from "./FormControl/SelectFormControl";
import TextFormControl from "./FormControl/TextFormControl";
import UrlFormControl from "./FormControl/UrlFormControl";

function BusinessSignupForm({
	sessionStorageObj = "thainow.classic.signup.info",
	submitErrorHandler = () => {},
	industryList = [],
	positionList = [],
}) {
	const [step, setStep] = useState(1);

	const [onSubmitLoading, setOnSubmitLoading] = useState(false);

	const [searchParams] = useSearchParams();

	const continueURL = searchParams.get("continue") || "/";

	const companyNameRef = React.createRef();
	const companyIndustryRef = React.createRef();
	const companyWebaddressRef = React.createRef();
	const companyPhoneRef = React.createRef();

	const firstnameRef = React.createRef();
	const lastnameRef = React.createRef();
	const phoneRef = React.createRef();
	const passwordRef = React.createRef();

	const continueParams =
		continueURL.length > 0 ? "?continue=" + continueURL : "";

	const getSessionStorageObj = (objName) => {
		return JSON.parse(sessionStorage.getItem(objName)) || {};
	};

	const saveToSessionStore = (objName = "", prop = "", value = "") => {
		sessionStorage.setItem(
			objName,
			JSON.stringify({
				...(JSON.parse(sessionStorage.getItem(objName)) || {}),
				[`${prop}`]: value,
			})
		);
	};

	const onSubmitStep_1_Handler = (
		isValidUrl = true,
		isValidCompanyPhone = true
	) => {
		if (!isValidUrl) return submitErrorHandler("Invalid Website Address!");
		else if (!isValidCompanyPhone)
			return submitErrorHandler("Invalid Company phone!");
		else {
			return new Promise((resolve, _) => resolve());
		}
	};

	const onSubmitHandle = (e) => {
		e.preventDefault();

		// get signup object from session storage
		let signupInfo = getSessionStorageObj(sessionStorageObj);

		setOnSubmitLoading(true);

		if (step === 1)
			onSubmitStep_1_Handler(
				signupInfo.isValidUrl,
				signupInfo.isValidCompanyPhone
			)
				.then(() => {
					setOnSubmitLoading(false);
					setStep(2);
				})
				.catch(() => setOnSubmitLoading(false));
		else {
			setOnSubmitLoading(false);
		}
	};

	// set default value
	useEffect(() => {
		const signupInfo = getSessionStorageObj(sessionStorageObj);

		if (step === 1) {
			companyNameRef.current.value = signupInfo.name || "";
			companyIndustryRef.current.value =
				signupInfo.industry || "Select your company industry";
		} else if (step === 2) {
			firstnameRef.current.value = signupInfo.firstname || "";
		}
	});

	const CompanyNameFormControl = () => (
		<Form.Group className="mb-3">
			<TextFormControl
				id="signup-companyNameControl"
				withLabel={true}
				labelTitle="Company Name"
				required={true}
				placeholder="Enter company name"
				ref={companyNameRef}
				onChange={(p) =>
					saveToSessionStore(sessionStorageObj, "name", p.target.value)
				}
			/>
		</Form.Group>
	);

	const CompanyIndustryFormControl = () => (
		<Form.Group className="mb-3">
			<SelectFormControl
				id="signup-companyIndustrySelectControl"
				withLabel={true}
				labelTitle="Company Industry"
				required={true}
				ref={companyIndustryRef}
				placeholder="Select your company industry"
				dropdownItems={industryList || []}
				onChange={(p) =>
					saveToSessionStore(sessionStorageObj, "industry", p.target.value)
				}
			/>
		</Form.Group>
	);

	const AddressFormControl = () => (
		<Form.Group className=" my-3">
			<GoogleAutoComplete
				sessionStorageObj={sessionStorageObj}
				label="Company Address"
			/>
		</Form.Group>
	);

	const WebaddressFormControl = () => (
		<Form.Group className="my-3">
			<UrlFormControl
				id="signup-companyWebaddressControl"
				withLabel={true}
				labelTitle="Company Website"
				placeholder="http(s)://"
				ref={companyWebaddressRef}
				defaultValue={getSessionStorageObj(sessionStorageObj).website || ""}
				onChange={(value, isValidUrl) => {
					saveToSessionStore(sessionStorageObj, "website", value);
					saveToSessionStore(sessionStorageObj, "isValidUrl", isValidUrl);
				}}
			/>
		</Form.Group>
	);

	const companyPhoneFormControl = (
		<Form.Group className="mb-3">
			<PhoneFormControl
				id="business-signup-companyPhoneFormControl"
				className="signup-phoneFormControl"
				label="Company (Public) Phone"
				ref={companyPhoneRef}
				required={false}
				defaultValue={
					getSessionStorageObj(sessionStorageObj).companyPhone || ""
				}
				onChange={(value, isValid) => {
					saveToSessionStore(sessionStorageObj, "isValidCompanyPhone", isValid);
					saveToSessionStore(sessionStorageObj, "companyPhone", value);
				}}
			/>
		</Form.Group>
	);

	const FirstNameFormControl = () => (
		<Form.Group className="mb-3">
			<TextFormControl
				id="signup-firstNameControl"
				withLabel={true}
				labelTitle="First Name"
				required={true}
				placeholder="Enter your first name"
				ref={firstnameRef}
				onChange={(p) =>
					saveToSessionStore(sessionStorageObj, "firstname", p.target.value)
				}
			/>
		</Form.Group>
	);

	const LastNameFormControl = () => (
		<Form.Group className="mb-3">
			<TextFormControl
				id="signup-lastNameControl"
				withLabel={true}
				labelTitle="Last Name"
				required={true}
				placeholder="Enter your last name"
				ref={lastnameRef}
				onChange={(p) =>
					saveToSessionStore(sessionStorageObj, "lastname", p.target.value)
				}
			/>
		</Form.Group>
	);

	const NamesFormControl = () => (
		<Row>
			<Col xs={12} md={6}>
				<FirstNameFormControl />
			</Col>
			<Col xs={12} md={6}>
				<LastNameFormControl />
			</Col>
		</Row>
	);

	const PositionFormControl = ({ positions = [] }) => (
		<Form.Group className="mb-3">
			<Form.Label className={`fs-5 tedkvn-required`}>Your Position</Form.Label>
			<Form.Group className="w-100">
				{positions.map((position, idx) => (
					<Form.Check
						inline
						label={position.title || ""}
						value={position.value}
						name="position"
						type="radio"
						id={`inline-${idx}-2`}
						defaultChecked={
							position.value ===
							getSessionStorageObj(sessionStorageObj).position
						}
						// checked={

						// }
						key={idx}
						onChange={(p) =>
							saveToSessionStore(sessionStorageObj, "position", p.target.value)
						}
						required
					/>
				))}
			</Form.Group>
		</Form.Group>
	);

	const phoneFormControl = (
		<>
			<Form.Group className="mb-3">
				<PhoneFormControl
					id="business-signup-PhoneFormControl"
					className="signup-phoneFormControl"
					label="Mobile Phone number"
					ref={companyPhoneRef}
					required={false}
					defaultValue={
						getSessionStorageObj(sessionStorageObj).companyPhone || ""
					}
					onChange={(value, isValid) => {
						saveToSessionStore(sessionStorageObj, "isValidPhone", isValid);
						saveToSessionStore(sessionStorageObj, "phone", value);
					}}
					landlineWarning={true}
				/>
			</Form.Group>
		</>
	);

	const nextStepButton = (
		<Form.Group>
			<LoadingButton
				size="md"
				className="px-4 rounded-pill shadow-none"
				type="submit"
				title={
					step === 3
						? "Send Code"
						: step === 4
						? "Verify and Signup"
						: "Next Step"
				}
				show={onSubmitLoading}
			/>
		</Form.Group>
	);

	const prevStepButton = (
		<Form.Group>
			<Button
				size="md"
				variant="secondary"
				className=" px-4  rounded-pill shadow-none"
				onClick={() => setStep(step - 1 > -1 ? step - 1 : 0)}
			>
				Previous Step
			</Button>
		</Form.Group>
	);

	const formNavigationButtons = (
		<Form.Group className="my-2">
			{step === 1 && <div className="float-end py-3">{nextStepButton}</div>}
			{/* {step === 2 && <div className="text-center">{prevStepButton}</div>} */}
			{step > 1 && (
				<>
					<div className="float-start py-3">{prevStepButton}</div>
					<div className="float-end py-3">{nextStepButton}</div>
				</>
			)}
		</Form.Group>
	);

	const app = (
		<Form onSubmit={onSubmitHandle}>
			<p className="text-center fw-bold fs-5">
				<Form.Text className="">
					Register as a<span className="text-danger"> "Business Account"</span>
				</Form.Text>
			</p>

			{step === 1 && (
				<>
					<p className="text-center">
						<Form.Text className="text-mute">
							Please enter the company information. This will only take few
							minutes...
						</Form.Text>
					</p>
					<CompanyNameFormControl />
					<CompanyIndustryFormControl />
					<AddressFormControl />
					<WebaddressFormControl />
					{companyPhoneFormControl}
					<AgreementFormControl />
				</>
			)}

			{step === 2 && (
				<>
					<p className="text-center">
						<Form.Text className="text-mute">
							Please enter the account information. This will only take few
							minutes...
						</Form.Text>
					</p>
					<NamesFormControl />
					<PositionFormControl positions={positionList} />
					{phoneFormControl}
				</>
			)}
			{formNavigationButtons}
		</Form>
	);
	return app;
}

export default BusinessSignupForm;

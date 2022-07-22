import { useEffect } from "react";
import * as axiosPromise from "../../Axios/axiosPromise";
import BusinessSignup from "../../Component/Signup/BusinessSignup";
import * as dispatchPromise from "../../redux-store/dispatchPromise";
import * as constVar from "../../Util/ConstVar";
import { signoutUserPromise } from "../../Util/Util";
import OffCanvasContainer from "../OffCanvasContainer";

function BusinessSignupContainer() {
	const validateCredentials = () => {
		const storageUser = localStorage.getItem(constVar.THAINOW_USER_OBJ) || "";

		if (storageUser === "") {
			dispatchPromise
				.submitErrorHandlerPromise(
					"Your credentials are incorrect or have expired  .... Please sign in again!"
				)
				.catch(() => {
					signoutUserPromise();
				});
		}
	};

	useEffect(() => {
		dispatchPromise
			.patchOffCanvasInfoPromise({
				[`${constVar.SHOW_OFF_CANVAS}`]: true,
			})
			.then(() => {
				validateCredentials();
			});
	});

	const onCloseHandler = () => {
		dispatchPromise.patchSignupCompanyInfoPromise({}, true);
		sessionStorage.removeItem(constVar.THAINOW_COMPANY_SIGN_UP_OBJ);
	};

	const onSubmitStep_1_HandlerPromise = async () => {
		// get signup object from redux store
		let companyInfo =
			dispatchPromise.getState()[`${constVar.THAINOW_COMPANY_SIGN_UP_OBJ}`];

		const administratorId =
			JSON.parse(localStorage.getItem(constVar.THAINOW_USER_OBJ) || {})?.[
				`${constVar.ID_PROP}`
			] || "";

		const {
			[`${constVar.COMPANY_WEBSITE_VALIDATION}`]: isValidWebsite = true,
			[`${constVar.COMPANY_PHONE_VALIDATION}`]: isValidPhone = true,
			[`${constVar.COMPANY_EMAIL_VALIDATION}`]: isValidEmail = true,
			[`${constVar.COMPANY_INFORMAL_PROP}`]: isInformal = false,

			[`${constVar.COMPANY_ADDRESS_PROP}`]: {
				description = "",
				placeid = "",
			} = {},
			[`${constVar.COMPANY_NAME_PROP}`]: companyName = "",
			[`${constVar.COMPANY_EMAIL_PROP}`]: companyEmail = "",
			[`${constVar.COMPANY_PHONE_PROP}`]: companyPhone = "",
			[`${constVar.COMPANY_INDUSTRY_PROP}`]: companyIndustry = "",
			[`${constVar.COMPANY_WEBSITE_PROP}`]: companyWebsite = "",
		} = companyInfo;

		if (administratorId.length === 0)
			return dispatchPromise.submitErrorHandlerPromise(
				"Invalid Administrator Credential! Please double-check if user has signed in or not!"
			);
		else if (!isInformal && (description.length === 0 || placeid.length === 0))
			return dispatchPromise.submitErrorHandlerPromise("Invalid Location");
		else if (!isValidWebsite)
			return dispatchPromise.submitErrorHandlerPromise("Invalid Website");
		else if (!isValidPhone)
			return dispatchPromise.submitErrorHandlerPromise("Invalid Phone");
		else if (!isValidEmail)
			return dispatchPromise.submitErrorHandlerPromise("Invalid Email");
		else {
			const businessRegisterInfo = {
				name: companyName,
				informal: isInformal,
				industry: companyIndustry,
				address: description,
				placeid: placeid,
				email: companyEmail,
				phone: companyPhone,
				website: companyWebsite,
				administratorId: administratorId,
			};

			await axiosPromise
				.businessRegisterPromise(businessRegisterInfo)
				.then(() => {
					// remove sign up info
					dispatchPromise.patchSignupCompanyInfoPromise({}, true);
					sessionStorage.removeItem(constVar.THAINOW_COMPANY_SIGN_UP_OBJ);
				});
		}
	};

	const stepHandlers = [
		{
			step: 1,
			onStepHandlerPromise: onSubmitStep_1_HandlerPromise,
		},
	];

	const app = (
		<OffCanvasContainer onClose={onCloseHandler}>
			<BusinessSignup stepHandlers={stepHandlers} />
		</OffCanvasContainer>
	);
	return app;
}

export default BusinessSignupContainer;

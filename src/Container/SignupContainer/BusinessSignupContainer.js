import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as axiosPromise from "../../Axios/axiosPromise";
import BusinessSignup from "../../Component/Signup/BusinessSignup";
import * as dispatchPromise from "../../redux-store/dispatchPromise";
import * as constVar from "../../Util/ConstVar";
import OffCanvasContainer from "../OffCanvasContainer";

function BusinessSignupContainer() {
	const navigate = useNavigate();

	const location = useLocation();

	const continueURL = location.state?.continue || "/";

	const returnURL = location.state?.returnUrl || "";

	const showOffCanvas = useSelector(
		(state) =>
			state.thainowReducer[`${constVar.THAINOW_OFF_CANVAS_OBJ}`]?.[
				`${constVar.SHOW_OFF_CANVAS}`
			] || false
	);

	useEffect(() => {
		if (!showOffCanvas) {
			dispatchPromise.patchOffCanvasInfoPromise({
				[`${constVar.SHOW_OFF_CANVAS}`]: true,
			});
		}
	}, [showOffCanvas]);

	const submitErrorHandler = (message = "") =>
		dispatchPromise.submitErrorHandlerPromise(message);

	const onCloseHandler = () => {
		dispatchPromise.patchSignupCompanyInfoPromise({}, true);
		sessionStorage.removeItem(constVar.THAINOW_COMPANY_SIGN_UP_OBJ);
		navigate(returnURL.length > 0 ? returnURL : continueURL, {
			state: {
				...(returnURL.length > 0 && { continue: continueURL }),
			},
		});
	};

	const onSubmitStep_1_HandlerPromise = async () => {
		// get signup object from redux store
		let companyInfo =
			dispatchPromise.getState()[`${constVar.THAINOW_COMPANY_SIGN_UP_OBJ}`];

		const administratorId =
			JSON.parse(localStorage.getItem(constVar.THAINOW_USER_OBJ) || {})?.user
				?.id || "";

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
			return submitErrorHandler(
				"Invalid Administrator Credential! Please double-check if user has signed in or not!"
			);
		else if (!isInformal && (description.length === 0 || placeid.length === 0))
			return submitErrorHandler("Invalid Location");
		else if (!isValidWebsite) return submitErrorHandler("Invalid Website");
		else if (!isValidPhone) return submitErrorHandler("Invalid Phone");
		else if (!isValidEmail) return submitErrorHandler("Invalid Email");
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

			return axiosPromise
				.businessRegisterPromise(businessRegisterInfo)
				.then((res) => {
					console.log(res);

					// remove sign up info
					dispatchPromise.patchSignupCompanyInfoPromise({}, true);
					sessionStorage.removeItem(constVar.THAINOW_COMPANY_SIGN_UP_OBJ);

					// // update company info
					// const currentUser = JSON.parse(
					// 	localStorage.getItem(constVar.THAINOW_USER_OBJ) || {}
					// );

					// const updatedUserWithCompany = {
					// 	...currentUser,
					// 	companies: [...currentUser?.companies, res],
					// };

					// // save to local storage
					// localStorage.setItem(
					// 	constVar.THAINOW_USER_OBJ,
					// 	JSON.stringify(updatedUserWithCompany)
					// );

					// update redux-store
					// dispatchPromise.patchUserInfo({ ...updatedUserWithCompany }, true);

					// navigate
					navigate(returnURL.length > 0 ? returnURL : continueURL, {
						state: {
							...(returnURL.length > 0 && { continue: continueURL }),
						},
					});
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

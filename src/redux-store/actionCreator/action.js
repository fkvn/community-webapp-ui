import * as constVar from "../../Util/ConstVar";
import * as actionTypes from "./actionType";

// patch user sign up info
export const dispatchPatchSignupUserInfo = (
	{ ...newInfo },
	replace = false
) => {
	return {
		type: actionTypes.DISPATCH_PATCH_SIGNUP_USER_INFO,
		[`${constVar.THAINOW_USER_SIGN_UP_STORAGE_OBJ}`]: { ...newInfo },
		replace: replace,
	};
};

// patch user sign in info
export const dispatchPatchSigninUserInfo = (
	{ ...newInfo },
	replace = false
) => {
	return {
		type: actionTypes.DISPATCH_PATCH_SIGNIN_USER_INFO,
		[`${constVar.THAINOW_USER_SIGN_IN_STORAGE_OBJ}`]: { ...newInfo },
		replace: replace,
	};
};

// patch company sign up info
export const dispatchPatchSignupCompanyInfo = ({ ...newInfo }) => {
	return {
		type: actionTypes.DISPATCH_PATCH_SIGNUP_COMPANY_INFO,
		[`${constVar.THAINOW_COMPANY_SIGN_UP_STORAGE_OBJ}`]: { ...newInfo },
	};
};

// patch search info
export const dispatchPatchSearchInfo = ({ ...newInfo }) => {
	return {
		type: actionTypes.DISPATCH_PATCH_SEARCH_INFO,
		[`${constVar.THAINOW_SEARCH_OBJ}`]: { ...newInfo },
	};
};

// error
export const dispatchError = (message, status) => {
	return {
		type: actionTypes.DISPATCH_ERROR,
		message: message,
		status: status,
	};
};

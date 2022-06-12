import * as constVar from "../../Util/ConstVar";
import * as actionTypes from "./actionType";

// patch business sign up info
export const dispatchPatchSignupUserInfo = ({ ...newInfo }) => {
	return {
		type: actionTypes.DISPATCH_PATCH_SIGNUP_USER_INFO,
		[`${constVar.THAINOW_USER_SIGN_UP_STORAGE_OBJ}`]: { ...newInfo },
	};
};

// patch classic sign up info
export const dispatchPatchSignupCompanyInfo = ({ ...newInfo }) => {
	return {
		type: actionTypes.DISPATCH_PATCH_SIGNUP_COMPANY_INFO,
		[`${constVar.THAINOW_COMPANY_SIGN_UP_STORAGE_OBJ}`]: { ...newInfo },
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

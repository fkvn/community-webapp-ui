import * as constVar from "../../Util/ConstVar";
import * as actionTypes from "./actionType";

// patch business sign up info
export const dispatchPatchSignupBusinessInfo = ({ ...newInfo }) => {
	return {
		type: actionTypes.DISPATCH_PATCH_SIGNUP_BUSINESS_INFO,
		[`${constVar.THAINOW_BUSINESS_SIGN_UP_STORAGE_OBJ}`]: { ...newInfo },
	};
};

// patch classic sign up info
export const dispatchPatchSignupClassicInfo = ({ ...newInfo }) => {
	return {
		type: actionTypes.DISPATCH_PATCH_SIGNUP_CLASSIC_INFO,
		[`${constVar.THAINOW_CLASSIC_SIGN_UP_STORAGE_OBJ}`]: { ...newInfo },
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

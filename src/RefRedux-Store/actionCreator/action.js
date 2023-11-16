import * as constVar from "../../Util/ConstVar";
import * as actionTypes from "./actionType";

// patch user sign in info
export const dispatchPatchStoreRootObjInfo = (
	type,
	objName,
	{ ...newInfo },
	replace = false
) => {
	return {
		type: type,
		[`${constVar.THAINOW_REDUX_STORE_ROOT_OBJ}`]: objName,
		[`${constVar.THAINOW_REDUX_STORE_ROOT_OBJ_PROPS}`]: { ...newInfo },
		replace: replace,
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

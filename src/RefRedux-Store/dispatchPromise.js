import store from "../ReduxStore/Store";
import * as constVar from "../Util/constVar";
import * as actionCreators from "./actionCreator/actionCreator";
import * as actionTypes from "./actionCreator/actionType";

export const getState = () => {
	return store.getState().thainowReducer || {};
};

export const submitErrorHandlerPromise = async (message = "", status = "") => {
	setTimeout(() => store.dispatch(actionCreators.initError("", "")), 2000);
	store.dispatch(actionCreators.initError(message, status));
	return Promise.reject(message);
};

export const patchLocationInfoPromise = async (
	{ ...props },
	replace = false
) => {
	return store.dispatch(
		actionCreators.patchStoreRootObjInfo(
			actionTypes.DISPATCH_PATCH_LOCATION_OBJ_INFO,
			constVar.LOCATION_OBJ,
			{ ...props },
			replace
		)
	);
};

export const patchSearchResultInfoPromise = async (
	{ ...props },
	replace = false
) => {
	return store.dispatch(
		actionCreators.patchStoreRootObjInfo(
			actionTypes.DISPATCH_PATCH_SEARCH_RESULT_OBJ_INFO,
			constVar.SEARCH_RESULT_OBJ,
			{ ...props },
			replace
		)
	);
};

//  user
export const patchUserInfoPromise = async ({ ...props }, replace = false) => {
	return store.dispatch(
		actionCreators.patchStoreRootObjInfo(
			actionTypes.DISPATCH_PATCH_USER_OBJ_INFO,
			constVar.THAINOW_USER_OBJ,
			{ ...props },
			replace
		)
	);
};

//  profile
export const patchProfileInfoPromise = async (
	{ ...props },
	replace = false
) => {
	return store.dispatch(
		actionCreators.patchStoreRootObjInfo(
			actionTypes.DISPATCH_PATCH_PROFILE_INFO,
			constVar.PROFILE_OBJ,
			{ ...props },
			replace
		)
	);
};

export const patchUserProfileInfoPromise = async (
	{ ...props },
	replace = false
) => {
	return store.dispatch(
		actionCreators.patchStoreRootObjInfo(
			actionTypes.DISPATCH_PATCH_USER_PROFILE_INFO,
			constVar.THAINOW_USER_PROFILE_OBJ,
			{ ...props },
			replace
		)
	);
};

// user sign up
export const patchSignupUserInfoPromise = async (
	{ ...props },
	replace = false
) => {
	return store.dispatch(
		actionCreators.patchStoreRootObjInfo(
			actionTypes.DISPATCH_PATCH_SIGNUP_USER_INFO,
			constVar.THAINOW_USER_SIGN_UP_OBJ,
			{ ...props },
			replace
		)
	);
};

// user sign in
export const patchSigninUserInfoPromise = async (
	{ ...props },
	replace = false
) => {
	return store.dispatch(
		actionCreators.patchStoreRootObjInfo(
			actionTypes.DISPATCH_PATCH_SIGNIN_USER_INFO,
			constVar.THAINOW_USER_SIGN_IN_OBJ,
			{ ...props },
			replace
		)
	);
};

export const patchSignupCompanyInfoPromise = async (
	{ ...props },
	replace = false
) => {
	return store.dispatch(
		actionCreators.patchStoreRootObjInfo(
			actionTypes.DISPATCH_PATCH_SIGNUP_COMPANY_INFO,
			constVar.THAINOW_COMPANY_SIGN_UP_OBJ,
			{ ...props },
			replace
		)
	);
};

export const patchSearchInfoPromise = async ({ ...props }, replace = false) => {
	return store.dispatch(
		actionCreators.patchStoreRootObjInfo(
			actionTypes.DISPATCH_PATCH_SEARCH_INFO,
			constVar.THAINOW_SEARCH_OBJ,
			{ ...props },
			replace
		)
	);
};

export const patchOffCanvasInfoPromise = async (
	{ ...props },
	replace = false
) => {
	return store.dispatch(
		actionCreators.patchStoreRootObjInfo(
			actionTypes.DISPATCH_PATCH_OFF_CANVAS_INFO,
			constVar.THAINOW_OFF_CANVAS_OBJ,
			{ ...props },
			replace
		)
	);
};

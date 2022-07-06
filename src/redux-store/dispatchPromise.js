import * as actionCreators from "./actionCreator/actionCreator";
import store from "./store";

export const getState = () => {
	return store.getState().thainowReducer || {};
};

export const submitErrorHandler = async (message) => {
	throw store.dispatch(actionCreators.initError(message, ""));
};

// user sign up
export const patchSignupUserInfo = async ({ ...props }, replace = false) => {
	return store.dispatch(
		actionCreators.patchSignupUserInfo({ ...props }, replace)
	);
};

// user sign in
export const patchSigninUserInfo = async ({ ...props }, replace = false) => {
	return store.dispatch(
		actionCreators.patchSigninUserInfo({ ...props }, replace)
	);
};

export const patchSignupCompanyInfo = async ({ ...props }) => {
	return store.dispatch(actionCreators.patchSignupCompanyInfo({ ...props }));
};

export const patchSearchInfo = async ({ ...props }) => {
	return store.dispatch(actionCreators.patchSearchInfo({ ...props }));
};

import * as actionCreators from "./actionCreator/actionCreator";
import store from "./store";

export const getState = () => {
	return store.getState().thainowReducer;
};

export const submitErrorHandler = async (message) => {
	throw store.dispatch(actionCreators.initError(message, ""));
};

export const patchSignupUserInfo = async ({ ...props }) => {
	return store.dispatch(actionCreators.patchSignupUserInfo({ ...props }));
};

export const patchSignupCompanyInfo = async ({ ...props }) => {
	return store.dispatch(actionCreators.patchSignupCompanyInfo({ ...props }));
};

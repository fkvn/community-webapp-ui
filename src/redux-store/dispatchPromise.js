import * as actionCreators from "./actionCreator/actionCreator";
import store from "./store";

export const getState = () => {
	return store.getState().thainowReducer;
};

export const submitErrorHandler = async (message) => {
	throw store.dispatch(actionCreators.initError(message, ""));
};

export const patchBusinessSignupInfo = async ({ ...props }) => {
	return store.dispatch(actionCreators.patchBusinessSignupInfo({ ...props }));
};

export const patchSignupClassicInfo = async ({ ...props }) => {
	return store.dispatch(actionCreators.patchSignupClassicInfo({ ...props }));
};

export const patchSignupCompanyInfo = async ({ ...props }) => {
	return store.dispatch(actionCreators.patchSignupCompanyInfo({ ...props }));
};

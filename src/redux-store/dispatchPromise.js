import * as actionCreators from "./actionCreator/actionCreator";
import store from "./store";

export const getState = () => {
	return store.getState().thainowReducer;
};

export const submitErrorHandler = (message) => {
	return store.dispatch(actionCreators.initError(message, ""));
};

export const patchBusinessSignupInfo = ({ ...props }) => {
	return store.dispatch(actionCreators.patchBusinessSignupInfo({ ...props }));
};

export const patchSignupClassicInfo = ({ ...props }) => {
	return store.dispatch(actionCreators.patchSignupClassicInfo({ ...props }));
};

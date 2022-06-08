import * as actionCreators from "./actionCreator/actionCreator";
import store from "./store";

export const submitErrorHandler = (message) => {
	return store.dispatch(actionCreators.initError(message, ""));
};

export const patchBusinessSignupInfo = ({ ...props }) => {
	return store
		.dispatch(actionCreators.patchBusinessSignupInfo({ ...props }))
		.catch(() => submitErrorHandler("Unexpected Error!"));
};

import store from "../redux-store/store";
import * as actionCreators from "../redux-store/actionCreator/actionCreator";

export const submitErrorHandler = (message) => {
	return store.dispatch(actionCreators.initError(message, ""));
};

export const getPromise = (promise = () => {}) => {
	return new Promise((_, reject) => {
		promise();
		reject();
	});
};

import * as actionCreators from "./actionCreator/actionCreator";
import store from "./store";

export const submitErrorHandler = (message) => {
	return new Promise((_, reject) => {
		store.dispatch(actionCreators.initError(message, ""));
		reject();
	});
};

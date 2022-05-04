import * as actionTypes from "./actionType";

// error
export const dispatchError = (message, status) => {
	return {
		type: actionTypes.DISPATCH_ERROR,
		message: message,
		status: status,
	};
};

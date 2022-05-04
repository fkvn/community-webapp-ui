import * as actions from "./action";

export const initError = (message, status) => {
	return (dispatch) => {
		dispatch(actions.dispatchError(message, status));
	};
};

import * as actions from "./action";

// patch business sign up info
export const patchBusinessSignupInfo = ({ ...newInfo }) => {
	return (dispatch) => {
		dispatch(actions.dispatchPatchSignupBusinessInfo({ ...newInfo }));
	};
};

// create error
export const initError = (message, status) => {
	return (dispatch) => {
		dispatch(actions.dispatchError(message, status));
	};
};

import * as actions from "./action";

// patch user sign up info
export const patchSignupUserInfo = ({ ...newInfo }) => {
	return (dispatch) => {
		dispatch(actions.dispatchPatchSignupUserInfo({ ...newInfo }));
	};
};

// patch company sign up info
export const patchSignupCompanyInfo = ({ ...newInfo }) => {
	return (dispatch) => {
		dispatch(actions.dispatchPatchSignupCompanyInfo({ ...newInfo }));
	};
};

// patch search info
export const patchSearchInfo = ({ ...newInfo }) => {
	return (dispatch) => {
		dispatch(actions.dispatchPatchSearchInfo({ ...newInfo }));
	};
};

// create error
export const initError = (message, status) => {
	return (dispatch) => {
		dispatch(actions.dispatchError(message, status));
	};
};

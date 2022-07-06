import * as actions from "./action";

// patch user sign up info
export const patchSignupUserInfo = ({ ...newInfo }, replace = false) => {
	return (dispatch) => {
		dispatch(actions.dispatchPatchSignupUserInfo({ ...newInfo }, replace));
	};
};

// patch user sign in info
export const patchSigninUserInfo = ({ ...newInfo }, replace = false) => {
	return (dispatch) => {
		dispatch(actions.dispatchPatchSigninUserInfo({ ...newInfo }, replace));
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

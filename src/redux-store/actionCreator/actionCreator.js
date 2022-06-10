import * as actions from "./action";

// patch business sign up info
export const patchBusinessSignupInfo = ({ ...newInfo }) => {
	return (dispatch) => {
		dispatch(actions.dispatchPatchSignupBusinessInfo({ ...newInfo }));
	};
};

// patch classic sign up info
export const patchSignupClassicInfo = ({ ...newInfo }) => {
	return (dispatch) => {
		dispatch(actions.dispatchPatchSignupClassicInfo({ ...newInfo }));
	};
};

// patch company sign up info
export const patchSignupCompanyInfo = ({ ...newInfo }) => {
	return (dispatch) => {
		dispatch(actions.dispatchPatchSignupCompanyInfo({ ...newInfo }));
	};
};

// create error
export const initError = (message, status) => {
	return (dispatch) => {
		dispatch(actions.dispatchError(message, status));
	};
};

// async thunk dispatch to handle logic

import { patchProfileInfoAction } from "./UserAction";

export const patchProfileInfoActionCreator = (profile) => {
	return (dispatch, _getState) => dispatch(patchProfileInfoAction(profile));
};

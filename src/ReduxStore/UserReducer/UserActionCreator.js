// async thunk dispatch to handle logic

import { patchAccountInfoAction, patchProfileInfoAction } from "./UserAction";

export const patchProfileInfoActionCreator = (
	profile = {},
	replace = false
) => {
	return (dispatch, _getState) =>
		dispatch(patchProfileInfoAction(profile, replace));
};

export const patchAccountInfoActionCreator = (
	account = {},
	replace = false
) => {
	return (dispatch, _getState) =>
		dispatch(patchAccountInfoAction(account, replace));
};

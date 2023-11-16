// async thunk dispatch to handle logic

import { patchProfileInfoAction } from "./UserAction";

export const patchProfileInfoActionCreator = (
	profile = {},
	replace = false
) => {
	return (dispatch, _getState) =>
		dispatch(patchProfileInfoAction(profile, replace));
};

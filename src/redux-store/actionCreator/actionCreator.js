import * as actions from "./action";

// patch user sign up info
export const patchStoreRootObjInfo = (
	type,
	objName,
	{ ...newInfo },
	replace = false
) => {
	return (dispatch) => {
		dispatch(
			actions.dispatchPatchStoreRootObjInfo(
				type,
				objName,
				{ ...newInfo },
				replace
			)
		);
	};
};

// create error
export const initError = (message, status) => {
	return (dispatch) => {
		dispatch(actions.dispatchError(message, status));
	};
};

// export const userReducer = (state) => state.userReducer;

import { PROFILE_OBJ } from "../../Util/constVar";
import { DISPATCH_PATCH_PROFILE_INFO } from "./UserActionType";

/* proifle format {
		id: 1,
		info: {
			picture: "url",
			name: "",
			picture: ""
		}
		avgRating: 0,
		totalReview: 0,
		type= "USER_PROFILE"
	} */
/**
 * helper method
 * @returns
 */
const getStorageProfile = () => {
	return {
		...(JSON.parse(localStorage.getItem(PROFILE_OBJ)) || {}),
	};
};

const initialState = {
	[`${PROFILE_OBJ}`]: getStorageProfile(),
};

const patchProfile = (state, { profile = {}, replace = false }) => {
	const profileObj = {
		...(replace ? {} : state?.profile),
		...profile,
	};
	return {
		...state,
		profileObj,
	};
};

// export const userReducer = (state) => state.userReducer;

const reducer = (state = initialState, action) => {
	switch (action?.type) {
		case DISPATCH_PATCH_PROFILE_INFO:
			return patchProfile(state, action);
		// default
		default:
			return state;
	}
};

export default reducer;

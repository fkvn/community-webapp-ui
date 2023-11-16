// patch user sign in info

import { DISPATCH_PATCH_PROFILE_INFO } from "./UserActionType";

export const patchProfileInfoAction = (profile = {}, replace = false) => {
	return {
		type: DISPATCH_PATCH_PROFILE_INFO,
		profile: profile,
		replace: replace,
	};
};

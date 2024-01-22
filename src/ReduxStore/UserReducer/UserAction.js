// patch user sign in info

import { ACCOUNT_OBJ } from "../../Util/ConstVar";
import {
	DISPATCH_PATCH_ACCOUNT_INFO,
	DISPATCH_PATCH_PROFILE_INFO,
} from "./UserActionType";

export const patchProfileInfoAction = (profile = {}, replace = false) => {
	return {
		type: DISPATCH_PATCH_PROFILE_INFO,
		profile: profile,
		replace: replace,
	};
};

export const patchAccountInfoAction = (account = {}, replace = false) => {
	return {
		type: DISPATCH_PATCH_ACCOUNT_INFO,
		[`${ACCOUNT_OBJ}`]: account,
		replace: replace,
	};
};

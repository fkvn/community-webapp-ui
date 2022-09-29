import { useSelector } from "react-redux";
import { patchProfileInfoPromise } from "../../redux-store/dispatchPromise";
import { THAINOW_PROFILE_OBJ } from "../../Util/ConstVar";
import { isObjectEmpty } from "../../Util/Util";

function useProfile() {
	const storedProfile =
		JSON.parse(localStorage.getItem(THAINOW_PROFILE_OBJ)) || {};

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
	const profile = useSelector(
		(state) => state.thainowReducer[`${THAINOW_PROFILE_OBJ}`] || {}
	);

	if (isObjectEmpty(profile) && !isObjectEmpty(storedProfile)) {
		patchProfileInfoPromise(storedProfile);
	}

	return {
		profile,
	};
}

export default useProfile;

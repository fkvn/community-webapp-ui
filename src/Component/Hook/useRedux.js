import { useSelector } from "react-redux";
import store from "../../ReduxStore/Store";
import { patchProfileInfoActionCreator } from "../../ReduxStore/UserReducer/UserActionCreator";
import { PROFILE_OBJ } from "../../Util/ConstVar";

function useRedux() {
	const { [`${PROFILE_OBJ}`]: profile = {} } = useSelector(
		(state) => state.userReducer
	);

	const patchProfileInfo = (profile = {}) =>
		store.dispatch(patchProfileInfoActionCreator(profile, true));

	return { profile, patchProfileInfo };
}

export default useRedux;

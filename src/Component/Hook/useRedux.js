import { useSelector } from "react-redux";
import { patchProfileInfoActionCreator } from "../../ReduxStore/UserReducer/UserActionCreator";
import store from "../../ReduxStore/store";
import { PROFILE_OBJ } from "../../Util/constVar";

function useRedux() {
	const { [`${PROFILE_OBJ}`]: profile = {} } = useSelector(
		(state) => state.userReducer
	);

	const patchProfileInfo = (profile = {}, replace = true) =>
		store.dispatch(patchProfileInfoActionCreator(profile, replace));

	return { profile, patchProfileInfo };
}

export default useRedux;

import { useSelector } from "react-redux";
import {
	patchAccountInfoActionCreator,
	patchProfileInfoActionCreator,
} from "../../ReduxStore/UserReducer/UserActionCreator";
import store from "../../ReduxStore/store";
import { PROFILE_OBJ } from "../../Util/constVar";

function useRedux() {
	const { [`${PROFILE_OBJ}`]: profile = {} } = useSelector(
		(state) => state.userReducer
	);

	const patchProfileInfo = (profile = {}, replace = true) =>
		store.dispatch(patchProfileInfoActionCreator(profile, replace));

	const patchAccountInfo = (account = {}, replace = true) =>
		store.dispatch(patchAccountInfoActionCreator(account, replace));

	return { profile, patchProfileInfo, patchAccountInfo };
}

export default useRedux;

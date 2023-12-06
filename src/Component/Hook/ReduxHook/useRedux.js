import {
	patchAccountInfoActionCreator,
	patchProfileInfoActionCreator,
} from "../../../ReduxStore/UserReducer/UserActionCreator";
import store from "../../../ReduxStore/store";

function useRedux() {
	const patchProfileInfo = (profile = {}, replace = true) =>
		store.dispatch(patchProfileInfoActionCreator(profile, replace));

	const patchAccountInfo = (account = {}, replace = true) =>
		store.dispatch(patchAccountInfoActionCreator(account, replace));

	return { patchProfileInfo, patchAccountInfo };
}

export default useRedux;

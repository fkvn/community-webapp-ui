/* Description  

  This file defines initial state shape and reducer to produce new state.
  Every time the application is re-run, the reducer will call initialState as default

  A reducer is a pure function that will receiver previous state and action to produce new state.

  For example:
    export const reducerExample = (preState, action) => newState;
  
  New State will be return to Redux Store which will:
    
    1. Holds application state;
    2. Allows access to state via getState();
    3. Allows state to be updated via dispatch(action);
    4. Registers listeners via subscribe(listener);
    5. Handles unregistering of listeners via the function returned by subscribe(listener).

  Notes: We will only have a single store in a Redux application.
  -> To split data handling logic (such as we want to manage state for Rubrick and Survey), we will use 'reducer composition' instead of many stores.
*/

import * as constVar from "../../Util/ConstVar";
import * as actionTypes from "../actionCreator/actionType";

const initialState = {
	[`${constVar.THAINOW_USER_OBJ}`]: [],
	[`${constVar.THAINOW_PROFILE_OBJ}`]: {},
	[`${constVar.THAINOW_USER_SIGN_UP_OBJ}`]: {},
	[`${constVar.THAINOW_USER_SIGN_IN_OBJ}`]: {
		[`${constVar.SIGNIN_METHOD_PROP}`]: constVar.EMAIL_PROP,
	},
	[`${constVar.THAINOW_COMPANY_SIGN_UP_OBJ}`]: {},
	[`${constVar.THAINOW_SEARCH_OBJ}`]: {},
};

// ==================  Reducer helping functions =========================

/* 
  @Usage: called by redux reducer to update state from action payload
  @Param: state, action
*/

// ================== error =========================

// dispatch store root object info
const dispatchPatchStoreRootObjInfo = (state, action) => {
	const replace = action.replace || false;

	const currentInfo = !replace
		? state[`${action[`${constVar.THAINOW_REDUX_STORE_ROOT_OBJ}`]}`]
		: {};

	const updateInfo = {
		...currentInfo,
		...action[`${constVar.THAINOW_REDUX_STORE_ROOT_OBJ_PROPS}`],
	};

	return {
		...state,
		[`${action[`${constVar.THAINOW_REDUX_STORE_ROOT_OBJ}`]}`]: updateInfo,
	};
};

const dispatchError = (state, action) => {
	const error = {};

	error[`${constVar.ERROR_MESSAGE}`] = action.message;
	error[`${constVar.ERROR_TYPE}`] = action.status;

	// console.log(error);

	return {
		...state,
		[`${constVar.ERROR}`]: error,
	};
};

// ************* reducer ****************************************

/* 
  @Params: state with default is initialState
  @Usage: this reducer will get the initialState everytime and return updated state by calling function depends on action object {type, ...payload}.
*/
const reducer = (state = initialState, action) => {
	switch (action.type) {
		// patch redux store root obj
		case actionTypes.DISPATCH_PATCH_STORE_ROOT_OBJ_INFO:
			return dispatchPatchStoreRootObjInfo(state, action);

		// Error
		case actionTypes.DISPATCH_ERROR:
			return dispatchError(state, action);
		// default
		default:
			return state;
	}
};

export default reducer;

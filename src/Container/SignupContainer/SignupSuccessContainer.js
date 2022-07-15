import UserSignupSuccess from "../../Component/Signup/UserSignupSuccess";
import * as dispatchPromise from "../../redux-store/dispatchPromise";
import * as constVar from "../../Util/ConstVar";

function SignupSuccessContainer() {
	const signinInfo =
		dispatchPromise.getState()[`${constVar.THAINOW_USER_SIGN_IN_OBJ}`];

	const app = (
		<UserSignupSuccess username={signinInfo[`${constVar.USERNAME_PROP}`]} />
	);
	return app;
}

export default SignupSuccessContainer;

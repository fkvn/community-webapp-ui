import { useLocation, useNavigate } from "react-router-dom";
import UserSignupSuccess from "../../Component/Signup/UserSignupSuccess";
import * as dispatchPromise from "../../redux-store/dispatchPromise";
import * as constVar from "../../Util/ConstVar";
import { signInUserPromise } from "../../Util/Util";

function SignupSuccessContainer() {
	const navigate = useNavigate();

	const location = useLocation();

	const continueUrl = location?.state?.[`${constVar.ON_SUCCESS_URL}`] || "/";

	const signinInfo =
		dispatchPromise.getState()[`${constVar.THAINOW_USER_SIGN_IN_OBJ}`] || {};

	const {
		[`${constVar.USERNAME_PROP}`]: username,
		[`${constVar.SIGNIN_METHOD_PROP}`]: signinMethod = "",
	} = signinInfo;

	const signinUserHandler = async () => {
		return signInUserPromise(signinMethod).then(() => {
			navigate(continueUrl);
		});
	};

	const app = (
		<UserSignupSuccess username={username} signinUser={signinUserHandler} />
	);
	return app;
}

export default SignupSuccessContainer;

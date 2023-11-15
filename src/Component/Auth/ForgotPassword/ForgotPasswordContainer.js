import { verifyExistingAxios } from "../../../Axios/authAxios";
import useProfile from "../../Hook/useProfile";
import useSignin from "../../Hook/useSignin";
import ForgotPassword from "./ForgotPassword";

function ForgotPasswordContainer({}) {
	const { changePassword } = useProfile();
	const { onSigninHandle } = useSignin();

	const onBeforeSendCodeHandle = async (_ = "", field = "", value = "") => {
		return verifyExistingAxios(field, value)
			.then((exist = true) =>
				exist ? Promise.resolve() : Promise.reject("message_user_not_found_msg")
			)
			.catch((e) => Promise.reject(e));
	};

	const app = (
		<>
			<ForgotPassword
				onBeforeSendCode={onBeforeSendCodeHandle}
				onSubmitPassword={changePassword}
				onAfterSubmitPassword={onSigninHandle}
			/>
		</>
	);
	return app;
}

export default ForgotPasswordContainer;

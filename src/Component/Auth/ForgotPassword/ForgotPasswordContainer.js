import { verifyExistingAxios } from "../../../Axios/authAxios";
import { PASSWORD_PROP, SIGNIN_CHANNEL_THAINOW } from "../../../Util/constVar";
import useAuth from "../../Hook/AuthHook/useAuth";
import useProfile from "../../Hook/useProfile";
import ForgotPassword from "./ForgotPassword";

function ForgotPasswordContainer() {
	const { changePassword } = useProfile();
	const { signin } = useAuth();

	const onBeforeSendCodeHandle = async (_ = "", field = "", value = "") => {
		return verifyExistingAxios(field, value)
			.then((exist = true) =>
				exist ? Promise.resolve() : Promise.reject("message_user_not_found_msg")
			)
			.catch((e) => Promise.reject(e));
	};

	const onAfterSubmitPasswordHandle = (credentials = {}) =>
		signin(SIGNIN_CHANNEL_THAINOW, {
			channel: credentials?.channel,
			value: credentials[`${credentials.channel}`],
			[`${PASSWORD_PROP}`]: credentials[`${PASSWORD_PROP}`],
		});

	const App = () => (
		<>
			<ForgotPassword
				onBeforeSendCode={onBeforeSendCodeHandle}
				onSubmitPassword={changePassword}
				onAfterSubmitPassword={onAfterSubmitPasswordHandle}
			/>
		</>
	);
	return <App />;
}

export default ForgotPasswordContainer;

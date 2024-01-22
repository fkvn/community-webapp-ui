import { verifyExistingAxios } from "../../../Axios/authaxios";
import {
	findUserByEmailAxios,
	findUserByPhoneAxios,
} from "../../../Axios/userAxios";
import {
	CHANNEL_PROP,
	EMAIL_PROP,
	PASSWORD_PROP,
	PHONE_PROP,
	REGION_PROP,
	SIGNIN_CHANNEL_THAINOW,
} from "../../../Util/ConstVar";
import useAuth from "../../Hook/AuthHook/useAuth";
import useMessage from "../../Hook/MessageHook/useMessage";
import useProfile from "../../Hook/useProfile";
import ForgotPassword from "./ChangePassword";

function ForgotPasswordContainer() {
	const { changePassword } = useProfile();
	const { errorMessage } = useMessage();
	const { signin } = useAuth();

	const onBeforeSendCodeHandle = async (channel = "", payload = {}) => {
		return verifyExistingAxios(channel, payload)
			.then((exist = true) =>
				exist ? Promise.resolve() : Promise.reject("message_user_not_found_msg")
			)
			.catch((e) => Promise.reject(e));
	};

	const onSubmitPasswordHandle = async (credentials = {}) => {
		const { accountId, status } =
			credentials[`${CHANNEL_PROP}`] === EMAIL_PROP
				? await findUserByEmailAxios(credentials[`${EMAIL_PROP}`])
				: credentials[`${CHANNEL_PROP}`] === PHONE_PROP
				  ? await findUserByPhoneAxios(
							credentials[`${PHONE_PROP}`],
							credentials[`${REGION_PROP}`]
				    )
				  : {};

		if (!accountId || !status)
			return errorMessage().then(() => Promise.reject());

		if (status !== "ACTIVATED")
			return errorMessage("message_user_disabled_msg").then(() =>
				Promise.reject()
			);

		return changePassword(accountId, credentials[`${PASSWORD_PROP}`]);
	};

	const onAfterSubmitPasswordHandle = (credentials = {}) =>
		signin(SIGNIN_CHANNEL_THAINOW, credentials);

	const App = () => (
		<>
			<ForgotPassword
				onBeforeSendCode={onBeforeSendCodeHandle}
				onSubmitPassword={onSubmitPasswordHandle}
				onAfterSubmitPassword={onAfterSubmitPasswordHandle}
			/>
		</>
	);
	return <App />;
}

export default ForgotPasswordContainer;

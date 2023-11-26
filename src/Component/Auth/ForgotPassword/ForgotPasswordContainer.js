import { verifyExistingAxios } from "../../../Axios/authAxios";
import {
	findUserByEmailAxios,
	findUserByPhoneAxios,
} from "../../../Axios/userAxios";
import {
	CHANNEL_PROP,
	EMAIL_PROP,
	ID_PROP,
	PASSWORD_PROP,
	PHONE_PROP,
	REGION_PROP,
	SIGNIN_CHANNEL_THAINOW,
} from "../../../Util/constVar";
import useAuth from "../../Hook/AuthHook/useAuth";
import useMessage from "../../Hook/MessageHook/useMessage";
import useProfile from "../../Hook/useProfile";
import ForgotPassword from "./ForgotPassword";

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
		const { id, status } =
			credentials[`${CHANNEL_PROP}`] === EMAIL_PROP
				? await findUserByEmailAxios(credentials[`${EMAIL_PROP}`])
				: credentials[`${CHANNEL_PROP}`] === PHONE_PROP
				  ? await findUserByPhoneAxios(
							credentials[`${PHONE_PROP}`],
							credentials[`${REGION_PROP}`]
				    )
				  : {};

		if (!id || !status) return errorMessage().then(() => Promise.reject());

		if (status !== "ACTIVATED")
			return errorMessage("message_user_disabled_msg").then(() =>
				Promise.reject()
			);

		return changePassword({
			[`${ID_PROP}`]: id,
			[`${PASSWORD_PROP}`]: credentials[`${PASSWORD_PROP}`],
		});
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

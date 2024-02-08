import { useSelector } from "react-redux";
import { ACCOUNT_ID_PROP, USER_REDUCER } from "../../../../Util/ConstVar";
import useProfile from "../../../Hook/useProfile";
import NewPassword from "./NewPassword";

function NewPasswordContainer() {
	const { profile } = useSelector((state) => state[`${USER_REDUCER}`]);
	const { changePassword } = useProfile();

	const changePasswordHandle = (credentials = {}) =>
		changePassword(profile[`${ACCOUNT_ID_PROP}`], credentials, true);

	const App = () => (
		<>
			<NewPassword profile={profile} changePassword={changePasswordHandle} />
		</>
	);
	return <App />;
}

export default NewPasswordContainer;

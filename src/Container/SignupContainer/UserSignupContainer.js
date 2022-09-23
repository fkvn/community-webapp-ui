import useFormControl from "../../Component/Hook/useFormControl";
import UserSignup from "../../Component/Signup/UserSignup";

function UserSignupContainer() {
	const { pageHeader } = useFormControl();

	const app = (
		<div id="register-form">
			{pageHeader()}
			<UserSignup />
		</div>
	);
	return app;
}

export default UserSignupContainer;

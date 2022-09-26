import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Component/Hook/useAuth";
import useFormControl from "../../Component/Hook/useFormControl";
import UserSignup from "../../Component/Signup/UserSignup";
import { emptyProject } from "../../Util/Util";

function UserSignupContainer() {
	const navigate = useNavigate();
	const { pageHeader } = useFormControl();
	const { profile } = useAuth();

	useEffect(() => {
		if (!emptyProject(profile)) {
			console.log("user");
			navigate("/");
		}
	});

	const app = (
		<div id="register-form">
			{pageHeader()}
			<UserSignup />
		</div>
	);
	return app;
}

export default UserSignupContainer;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usePageHeader from "../../Component/Hook/FormHook/usePageheader";
import useProfile from "../../Component/Hook/useProfile";
import UserSignup from "../../Component/Signup/UserSignup";
import { emptyProject } from "../../Util/Util";

function UserSignupContainer() {
	const navigate = useNavigate();
	const { profile } = useProfile();

	useEffect(() => {
		if (!emptyProject(profile)) {
			console.log("user");
			navigate("/");
		}
	});

	const app = (
		<div id="register-form">
			{usePageHeader()}
			<UserSignup />
		</div>
	);
	return app;
}

export default UserSignupContainer;

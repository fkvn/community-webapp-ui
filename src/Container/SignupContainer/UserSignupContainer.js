import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserSignup from "../../Component/Auth/UserSignup";
import usePageHeader from "../../Component/Hook/FormHook/usePageheader";
import useProfile from "../../Component/Hook/useProfile";
import { emptyProject } from "../../Util/Util";

function UserSignupContainer() {
	const navigate = useNavigate();
	const { profile } = useProfile();

	useEffect(() => {
		if (!emptyProject(profile)) {
			navigate("/");
		}
	});

	const app = (
		<div id="register-form">
			{usePageHeader({ title: "ThaiNow Registration" })}
			<UserSignup />
		</div>
	);
	return app;
}

export default UserSignupContainer;

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserSignin from "../../Component/Auth/UserSignin";
import usePageHeader from "../../Component/Hook/FormHook/usePageheader";
import useAuth from "../../Component/Hook/useAuth";
import { successMessage } from "../../Component/Hook/useMessage";

function UserSigninContainer() {
	const { auth } = useAuth();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);

	const location = useLocation();
	console.log(location);

	useEffect(() => {
		if (loading) {
			auth(false)
				.then(() =>
					successMessage("You have already signed in ...").then(() =>
						navigate("/")
					)
				)
				.catch(() => setLoading(false));
		}
	});

	const app = (
		<>
			{usePageHeader({
				title: "ThaiNow Sign In",
			})}
			<UserSignin />
		</>
	);

	return !loading && app;
}

export default UserSigninContainer;

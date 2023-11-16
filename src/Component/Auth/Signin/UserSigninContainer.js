import { useEffect, useState } from "react";
import useAuth from "../../Hook/AuthHook/useAuth";
import TopPageHeader from "../../Layout/Header/TopPageHeader";
import UserSignin from "./UserSignin";

function UserSigninContainer() {
	const { auth } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (loading) {
			auth(false).catch(() => {
				setLoading(false);
			});
		}
	});

	const app = (
		<>
			<TopPageHeader />
			<UserSignin />
		</>
	);

	return !loading && app;
}

export default UserSigninContainer;

import { useEffect, useState } from "react";
import useAuth from "../../Hook/AuthHook/useAuth";
import TopPageHeader from "../../Layout/Header/TopPageHeader";
import Signin from "./Signin";

function SigninContainer() {
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
			<Signin />
		</>
	);

	return !loading && app;
}

export default SigninContainer;

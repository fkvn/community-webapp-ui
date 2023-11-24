import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../Hook/AuthHook/useAuth";

function Auth({ children }) {
	const [loading, setLoading] = useState(true);
	const { auth } = useAuth();
	const { pathname } = useLocation();
	const redirectUri = pathname.slice(1);

	useEffect(() => {
		if (loading) {
			auth(true, false, redirectUri).then(() => {
				setLoading(false);
			});
		}
	});

	const App = () => (!loading ? <>{children}</> : null);
	return <App />;
}

export default Auth;

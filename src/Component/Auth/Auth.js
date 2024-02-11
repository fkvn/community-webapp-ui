import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../Hook/AuthHook/useAuth";

function Auth({ throwError = true, customRedirectUri = "", children }) {
	const [authorized, setAuthorized] = useState(false);
	const { auth } = useAuth();
	const { pathname } = useLocation();
	const redirectUri = customRedirectUri || pathname.slice(1);
	useEffect(() => {
		if (!authorized) {
			auth(throwError, false, redirectUri).then(() => {
				setAuthorized(true);
			});
		}
	});

	const App = () => <>{children}</>;
	return authorized ? <App /> : null;
}

export default Auth;

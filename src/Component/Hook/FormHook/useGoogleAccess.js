import jwt_decode from "jwt-decode";
import { useEffect, useRef } from "react";

function useGoogleAccess(buttonProps = {}) {
	const handleCredentialResponse = (response) => {
		console.log("Encoded JWT ID token: " + response.credential);
		console.log(jwt_decode(response.credential));
	};

	const divRef = useRef(null);

	useEffect(() => {
		if (divRef.current) {
			window.google.accounts.id.initialize({
				client_id:
					"776649368023-066tf4h17jo8m2bdfbjbjo7lov8moln8.apps.googleusercontent.com",
				callback: handleCredentialResponse,
			});

			window.google.accounts.id.renderButton(divRef.current, {
				theme: "outline",
				size: "large",
				type: "standard",
				text: "signin",
				shape: "pill",
				html: "Google",
				logoAlignment: "left",
				...buttonProps,
			});
		}
	}, [divRef.current]);

	return (
		<div
			ref={divRef}
			className="g_id_signin"
			data-type="icon"
			data-shape="circle"
			data-theme="outline"
			data-text="continue_with"
			data-size="large"
		></div>
	);
}

export default useGoogleAccess;

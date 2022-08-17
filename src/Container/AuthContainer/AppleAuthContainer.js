import { useEffect, useState } from "react";

function AppleAuthContainer() {
	const [isLoading, setIsLoading] = useState(true);

	const handleCredentialResponse = async () => {
		const response = await window.AppleID.auth.signIn();
		console.log(response);
	};

	const token = {
		header: {
			alg: "ES256",
			kid: "WRT34B9RVL",
			typ: "JWT",
		},
		payload: {
			iss: "227274AY67",
			"exp ": "1660710927",
			iat: 1660709701,
			aud: "https://appleid.apple.com",
			sub: "com.searchforthai.thainow",
		},
	};

	useEffect(() => {
		if (isLoading) {
			new window.AppleID.auth.init({
				clientId: "com.searchforthai.thainow",
				scope: "name email",
				redirectURI: "https://searchforthai.com",
				state: "kevinaa!@#$",
				usePopup: true,
			});

			// handleCredentialResponse();

			setIsLoading(false);
		}
	});

	const app = (
		<>
			Sign in with Apple{" "}
			<div
				id="appleid-signin"
				data-color="black"
				data-border="true"
				data-type="sign in"
			></div>
		</>
	);
	return app;
}

export default AppleAuthContainer;

import { useEffect, useState } from "react";

function AppleAuthContainer() {
	const [isLoading, setIsLoading] = useState(true);

	const handleCredentialResponse = async () => {
		const response = await window.AppleID.auth.signIn();
		console.log(response);
		window.localStorage.setItem("apple", response);
	};

	const token = {
		header: {
			alg: "ES256",
			kid: "WRT34B9RVL",
			typ: "JWT",
		},
		payload: {
			iss: "227274AY67",
			exp: "1660710927",
			iat: "1660709701",
			aud: "https://appleid.apple.com",
			sub: "com.searchforthai.thainow",
		},
	};

	useEffect(() => {
		if (isLoading) {
			new window.AppleID.auth.init({
				clientId: "com.searchforthai.thainow",
				responseType: "code",
				scope: "name email",
				redirectURI: "https://projectthaihub.com/redirect",
				state: "kevinaa!@#$",
				nonce: "xyz",
				usePopup: false,
			});

			setIsLoading(false);
		}
	});

	const onClickAppleSignin = () => {
		const oauthUrl =
			`https://appleid.apple.com/auth/authorize?response_type=code&` +
			`client_id=com.searchforthai.thainow&scope=name+email&response_mode=form_post&` +
			`state=kevinaa&redirect_uri=https%3A%2F%2Fprojectthaihub.com%2Fredirect&nonce=xyz`;
		const windowWidth = 450;
		const windowHeight = 600;
		const left = window.screen.width / 2 - windowWidth / 2;
		const top = window.screen.height / 2 - windowHeight / 2;

		window.open(
			oauthUrl,
			"Apple Sign-In",
			`menubar=no,location=no,scrollbars=no,status=` +
				`no,width=${windowWidth},height=${windowHeight},top=${top},left=${left}`
		);
	};

	const app = (
		<>
			Sign in with Apple{" "}
			<div
				id="appleid-signin"
				data-color="black"
				data-border="true"
				data-type="sign in"
			></div>
			{/* <button onClick={onClickAppleSignin}>Apple sign-in</button> */}
		</>
	);
	return app;
}

export default AppleAuthContainer;

import jwt_decode from "jwt-decode";
import { useEffect, useRef } from "react";
import { FORWARD_SUCCESS } from "../../../Util/ConstVar";
import useSignin from "../useSignin";

function useAppleAccess() {
	const divRef = useRef(null);

	const { appleSignin } = useSignin();

	const handleCredentialResponse = ({
		detail: { authorization: { id_token = "" } = {} } = {},
	}) => appleSignin(jwt_decode(id_token), true, FORWARD_SUCCESS);

	useEffect(() => {
		window.document.addEventListener(
			"AppleIDSignInOnSuccess",
			handleCredentialResponse
		);

		if (divRef.current) {
			new window.AppleID.auth.init({
				clientId: "com.searchforthai.thainow",
				responseType: "code",
				scope: "name email",
				// the redirectURI domain must the same as the domain when pop-up is render
				redirectURI: "https://mono-thainow.web.app/signin",
				state: "kevinaa!@#$",
				nonce: "xyz",
				usePopup: true,
			});
		}
	}, [divRef.current]);

	const app = (
		<div
			id="appleid-signin"
			ref={divRef}
			data-color="black"
			data-border="true"
			data-type="sign-in"
			data-border-radius="40px"
			style={{
				width: "200px",
				height: "35px",
			}}
			// onclick for local dev only
			// hide when go production
			// onClick={() =>
			// 	appleSignin(
			// 		{
			// 			sub: "000216.25114e5db4f94b969bd8ff00abc4cb25.0320",
			// 			email: "phucaone@gmail.com",
			// 			email_verified: "true",
			// 			name: "Kevin",
			// 		},
			// 		true,
			// 		FORWARD_SUCCESS
			// 	)
			// }
		></div>
	);

	return app;
}

export default useAppleAccess;

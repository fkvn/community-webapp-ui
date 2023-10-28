import i18next from "i18next";
import jwt_decode from "jwt-decode";
import { useEffect, useRef } from "react";
import { localEnv } from "../../../Assest/env";
import { FORWARD_SUCCESS } from "../../../Util/ConstVar";
import useSignin from "../useSignin";

function useAppleAccess() {
	const divRef = useRef(null);

	const { appleSignin } = useSignin();

	const handleCredentialResponse = ({
		detail: { authorization: { id_token = "" } = {} } = {},
	}) => appleSignin(jwt_decode(id_token), true, FORWARD_SUCCESS);

	const appleConnectLoaded = () => {
		window.document.addEventListener(
			"AppleIDSignInOnSuccess",
			handleCredentialResponse
		);
		new window.AppleID.auth.init({
			clientId: "com.searchforthai.thainow",
			responseType: "code",
			scope: "name email",
			// the redirectURI domain must the same as the domain when pop-up is render
			redirectURI: localEnv
				? "https://dev.searchforthai.com/signin"
				: "https://searchforthai.com/signin",
			state: "kevinaa!@#$",
			nonce: "xyz",
			usePopup: true,
		});
	};

	useEffect(() => {
		var id = "apple-jssdk";
		var js;
		js = document.createElement("script");
		js.id = id;
		js.async = true;
		js.type = "text/javascript";
		js.src = `https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/${
			i18next.language === "th" ? "th_TH" : "en_US"
		}/appleid.auth.js`;
		document.getElementsByTagName("body")[0].appendChild(js);
		js.addEventListener("load", () => appleConnectLoaded());
	}, [divRef.current]);

	const app = (
		<div
			id="appleid-signin"
			ref={divRef}
			data-mode="center-align"
			data-color="black"
			data-border="true"
			data-type="sign-in"
			data-border-radius="50"
			style={{
				width: "180px",
				fontSize: "1rem",
				height: "38px",
			}}
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

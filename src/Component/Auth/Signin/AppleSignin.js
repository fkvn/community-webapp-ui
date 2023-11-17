import i18next from "i18next";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { devEnv, localEnv } from "../../../Assest/Env";
import { SIGNIN_CHANNEL_APPLE } from "../../../Util/ConstVar";
import useSignin from "../../Hook/useSignin";

function AppleSignin({ buttonProps = {} }) {
	const { onSigninHandle } = useSignin();

	const handleCredentialResponse = ({
		detail: { authorization: { id_token = "" } = {} } = {},
	}) => onSigninHandle(SIGNIN_CHANNEL_APPLE, jwt_decode(id_token));

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
			// if localhost, the pop-up would return the 403 error
			redirectURI:
				localEnv || devEnv
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
	});

	const app = (
		<div
			id="appleid-signin"
			data-mode="logo-only"
			data-color="black"
			// data-border="true"
			data-type="sign-in"
			data-border-radius="50"
			style={{
				height: "40px",
			}}
			// since localhost would return 403 error, this is to debug
			{...(localEnv && {
				onClick: () =>
					onSigninHandle(SIGNIN_CHANNEL_APPLE, {
						sub: "0002216.25114e5db4f94b969bd8ff00abc4cb25.0320",
						email: "phucaone@gmail.com",
						email_verified: "true",
					}),
			})}
			{...buttonProps}
		></div>
	);

	return app;
}

export default AppleSignin;

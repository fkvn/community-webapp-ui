import i18next from "i18next";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { SIGNIN_CHANNEL_APPLE } from "../../../Util/constVar";
import { appleSignin } from "../../../serviceEnv";
import useAuth from "../../Hook/AuthHook/useAuth";

function AppleSignin({ buttonProps = {} }) {
	const { signin } = useAuth();

	const handleCredentialResponse = ({
		detail: { authorization: { id_token = "" } = {} } = {},
	}) => signin(SIGNIN_CHANNEL_APPLE, jwt_decode(id_token)).catch(() => {});

	const appleConnectLoaded = () => {
		window.document.addEventListener(
			"AppleIDSignInOnSuccess",
			handleCredentialResponse
		);
		new window.AppleID.auth.init({
			clientId: appleSignin.clientId,
			responseType: "code",
			scope: "name email",
			redirectURI: appleSignin.redirectURI,
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

	const App = () => (
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
			{...buttonProps}
		></div>
	);

	return <App />;
}

export default AppleSignin;

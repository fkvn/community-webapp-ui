import i18next from "i18next";
import jwt_decode from "jwt-decode";
import { useEffect, useRef } from "react";
import { devEnv, localEnv } from "../../../Assest/Env";
import { FORWARD_SUCCESS, SIGNIN_CHANNEL_GOOGLE } from "../../../Util/ConstVar";
import useSignin from "../../Hook/useSignin";

function GoogleSignin({}) {
	const { onSigninHandle } = useSignin();

	const handleCredentialResponse = (response) =>
		onSigninHandle(
			SIGNIN_CHANNEL_GOOGLE,
			jwt_decode(response.credential),
			true,
			FORWARD_SUCCESS
		);

	const divRef = useRef(null);

	const googleConnectLoaded = () => {
		window.google?.accounts?.id.initialize({
			// local or dev - client id
			client_id:
				localEnv || devEnv
					? "241068529796-kou3sb035i1uocf3fvrersft08ri99ai.apps.googleusercontent.com"
					: // production - client id
					  "868988780448-0gbek6qrnu2p2ihish1npqcuoegfgn35.apps.googleusercontent.com",
			callback: handleCredentialResponse,
		});

		window.google.accounts.id.renderButton(
			document.getElementById("buttonDiv"),
			{
				theme: "outline",
				size: "large",
				type: "icon",
				locale: i18next.language,
				text: "signin_with",
				shape: "pill",
			} // customization attributes
		);
		// window.google.accounts.id.prompt(); // also display the One Tap dialog

		// window.google?.accounts?.id.renderButton(divRef.current, {
		// 	theme: "outline",
		// 	size: "large",
		// 	type: "icon",
		// 	locale: i18next.language,
		// 	text: "signin_with",
		// 	shape: "pill",
		// 	...buttonProps,
		// });
	};

	useEffect(() => {
		var id = "google-jssdk";
		var js;
		js = document.createElement("script");
		js.id = id;
		js.async = true;
		js.defer = true;
		js.type = "text/javascript";
		js.src = `https://accounts.google.com/gsi/client?hl=${i18next.language}`;
		// js.src = `https://accounts.google.com/gsi/client`;

		document.getElementsByTagName("head")[0].appendChild(js);
		js.addEventListener("load", () => googleConnectLoaded());
	});

	return <div id="buttonDiv"></div>;
}

export default GoogleSignin;

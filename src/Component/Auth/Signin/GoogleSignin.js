import i18next from "i18next";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { SIGNIN_CHANNEL_GOOGLE } from "../../../Util/constVar";
import { googleSignin } from "../../../serviceEnv";
import useAuth from "../../Hook/AuthHook/useAuth";

function GoogleSignin() {
	const { signin } = useAuth();

	const handleCredentialResponse = (response) =>
		signin(SIGNIN_CHANNEL_GOOGLE, jwt_decode(response.credential)).catch(
			() => {}
		);

	const googleConnectLoaded = () => {
		window.google?.accounts?.id.initialize({
			client_id: googleSignin.client_id,
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
			}
		);
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
		document.getElementsByTagName("head")[0].appendChild(js);
		js.addEventListener("load", () => googleConnectLoaded());
	});

	const App = () => <div id="buttonDiv"></div>;

	return <App />;
}

export default GoogleSignin;

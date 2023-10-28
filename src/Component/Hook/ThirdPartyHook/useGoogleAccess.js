import i18next from "i18next";
import jwt_decode from "jwt-decode";
import { useEffect, useRef } from "react";
import { localEnv } from "../../../Assest/env";
import { FORWARD_SUCCESS } from "../../../Util/ConstVar";
import useSignin from "../useSignin";

function useGoogleAccess(buttonProps = {}) {
	const { googleSignin } = useSignin();

	const handleCredentialResponse = (response) =>
		googleSignin(jwt_decode(response.credential), true, FORWARD_SUCCESS);

	const divRef = useRef(null);

	const googleConnectLoaded = () => {
		window.google?.accounts?.id.initialize({
			// local - client id
			client_id: localEnv
				? "776649368023-066tf4h17jo8m2bdfbjbjo7lov8moln8.apps.googleusercontent.com"
				: // production - client id
				  "868988780448-0gbek6qrnu2p2ihish1npqcuoegfgn35.apps.googleusercontent.com",
			callback: handleCredentialResponse,
		});

		window.google?.accounts?.id.renderButton(divRef.current, {
			theme: "outline",
			size: "large",
			type: "standard",
			locale: i18next.language,
			// text: "Continue With",
			shape: "pill",
			html: "Google",
			logoAlignment: "left",

			...buttonProps,
		});
	};

	useEffect(() => {
		if (divRef.current) googleConnectLoaded();
	}, [divRef.current]);

	return <div ref={divRef}></div>;
}

export default useGoogleAccess;

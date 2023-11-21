import { Button } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { svgLineLogo } from "../../../Assest/Asset";
import { SIGNIN_CHANNEL_LINE } from "../../../Util/constVar";
import useImage from "../../Hook/useImage";

import { lineSignin } from "../../../serviceEnv";
import useMessage from "../../Hook/MessageHook/useMessage";
import useSignin from "../../Hook/useSignin";

function LineSignin() {
	const { image } = useImage();
	const { errorMessage } = useMessage();
	const [searchParams] = useSearchParams();
	const { onSigninHandle } = useSignin();

	const lineConfig = {
		code: searchParams.get("code"),
		redirect_uri: lineSignin.redirect_uri || "",
		client_id: lineSignin.client_id,
		client_secret: lineSignin.client_secret,
	};

	const getLineToken = async ({
		code = "",
		redirect_uri = "",
		client_id = "",
		client_secret = "",
	}) => {
		const getLineTokenUrl = "https://api.line.me/oauth2/v2.1/token";

		const lineTokenUrlSearchParam = {
			grant_type: "authorization_code",
			code: code || "",
			redirect_uri: redirect_uri || "",
			client_id: client_id || "",
			client_secret: client_secret || "",
		};

		return axios
			.post(getLineTokenUrl, new URLSearchParams(lineTokenUrlSearchParam))
			.then(({ data = {} }) => getLineProfileInfo(client_id, data?.id_token));
	};

	const getLineProfileInfo = async (client_id = "", id_token = "") => {
		const lineProfileUrlSearchParam = {
			id_token: id_token || "",
			client_id: client_id || "",
		};

		const getLineProfileUrl = "https://api.line.me/oauth2/v2.1/verify";

		return axios
			.post(getLineProfileUrl, new URLSearchParams(lineProfileUrlSearchParam))
			.then(({ data = {} }) => {
				if (!data?.email) errorMessage().then(() => Promise.reject());
				return Promise.resolve(data);
			});
	};

	useEffect(() => {
		if (searchParams.get("code"))
			getLineToken(lineConfig).then((credential) =>
				onSigninHandle(SIGNIN_CHANNEL_LINE, credential)
			);
	});

	const app = (
		<>
			<Button
				className="border-0"
				href={`https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${lineSignin.client_id}&redirect_uri=${lineSignin.redirect_uri}&state=12345abcde&scope=profile%20openid%20email&nonce=09876xyz`}
			>
				{image({
					src: svgLineLogo,
					className: "custom-center d-block p-0",
					width: 36,
				})}
			</Button>
		</>
	);
	return app;
}

export default LineSignin;

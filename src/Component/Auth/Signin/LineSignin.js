import { Button } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { devEnv, localEnv, svgLineLogo } from "../../../Assest/Env";
import { FORWARD_SUCCESS, SIGNIN_CHANNEL_LINE } from "../../../Util/ConstVar";
import useImage from "../../Hook/useImage";
import { errorMessage } from "../../Hook/useMessage";
import useSignin from "../../Hook/useSignin";

function LineSignin() {
	const { image } = useImage();
	const [searchParams] = useSearchParams();
	const { onSigninHandle } = useSignin();

	const redirectUrl = new URL(
		localEnv
			? "http://localhost:3000/signin"
			: devEnv
			? "https://dev.searchforthai.com/signin"
			: "https://searchforthai.com/signin"
	);

	const lineConfig = {
		code: searchParams.get("code"),
		redirect_uri: redirectUrl || "",
		client_id: "2001417253",
		client_secret: "eb28b8c4d70a46f74a39b3b913be7096",
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
				if (!data?.email) errorMessage("Missing email address. Login Failed!");
				return Promise.resolve(data);
			});
	};

	useEffect(() => {
		if (searchParams.get("code"))
			getLineToken(lineConfig).then((credential) =>
				onSigninHandle(SIGNIN_CHANNEL_LINE, credential, true, FORWARD_SUCCESS)
			);
	});

	const app = (
		<>
			<Button
				className="border-0"
				href={`https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2001417253&redirect_uri=${redirectUrl}&state=12345abcde&scope=profile%20openid%20email&nonce=09876xyz`}
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

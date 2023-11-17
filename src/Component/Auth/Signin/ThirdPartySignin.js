import { Flex } from "antd";
import AppleSignin from "./AppleSignin";
import FacebookSignin from "./FacebookSignin";
import GoogleSignin from "./GoogleSignin";
import LineSignin from "./LineSignin";

function ThirdPartySignin() {
	const app = (
		<>
			<Flex gap="large" justify="space-around">
				<FacebookSignin />
				<GoogleSignin />
				<AppleSignin />
				<LineSignin />
			</Flex>
		</>
	);

	return app;
}

export default ThirdPartySignin;

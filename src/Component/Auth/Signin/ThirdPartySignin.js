import { Flex } from "antd";
import AppleSignin from "./AppleSignin";
import FacebookSignin from "./FacebookSignin";
import GoogleSignin from "./GoogleSignin";
import LineSignin from "./LineSignin";

function ThirdPartySignin() {
	const App = () => (
		<>
			<Flex gap="large" justify="space-around">
				<FacebookSignin />
				<GoogleSignin />
				<AppleSignin />
				<LineSignin />
			</Flex>
		</>
	);

	return <App />;
}

export default ThirdPartySignin;

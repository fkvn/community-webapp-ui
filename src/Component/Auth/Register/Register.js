import { Flex } from "antd";
import { svgLoginPic } from "../../../Assest/Asset";

function Register() {
	const app = (
		<Flex id="forgot-password" justify="space-between">
			<img
				alt="avatar"
				src={svgLoginPic}
				style={{
					minHeight: "100vh",
				}}
			/>
			<Flex justify="center" className="w-100">
				<Flex
					vertical
					gap="large"
					style={{
						padding: "0 5rem",
						paddingTop: "3rem",
					}}
				>
					Register
				</Flex>
			</Flex>
		</Flex>
	);
	return app;
}

export default Register;

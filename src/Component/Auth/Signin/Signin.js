import { Col, Divider, Flex, Row, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { svgLoginPic } from "../../../Assest/Asset";
import { REGISTER_PATH } from "../../../Util/ConstVar";
import ThaiNowSignin from "./ThaiNowSignin";
import ThirdPartySignin from "./ThirdPartySignin";

function Signin() {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const Title = () => (
		<Typography.Title
			level={3}
			className="text-center"
			style={{ textTransform: "capitalize" }}
		>
			{t("signin_msg")}
			<span className="px-2" style={{ color: "#E94833" }}>
				ThaiNow
			</span>
			{t("account_msg")}
		</Typography.Title>
	);

	const NoAccountMessage = () => (
		<Row justify="center">
			<Col>
				<Space size={10} style={{ fontSize: "1rem" }}>
					<div style={{ textTransform: "capitalize" }}>
						{t("q_do_not_have_account_msg")}
					</div>
					<Typography.Link
						underline
						onClick={() => navigate(REGISTER_PATH)}
						style={{ fontSize: "1rem", textTransform: "capitalize" }}
					>
						{t("register_now_msg")}
					</Typography.Link>
				</Space>
			</Col>
		</Row>
	);

	const app = (
		<Row id="user-signin">
			<Col
				lg={12}
				style={{
					backgroundImage: `url(${svgLoginPic})`,
					backgroundRepeat: "cover",
					// 61px is the height of the header, minus footer if needed
					minHeight: "calc(100vh - 61px)",
				}}
			/>
			<Col xs={24} lg={12} className="bg-white ">
				<Flex
					vertical
					gap="large"
					justify="space-between"
					style={{
						padding: "0 10rem",
						paddingTop: "5rem",
					}}
				>
					<Title />
					<NoAccountMessage />
					<Divider orientation="left">
						<span style={{ textTransform: "capitalize" }}>
							{t("continue_with_msg")}{" "}
						</span>
					</Divider>
					<ThirdPartySignin />
					<Divider>
						<span style={{ textTransform: "uppercase" }}>{t("or_msg")}</span>
					</Divider>
					<ThaiNowSignin />
				</Flex>
			</Col>
		</Row>
	);

	return app;
}

export default Signin;

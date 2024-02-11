import { Divider, Flex, Image, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import { svgLoginPic } from "../../../../Asset/Asset";
import {
	REDIRECT_URI,
	SIGN_IN_PATH,
	SIGN_UP_PATH,
} from "../../../../Util/ConstVar";
import ThaiNowSignin from "../../../Auth/Signin/ThaiNowSignin";
import ThirdPartySignin from "../../../Auth/Signin/ThirdPartySignin";
import TermAgreement from "../../../Form/TermAgreement";
import useAuth from "../../../Hook/AuthHook/useAuth";
import FormPageHeader from "../../MainLayout/Header/FormPageHeader";

function Signin() {
	const [params] = useSearchParams();
	const redirectUri = params.get(REDIRECT_URI) || "";
	const { t } = useTranslation();

	const { auth } = useAuth();
	const [notSignedIn, setNotSignedIn] = useState(false);

	const Title = () => (
		<Typography.Title
			level={3}
			className="text-center"
			style={{
				textTransform: "capitalize",
				minWidth: "30rem",
				fontSize: "1.5rem ",
			}}
		>
			{t("signin_msg")}
			<span className="px-2" style={{ fontSize: "1.5rem ", color: "#E94833" }}>
				ThaiNow
			</span>
			{t("account_msg")}
		</Typography.Title>
	);

	const NoAccountMessage = () => (
		<Flex justify="center" gap={10}>
			<Typography.Text
				style={{ fontSize: "1rem", textTransform: "capitalize" }}
			>
				{t("q_do_not_have_account_msg")}?
			</Typography.Text>
			<Link
				to={`${SIGN_UP_PATH}?${REDIRECT_URI}=${
					redirectUri || SIGN_IN_PATH.slice(1)
				}`}
			>
				{t("register_now_msg")}
			</Link>
		</Flex>
	);

	useEffect(() => {
		auth(false).catch(() => {
			setNotSignedIn(true);
		});
	}, []);

	const App = () =>
		notSignedIn && (
			<>
				<FormPageHeader />
				<Flex gap={100}>
					<Image
						src={svgLoginPic}
						style={{
							maxWidth: "45vw",
							overflow: "hidden",
							height: "100vh",
							objectFit: "cover",
						}}
					/>
					<Flex
						vertical
						className="m-5"
						style={{
							minWidth: "20rem",
							padding: "0 5rem",
							paddingTop: "3rem",
						}}
						gap={20}
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
						<TermAgreement />
					</Flex>
				</Flex>
			</>
		);

	return <App />;
}

export default Signin;

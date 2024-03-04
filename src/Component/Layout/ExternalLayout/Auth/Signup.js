import { Flex, Form, Grid, Image, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import Title from "antd/lib/typography/Title";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import { svgLoginPic } from "../../../../Asset/Asset";
import {
	EMAIL_PROP,
	FIRSTNAME_PROP,
	LASTNAME_PROP,
	PASSWORD_PROP,
	REDIRECT_URI,
	SIGN_IN_PATH,
} from "../../../../Util/ConstVar";
import EmailFormControl from "../../../Form/EmailFormControl";
import PasswordFormControl from "../../../Form/PasswordFormControl";
import SubmitBtnFormControl from "../../../Form/SubmitBtnFormControl";
import TermAgreement from "../../../Form/TermAgreement";
import TextFormControl from "../../../Form/TextFormControl";
import useAuth from "../../../Hook/AuthHook/useAuth";
import FormPageHeader from "../../MainLayout/Header/FormPageHeader";

function Signup() {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();
	const [form] = useForm();
	const { t } = useTranslation();

	const [params] = useSearchParams();
	const redirectUri = params.get(REDIRECT_URI) || "";

	const [signingup, setSigningup] = useState(false);

	const { signup } = useAuth();

	const AlreadyHasAccountMessage = () => (
		<Flex justify="center" gap={10}>
			<Typography.Text
				style={{ fontSize: "1rem", textTransform: "capitalize" }}
			>
				{t("q_already_has_account_msg")}?
			</Typography.Text>
			<Link
				to={`${SIGN_IN_PATH}?${REDIRECT_URI}=${
					redirectUri === SIGN_IN_PATH.slice(1) ? "" : redirectUri
				}`}
			>
				{t("signin_msg")}
			</Link>
		</Flex>
	);

	const onFinishHandle = () => {
		setSigningup(true);

		const payload = {
			[`${FIRSTNAME_PROP}`]: form.getFieldValue(FIRSTNAME_PROP),
			[`${LASTNAME_PROP}`]: form.getFieldValue(LASTNAME_PROP),
			[`${EMAIL_PROP}`]: form.getFieldValue(EMAIL_PROP),
			[`${PASSWORD_PROP}`]: form.getFieldValue(PASSWORD_PROP),
		};

		form
			.validateFields()
			.then(() => signup(EMAIL_PROP, payload).catch(() => setSigningup(false)))
			.catch(() => {});
	};

	const App = () => (
		<>
			<FormPageHeader />
			<Flex
				gap={screens.xxl ? 100 : 0}
				justify={screens.lg ? "flex-start" : "center"}
			>
				{screens.lg && (
					<Image
						src={svgLoginPic}
						style={{
							maxWidth: "45vw",
							overflow: "hidden",
							height: "100vh",
							objectFit: "cover",
						}}
					/>
				)}
				<Flex
					vertical
					className=" w-100"
					style={{
						minWidth: "20rem",
						maxWidth: "40rem",
						padding: screens.md ? "0 5rem" : "2rem",
						paddingTop: "3rem",
						margin: screens.xxl ? "5rem" : "1rem",
					}}
					gap={20}
				>
					<Title
						level={3}
						className="text-center"
						style={{
							textTransform: "capitalize",
						}}
					>
						{t("signup_msg")}
						<span
							className="px-2"
							style={{ color: "#E94833", fontSize: "1.5rem" }}
						>
							ThaiNow
						</span>
						{t("account_msg")}
					</Title>
					<AlreadyHasAccountMessage />
					<Form
						id="user-signup-form"
						form={form}
						layout="vertical"
						className="mt-4"
						autoComplete="off"
						style={{
							minWidth: screens.md ? "25rem" : "10rem",
						}}
						onFinish={onFinishHandle}
					>
						<Flex vertical gap="large">
							<TextFormControl
								itemProps={{
									label: t("first_name_msg"),
									itemName: FIRSTNAME_PROP,
								}}
							/>
							<TextFormControl
								itemProps={{
									label: t("last_name_msg"),
									itemName: LASTNAME_PROP,
								}}
							/>
							<EmailFormControl />
							<PasswordFormControl withConfirmPassword={false} />
							<SubmitBtnFormControl
								className="my-4"
								title={t("signup_msg")}
								btnProps={{
									htmlType: "submit",
								}}
								loading={signingup}
								disabled={signingup}
							/>
							<TermAgreement />
						</Flex>
					</Form>
				</Flex>
			</Flex>
		</>
	);
	return <App />;
}

export default Signup;

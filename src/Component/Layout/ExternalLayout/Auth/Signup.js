import { Col, Flex, Form, Row, Space, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
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
	const [form] = useForm();
	const { t } = useTranslation();

	const navigate = useNavigate();
	const [params] = useSearchParams();
	const redirectUri = params.get(REDIRECT_URI) || "";

	const [signingup, setSigningup] = useState(false);

	const { signup } = useAuth();

	const Title = () => (
		<Typography.Title
			level={3}
			className="text-center"
			style={{
				textTransform: "capitalize",
				minWidth: "30rem",
			}}
		>
			{t("signup_msg")}
			<span className="px-2" style={{ color: "#E94833", fontSize: "1.5rem" }}>
				ThaiNow
			</span>
			{t("account_msg")}
		</Typography.Title>
	);

	const AlreadyHasAccountMessage = () => (
		<Row justify="center">
			<Col>
				<Space size={10} style={{ fontSize: "1rem" }}>
					<div style={{ textTransform: "capitalize" }}>
						{t("q_already_has_account_msg")}?
					</div>
					<Typography.Link
						underline
						onClick={() =>
							navigate(
								`${SIGN_IN_PATH}?${REDIRECT_URI}=${
									redirectUri === SIGN_IN_PATH.slice(1) ? "" : redirectUri
								}`
							)
						}
						style={{ fontSize: "1rem", textTransform: "capitalize" }}
					>
						{t("signin_msg")}
					</Typography.Link>
				</Space>
			</Col>
		</Row>
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
			<Row>
				<Col
					xs={0}
					lg={12}
					style={{
						backgroundImage: `url(${svgLoginPic})`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						height: "100vh",
					}}
				/>
				<Col xs={24} lg={12}>
					<Flex justify="center" className="w-100">
						<Flex
							vertical
							gap="large"
							style={{
								padding: "0 5rem",
								paddingTop: "3rem",
							}}
						>
							<Title />
							<AlreadyHasAccountMessage />
							<Form
								id="user-signup-form"
								form={form}
								layout="vertical"
								autoComplete="off"
								style={{
									minWidth: "25rem",
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
				</Col>
			</Row>
		</>
	);
	return <App />;
}

export default Signup;

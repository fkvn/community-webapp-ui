import { Collapse, Divider, Flex, Form, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import Title from "antd/lib/typography/Title";
import parse from "html-react-parser";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { emailContactAxios } from "../../../Axios/utilAxios";
import {
	DESCRIPTION_PROP,
	EMAIL_PROP,
	SUPPORT_EMAIL,
	USERNAME_PROP,
} from "../../../Util/ConstVar";
import BreadcrumbContainer from "../../Breadcrumb/BreadcrumbContainer";
import EmailFormControl from "../../Form/EmailFormControl";
import SubmitBtnFormControl from "../../Form/SubmitBtnFormControl";
import TextAreaFormControl from "../../Form/TextAreaFormControl";
import TextFormControl from "../../Form/TextFormControl";
import useMessage from "../../Hook/MessageHook/useMessage";

function HelpCenter() {
	const { t } = useTranslation(["Help Center", "Form", "Default"]);
	const { successMessage, errorMessage } = useMessage();
	const [form] = useForm();

	const [activeQuestion, setActiveQuestion] = useState([]);
	const [sendingMsg, setSendingMsg] = useState(false);

	const faqQuestions = Array.from(
		{
			// number of loading questions in sequence
			length: 3,
		},
		(x, i) => i + 1
	)
		.reduce(
			(res, cur) => [
				...res,
				{
					qs: `qs_${cur}_msg`,
					ans: `qs_${cur}_msg_ans`,
				},
			],
			[]
		)
		.map((v, idx) => {
			return {
				key: `${idx}`,
				label: t(v?.qs),
				children: (
					<>
						<Divider className="p-0 m-0 mb-3" /> {parse(t(v?.ans))}
					</>
				),
				style: {
					margin: "1rem 0 ",
					...(activeQuestion.includes(`${idx}`)
						? { background: "#F7F7FC" }
						: {}),
				},
			};
		});

	const CollapseFAQ = () => (
		<Collapse
			activeKey={activeQuestion}
			className="w-75"
			expandIconPosition="end"
			onChange={(key) => setActiveQuestion(key)}
			ghost
			items={faqQuestions}
		/>
	);

	const FAQSection = () => (
		<Flex
			justify="start"
			align="center"
			className="p-5 p-lg-5 bg-white"
			vertical
			style={{
				paddingTop: "2rem",
				minHeight: "20rem",
			}}
		>
			<Flex
				className="w-100 "
				style={{
					maxWidth: "90rem",
				}}
				vertical
				gap={20}
			>
				<Flex justify="space-start" wrap="wrap">
					<BreadcrumbContainer />
				</Flex>

				<Flex align="center" className="w-100" vertical>
					<Title level={2} className="text-primary">
						{t("title_msg")}
					</Title>
					<CollapseFAQ />
				</Flex>
			</Flex>
		</Flex>
	);

	const onSubmitHandle = () => {
		setSendingMsg(true);
		form
			.validateFields()
			.then(() => {
				const request = {
					recipient: form.getFieldValue(EMAIL_PROP) || "",
					subject: `Message for you: 1 Email Contact Request from ${
						form.getFieldValue(USERNAME_PROP) || ""
					}`,
					msgBody: form.getFieldValue(DESCRIPTION_PROP),
				};

				emailContactAxios(request)
					.then((res) =>
						res
							? successMessage("message_contact_success_msg").then(() => {
									setSendingMsg(false);
									form.resetFields();
							  })
							: errorMessage().then(() => setSendingMsg(false))
					)
					.catch((e) => errorMessage(e).then(() => setSendingMsg(false)));
			})
			.catch(() => setSendingMsg(false));
	};

	const ContactForm = () => (
		<Form form={form} layout="vertical">
			<Flex
				style={{
					width: "25rem",
				}}
				vertical
				gap={20}
			>
				<TextFormControl
					itemProps={{
						itemName: USERNAME_PROP,
						label: t("name_msg", { ns: "Default" }),
					}}
					inputProps={{
						placeholder: t("form_enter_here_msg", {
							ns: "Form",
						}),
					}}
				/>
				<EmailFormControl />

				<TextAreaFormControl
					itemProps={{
						itemName: DESCRIPTION_PROP,
						label: t("how_can_we_help_you_msg"),
					}}
					inputProps={{
						placeholder: t("form_enter_here_msg", {
							ns: "Form",
						}),
					}}
					required={true}
				/>

				<SubmitBtnFormControl
					disabled={sendingMsg}
					loading={sendingMsg}
					className="my-3"
					onClick={onSubmitHandle}
				/>
			</Flex>{" "}
		</Form>
	);

	const ContactSection = () => (
		<Flex
			justify="start"
			align="center"
			className="p-5 p-lg-5"
			vertical
			style={{
				paddingTop: "2rem",
				minHeight: "20rem",
			}}
		>
			<Flex
				style={{
					width: "75%",
					maxWidth: "90rem",
				}}
				justify="center"
				gap={40}
				wrap="wrap"
			>
				<Flex
					style={{
						maxWidth: "30rem",
					}}
					vertical
				>
					<Title>{t("get_in_touch_msg")}</Title>

					<Typography style={{ fontSize: "1rem" }}>
						<Trans
							i18nKey={"get_in_touch_msg_message"}
							ns="Help Center"
							components={{
								Email: (
									<a href={`mailto:${SUPPORT_EMAIL}`}> {SUPPORT_EMAIL} </a>
								),
							}}
						/>
					</Typography>
				</Flex>

				<ContactForm />
			</Flex>
		</Flex>
	);

	const App = () => (
		<>
			<FAQSection />
			<ContactSection />
		</>
	);
	return <App />;
}

export default HelpCenter;

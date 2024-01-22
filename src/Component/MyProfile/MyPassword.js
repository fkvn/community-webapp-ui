import { Flex, Form, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import Title from "antd/lib/typography/Title";
import { useTranslation } from "react-i18next";
import { CURRENT_PASSWORD_PROP, PASSWORD_PROP } from "../../Util/ConstVar";
import PasswordFormControl from "../Form/PasswordFormControl";
import SubmitBtnFormControl from "../Form/SubmitBtnFormControl";

/**
 *
 * @field credentials {PASSWORD_PROP, CURRENT_PASSWORD_PROP}
 * @returns
 */
function MyPassword({
	changePassword = async (_accountId, _credentials) => {},
}) {
	const { t } = useTranslation(["Password"]);
	const [form] = useForm();

	const Header = () => (
		<Typography>
			<Title level={2}>{t("password_msg_new")}</Title>
		</Typography>
	);

	const updatePasswordHandle = () => {
		form
			.validateFields()
			.then(() => {
				const credentials = {
					[`${PASSWORD_PROP}`]: form.getFieldValue(PASSWORD_PROP),
					[`${CURRENT_PASSWORD_PROP}`]: form.getFieldValue(
						CURRENT_PASSWORD_PROP
					),
				};
				changePassword(credentials)
					.then(() => form.resetFields())
					.catch(() => {});
			})
			.catch(() => {});
	};

	const PasswordUpdateForm = () => (
		<Form
			form={form}
			id="my-password-form"
			layout="vertical"
			initialValues={{}}
		>
			<Flex vertical gap="large" className="my-4">
				<PasswordFormControl
					itemProps={{
						itemName: CURRENT_PASSWORD_PROP,
						className: "my-0",
						style: {
							minWidth: 400,
							maxWidth: "100%",
							marginRight: 20,
						},
						label: t("password_msg_current"),
					}}
					withConfirmPassword={false}
				/>

				<PasswordFormControl
					newPasswordForm={true}
					itemProps={{
						className: "my-0",
						style: {
							minWidth: 400,
							maxWidth: "100%",
							marginRight: 20,
						},
					}}
					confirmPasswordProps={{
						className: "my-0",
						style: {
							minWidth: 400,
							maxWidth: "100%",
							marginRight: 20,
						},
					}}
					flexProp={{
						gap: 30,
						vertical: true,
						align: "start",
					}}
				/>

				<SubmitBtnFormControl
					title="Save"
					className="mt-5"
					style={{
						maxWidth: 400,
					}}
					onClick={updatePasswordHandle}
				/>
			</Flex>
		</Form>
	);

	const App = () => (
		<>
			<Header />
			<PasswordUpdateForm />
		</>
	);
	return <App />;
}

export default MyPassword;

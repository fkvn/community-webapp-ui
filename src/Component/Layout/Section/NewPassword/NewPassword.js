import { Flex, Form, Grid, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import Title from "antd/lib/typography/Title";
import { useTranslation } from "react-i18next";
import {
	CURRENT_PASSWORD_PROP,
	PASSWORD_PROP,
} from "../../../../Util/ConstVar";
import PasswordFormControl from "../../../Form/PasswordFormControl";
import SubmitBtnFormControl from "../../../Form/SubmitBtnFormControl";

/**
 *
 * @field credentials {PASSWORD_PROP, CURRENT_PASSWORD_PROP}
 * @returns
 */
function NewPassword({
	changePassword = async (_accountId, _credentials) => {},
}) {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

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
			style={{
				minWidth: screens.md ? "25rem" : "10rem",
			}}
		>
			<Flex vertical gap="large" className="w-100  my-4">
				<PasswordFormControl
					itemProps={{
						itemName: CURRENT_PASSWORD_PROP,
						className: "m-0",
						style: {
							minWidth: screens.lg ? "27rem" : "100%",
						},
						label: t("password_msg_current"),
					}}
					withConfirmPassword={false}
				/>

				<PasswordFormControl
					newPasswordForm={true}
					itemProps={{
						className: "m-0",
						style: {
							minWidth: screens.lg ? "27rem" : "100%",
						},
					}}
					confirmPasswordProps={{
						className: "m-0",
						style: {
							minWidth: screens.lg ? "27rem" : "100%",
						},
					}}
					flexProp={{
						gap: 30,
						vertical: true,
						align: "start",
					}}
				/>

				<SubmitBtnFormControl
					title={t("form_save_msg", { ns: "Form" })}
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

export default NewPassword;

import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { CONFIRM_PASSWORD_PROP, PASSWORD_PROP } from "../../Util/constVar";

function PasswordFormControl({
	newPasswordForm = false,
	itemProps: { itemName = PASSWORD_PROP, label, ...itemProps } = {},
	inputProps = {},
	required = true,
	showLabel = true,
	withConfirmPassword = true,
	confirmPasswordProps: {
		confirmPasswordName = CONFIRM_PASSWORD_PROP,
		confirmPasswordLabel,
		...confirmPasswordProps
	} = {},
	confirmPasswordInputProps = {},
	showConfirmPasswordLabel = true,
} = {}) {
	const { t } = useTranslation(["Password", "Form"]);

	const App = () => (
		<>
			<Form.Item
				name={itemName}
				className="m-0"
				rules={[
					{
						required: true,
						message: t(`password_enter_msg${newPasswordForm ? "_new" : ""}`),
					},
					{
						pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,20}$/,
						message: t("password_restriction_msg"),
					},
				]}
				{...(showLabel && {
					label: `${
						label || t(`password_msg${newPasswordForm ? "_new" : ""}`)
					} ${required ? "" : `(${t("form_optional_msg", { ns: "Form" })})`}`,
				})}
				hasFeedback={true}
				shouldUpdate={true}
				{...itemProps}
			>
				<Input.Password
					allowClear
					autoComplete="false"
					placeholder={t(`password_enter_msg${newPasswordForm ? "_new" : ""}`)}
					{...inputProps}
				/>
			</Form.Item>
			{withConfirmPassword && (
				<Form.Item
					name={confirmPasswordName}
					dependencies={[itemName]}
					hasFeedback
					rules={[
						{
							required: true,
							message: t(
								`password_confirm_msg${newPasswordForm ? "_new" : ""}`
							),
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue(itemName) === value) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error(`${t("password_confirm_invalid_msg")}!`)
								);
							},
						}),
					]}
					{...(showConfirmPasswordLabel && {
						label: `${
							confirmPasswordLabel ||
							t(`password_confirm_msg${newPasswordForm ? "_new" : ""}`)
						}`,
					})}
					{...confirmPasswordProps}
				>
					<Input.Password
						allowClear
						autoComplete="false"
						placeholder={t(
							`password_confirm_enter_msg${newPasswordForm ? "_new" : ""}`
						)}
						{...confirmPasswordInputProps}
					/>
				</Form.Item>
			)}
		</>
	);

	return <App />;
}

export default PasswordFormControl;

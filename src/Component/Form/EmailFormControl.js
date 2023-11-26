import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { EMAIL_PROP } from "../../Util/constVar";

function EmailFormControl({
	itemProps: { itemName = EMAIL_PROP, label, ...itemProps } = {},
	inputProps = {},
	required = true,
	showLabel = true,
} = {}) {
	const { t } = useTranslation(["Email", "Form"]);

	const App = () => (
		<>
			<Form.Item
				name={itemName}
				className="m-0"
				rules={[
					{
						type: "email",
						message: t("email_invalid_msg"),
					},
					{
						required: required,
						message: t("form_required_msg", { ns: "Form" }),
					},
				]}
				{...(showLabel && {
					label: `${label || t("email_address_msg")} ${
						required ? "" : `(${t("form_optional_msg", { ns: "Form" })})`
					}`,
				})}
				{...itemProps}
			>
				<Input allowClear placeholder={t("email_enter_msg")} {...inputProps} />
			</Form.Item>
		</>
	);
	return <App />;
}

export default EmailFormControl;

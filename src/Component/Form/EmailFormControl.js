import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { EMAIL_PROP } from "../../Util/ConstVar";
import { formatString } from "../../Util/Util";

function EmailFormControl({
	itemProps: { itemName = EMAIL_PROP, label, ...itemProps } = {},
	inputProps = {},
	required = true,
	showLabel = true,
} = {}) {
	const { t } = useTranslation(["Email", "Form"]);

	const app = (
		<>
			<Form.Item
				name={itemName}
				className="m-0"
				rules={[
					{
						type: "email",
						message: formatString(t("email_invalid_msg"), "sentencecase"),
					},
					{
						required: required,
						message: formatString(t("email_enter_msg"), "sentencecase"),
					},
				]}
				{...(showLabel && {
					label: `${
						label || formatString(t("email_address_msg"), "capitalize")
					} ${required ? "" : `(${t("form_optional_msg", { ns: "Form" })})`}`,
				})}
				{...itemProps}
			>
				<Input
					allowClear
					placeholder={formatString(t("email_enter_msg"), "sentencecase")}
					{...inputProps}
				/>
			</Form.Item>
		</>
	);
	return app;
}

export default EmailFormControl;

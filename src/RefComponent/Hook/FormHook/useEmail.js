import { Form, Input } from "antd";
import { t } from "i18next";
import { EMAIL_PROP } from "../../../Util/ConstVar";
import { formatString } from "../../../Util/Util";

const useEmail = ({
	itemProps = {},
	inputProps = {},
	required = true,
	showLabel = true,
} = {}) =>
	((props = {}, inputProps = {}) => (
		<Form.Item {...props}>
			<Input {...inputProps} />
		</Form.Item>
	))(
		{
			name: EMAIL_PROP,
			className: "m-0",
			rules: [
				{
					type: "email",
					message: formatString(t("email_invalid_msg"), "sentencecase"),
				},
				{
					required: required,
					message: formatString(t("email_enter_msg"), "sentencecase"),
				},
			],
			...itemProps,
			...(showLabel && {
				label: `${
					itemProps?.label || formatString(t("email_address_msg"), "capitalize")
				} ${required ? "" : `(${t("form_optional_msg")})`}`,
			}),
		},
		{
			placeholder: formatString(t("email_enter_msg"), "sentencecase"),
			...inputProps,
		}
	);

export default useEmail;

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
					message: formatString(t("invalid_email_address_msg"), "sentencecase"),
				},
				{
					required: required,
					message: formatString(t("enter_email_address_msg"), "sentencecase"),
				},
			],
			...itemProps,
			...(showLabel && {
				label: `${
					itemProps?.label || formatString(t("email_address_msg"), "capitalize")
				} ${required ? "" : `(${t("optional_msg")})`}`,
			}),
		},
		{
			placeholder: formatString(t("enter_email_address_msg"), "sentencecase"),
			...inputProps,
		}
	);

export default useEmail;

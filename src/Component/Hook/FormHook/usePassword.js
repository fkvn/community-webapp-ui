import { Form, Input } from "antd";
import { t } from "i18next";
import { PASSWORD_PROP } from "../../../Util/ConstVar";
import { formatString } from "../../../Util/Util";

const usePassword = (itemProps = {}, inputProps = {}) =>
	((props = {}, inputProps = {}) => (
		<Form.Item {...props}>
			<Input.Password autoComplete="false" {...inputProps} />
		</Form.Item>
	))(
		{
			label: formatString(t("password_msg"), "capitalize"),
			className: "m-0",
			name: PASSWORD_PROP,
			rules: [
				{
					required: true,
					message: formatString(t("enter_password_msg"), "sentencecase"),
				},
				{
					pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,20}$/,
					message: t("password_restriction_msg"),
				},
			],
			hasFeedback: true,
			shouldUpdate: true,
			...itemProps,
		},
		{
			placeholder: formatString(t("enter_password_msg"), "sentencecase"),
			...inputProps,
		}
	);

export default usePassword;

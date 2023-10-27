import { Form, Input } from "antd";
import { EMAIL_PROP } from "../../../Util/ConstVar";

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
					message: "The input is not valid E-mail!",
				},
				{
					required: required,
					message: "Please input your E-mail!",
				},
			],
			...itemProps,
			...(showLabel && {
				label: `${itemProps?.label || "Email Address"} ${
					required ? "" : "(Optional)"
				}`,
			}),
		},
		{
			placeholder: "Enter your email address",
			...inputProps,
		}
	);

export default useEmail;

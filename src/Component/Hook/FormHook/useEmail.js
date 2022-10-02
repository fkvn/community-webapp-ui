import { Form, Input } from "antd";
import { EMAIL_PROP } from "../../../Util/ConstVar";

const useEmail = (itemProps = {}, inputProps = {}, required = true) =>
	((props = {}, inputProps = {}) => (
		<Form.Item {...props}>
			<Input {...inputProps} />
		</Form.Item>
	))(
		{
			name: EMAIL_PROP,
			label: "Email Address",
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
		},
		{
			placeholder: "Enter your email address",
			...inputProps,
		}
	);

export default useEmail;
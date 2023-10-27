import { Form, Input } from "antd";
import { PASSWORD_PROP } from "../../../Util/ConstVar";

const usePassword = (itemProps = {}, inputProps = {}) =>
	((props = {}, inputProps = {}) => (
		<Form.Item {...props}>
			<Input.Password autoComplete="false" {...inputProps} />
		</Form.Item>
	))(
		{
			label: "Password",
			className: "m-0",
			name: PASSWORD_PROP,
			rules: [
				{ required: true, message: "Please input your password!" },
				{
					pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,20}$/,
					message:
						"Use 8 to 20 characters with 1 uppercase, 1 lowercase, and 1 number ",
				},
			],
			hasFeedback: true,
			shouldUpdate: true,
			...itemProps,
		},
		{
			placeholder: "Enter password",
			...inputProps,
		}
	);

export default usePassword;

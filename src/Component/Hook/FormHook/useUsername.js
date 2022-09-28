import { Form, Input } from "antd";
import { USERNAME_PROP } from "../../../Util/ConstVar";

const useUsername = (itemProps = {}, inputProps = {}) =>
	((props = {}, inputProps = {}) => (
		<Form.Item {...props}>
			<Input {...inputProps} />
		</Form.Item>
	))(
		{
			name: USERNAME_PROP,
			label: "What should we call you?",
			className: "m-0",
			rules: [{ required: true, message: "Name is required" }],
			...itemProps,
		},
		{
			placeholder: "Preferred Name",
			...inputProps,
		}
	);

export default useUsername;

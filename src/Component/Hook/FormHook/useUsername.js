import { Form, Input } from "antd";
import { USERNAME_PROP } from "../../../Util/ConstVar";

const useUsername = (itemProps = {}, inputProps = {}, required = true) =>
	((props = {}, inputProps = {}) => (
		<Form.Item {...props}>
			<Input {...inputProps} />
		</Form.Item>
	))(
		{
			name: USERNAME_PROP,
			className: "m-0",
			rules: [{ required: required, message: "Name is required" }],
			...itemProps,
			label: `${itemProps?.label || "Username"} ${
				required ? "" : "(Optional)"
			}`,
		},
		{
			placeholder: "Preferred Name",
			...inputProps,
		}
	);

export default useUsername;

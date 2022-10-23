import { Checkbox, Form } from "antd";
import { CHECKBOX_PROP } from "../../../Util/ConstVar";

const useCheckBox = ({
	itemProps = {},
	inputProps = {},
	title = "",
	required = false,
}) =>
	((props = {}, inputProps = {}, title = "") => (
		<Form.Item {...props} valuePropName="checked">
			<Checkbox {...inputProps}>{title}</Checkbox>
		</Form.Item>
	))(
		{
			name: CHECKBOX_PROP,
			className: "m-0",
			rules: [{ required: required, message: "Must accept" }],
			...itemProps,
		},
		inputProps,
		`${title} ${required ? "" : "(Optional)"}`
	);

export default useCheckBox;

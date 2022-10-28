import { Checkbox, Form } from "antd";
import { CHECKBOX_PROP } from "../../../Util/ConstVar";

const useCheckBox = ({
	itemProps = {},
	inputProps = {},
	title = "",
	required = false,
	requiredMessage = "Must accept",
} = {}) =>
	((props = {}, inputProps = {}, title = "") => (
		<Form.Item {...props} valuePropName="checked">
			<Checkbox {...inputProps}>{title}</Checkbox>
		</Form.Item>
	))(
		{
			name: CHECKBOX_PROP,
			className: "m-0",
			...itemProps,
			rules: [
				{ required: required, message: requiredMessage },
				...(itemProps?.rules || []),
			],
		},
		inputProps,
		`${title} ${required ? "" : "(Optional)"}`
	);

export default useCheckBox;

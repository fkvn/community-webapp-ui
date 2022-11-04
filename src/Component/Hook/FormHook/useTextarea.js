import { Form, Input } from "antd";
import { DESCRIPTION_PROP } from "../../../Util/ConstVar";

const useTextarea = ({
	itemProps = {},
	inputProps = {},
	required = false,
	showLabel = true,
} = {}) =>
	((props = {}, inputProps = {}) => (
		<Form.Item {...props}>
			<Input.TextArea showCount maxLength={250} {...inputProps} />
		</Form.Item>
	))(
		{
			name: DESCRIPTION_PROP,
			className: "m-0",
			rules: [{ required: required, message: "Please input description" }],
			...itemProps,
			...(showLabel && {
				label: `${itemProps?.label || "Description"} ${
					required ? "" : "(Optional)"
				}`,
			}),
		},
		{
			placeholder: "Let people understand more about you",
			...inputProps,
		}
	);

export default useTextarea;

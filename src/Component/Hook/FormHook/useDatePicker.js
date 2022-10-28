import { DatePicker, Form } from "antd";
import { DATE_PROP } from "../../../Util/ConstVar";

const useDatePicker = ({ itemProps = {}, inputProps = {}, required = false }) =>
	((props = {}, inputProps = {}) => (
		<Form.Item {...props}>
			<DatePicker {...inputProps} />
		</Form.Item>
	))(
		{
			name: DATE_PROP,
			className: "m-0",
			rules: [{ required: required, message: "Please select a date" }],
			...itemProps,
			label: `${itemProps?.label || "Date"} ${required ? "" : "(Optional)"}`,
		},
		{
			...inputProps,
		}
	);

export default useDatePicker;

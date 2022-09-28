import { Form, Input } from "antd";
import { PHONE_PROP } from "../../../Util/ConstVar";
import { formatPhoneNumber } from "../../../Util/Util";

const usePhone = (itemProps = {}, inputProps = {}) =>
	((props = {}, inputProps = {}) => (
		<Form.Item {...props}>
			<Input {...inputProps} />
		</Form.Item>
	))(
		{
			name: PHONE_PROP,
			label: "Phone Number (US)",
			className: "m-0",
			normalize: (value) => formatPhoneNumber(value),
			rules: [
				{ required: true, message: "Please input your phone number!" },
				{
					min: 14,
					max: 14,
					message: "Please input a valid US phone number",
				},
			],
			...itemProps,
		},
		{
			placeholder: "Enter your phone number",
			addonBefore: "+1",
			maxLength: 14,
			...inputProps,
		}
	);

export default usePhone;

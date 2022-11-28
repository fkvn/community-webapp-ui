import { Form, Input } from "antd";
import { OTP_PROP } from "../../../Util/ConstVar";
import { formatOtpNumber } from "../../../Util/Util";

const useOtp = (itemProps = {}, inputProps = {}) =>
	((props = {}, inputProps = {}) => (
		<Form.Item {...props}>
			<Input {...inputProps} />
		</Form.Item>
	))(
		{
			name: OTP_PROP,
			label: "OTP Verification Code (4-digits)",
			className: "m-0",
			normalize: (value) => {
				const [formattedValue] = formatOtpNumber(value);
				return formattedValue;
			},
			rules: [
				{
					validator: (_, value) =>
						value.replace(/[^\d]/g, "").length === 4
							? Promise.resolve()
							: Promise.reject(
									new Error("Verification code must have 4-digits!")
							  ),
				},
			],
			...itemProps,
		},
		{
			placeholder: "Enter 4-digits OTP code",
			maxLength: 7,
			...inputProps,
		}
	);

export default useOtp;

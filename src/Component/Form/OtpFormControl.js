import { Form, InputNumber } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { OTP_PROP } from "../../Util/ConstVar";
import { formatString } from "../../Util/Util";

function OtpFormControl({
	itemProps: { itemName = OTP_PROP, label, ...itemProps } = {},
	inputProps = {},
	required = true,
	showLabel = true,
	allowedDigit = 4,
} = {}) {
	const { t } = useTranslation(["Otp", "Form"]);

	const formatOtpNumber = (value = "") => {
		let otp = value.replace(/[^\d]/g, "");

		// clean the input for any non-digit values.
		let formattedOtp = ``;

		if (otp.length > 0 && otp.length <= allowedDigit) {
			const otpLength = otp.length;

			if (otpLength === 1) formattedOtp = otp;
			else {
				// formatting
				for (let otpLength = 2; otpLength <= otp.length; otpLength++) {
					formattedOtp = "";
					for (let length = 1; length <= otpLength; length++) {
						formattedOtp += `${otp.slice(length - 1, length)}${
							length === allowedDigit ? "" : " "
						}`;
					}
				}
			}
		}

		return [formattedOtp, otp];
	};

	const app = (
		<>
			<Form.Item
				name={itemName}
				className="m-0"
				rules={[
					{
						validator: (_, value) => {
							return value && value.toString().length === allowedDigit
								? Promise.resolve()
								: Promise.reject(
										new Error(
											t("otp_code_invalid_msg", { number: allowedDigit })
										)
								  );
						},
					},
				]}
				{...(showLabel && {
					label: `${label || formatString(t("otp_code_msg"), "capitalize")} ${
						required ? "" : `(${t("form_optional_msg", { ns: "Form" })})`
					}`,
				})}
				{...itemProps}
			>
				<InputNumber
					controls={false}
					keyboard={false}
					className="mb-2"
					// numOfDigits + numOfSpaces
					maxLength={2 * allowedDigit - 1}
					placeholder={formatString(t("otp_code_enter_msg"), "sentencecase")}
					formatter={(value) => {
						const [format] = formatOtpNumber(value);
						return format;
					}}
					{...inputProps}
				/>
			</Form.Item>
		</>
	);
	return app;
}

export default OtpFormControl;
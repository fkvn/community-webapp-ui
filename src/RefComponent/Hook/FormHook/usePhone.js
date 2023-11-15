import { Form, Input } from "antd";
import { t } from "i18next";
import { PHONE_PROP } from "../../../Util/ConstVar";
import { formatPhoneNumber, formatString } from "../../../Util/Util";

const usePhone = ({
	itemProps = {},
	inputProps = {},
	required = true,
	showLabel = true,
} = {}) =>
	((props = {}, inputProps = {}) => (
		<Form.Item {...props}>
			<Input {...inputProps} />
		</Form.Item>
	))(
		{
			name: PHONE_PROP,
			className: "m-0",
			normalize: (value) => formatPhoneNumber(value),
			rules: [
				{
					required: required,
					message: formatString(t("phone_enter_msg"), "sentencecase"),
				},
				{
					min: 14,
					max: 14,
					message: formatString(t("phone_invalid_msg"), "sentencecase"),
				},
			],
			...itemProps,
			...(showLabel && {
				label: `${
					itemProps?.label || formatString(t("phone_number_msg"), "cappitalize")
				} ${
					required ? "" : formatString(t("form_optional_msg"), "sentencecase")
				}`,
			}),
		},
		{
			placeholder: formatString(t("phone_enter_msg"), "sentencecase"),
			addonBefore: "+1",
			maxLength: 14,
			...inputProps,
		}
	);

export default usePhone;

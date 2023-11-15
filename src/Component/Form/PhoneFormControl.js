import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { PHONE_PROP } from "../../Util/ConstVar";
import { formatPhoneNumber, formatString } from "../../Util/Util";

function PhoneFormControl({
	itemProps: { itemName = PHONE_PROP, label, ...itemProps } = {},
	inputProps = {},
	required = true,
	showLabel = true,
}) {
	const { t } = useTranslation(["Phone", "Form"]);
	const app = (
		<>
			<Form.Item
				name={itemName}
				className="m-0"
				normalize={(value) => formatPhoneNumber(value)}
				rules={[
					{
						required: required,
						message: formatString(t("phone_enter_msg"), "sentencecase"),
					},
					{
						min: 14,
						max: 14,
						message: formatString(t("phone_invalid_msg"), "sentencecase"),
					},
				]}
				{...(showLabel && {
					label: `${
						label || formatString(t("phone_number_msg"), "cappitalize")
					} ${required ? "" : `(${t("form_optional_msg", { ns: "Form" })})`}`,
				})}
				{...itemProps}
			>
				<Input
					id="phone"
					allowClear
					placeholder={formatString(t("phone_enter_msg"), "sentencecase")}
					addonBefore="+1"
					maxLength={14}
					{...inputProps}
				/>
			</Form.Item>
		</>
	);
	return app;
}

export default PhoneFormControl;

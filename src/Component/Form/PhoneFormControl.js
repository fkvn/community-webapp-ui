import { Form, InputNumber } from "antd";
import { useTranslation } from "react-i18next";
import { PHONE_PROP } from "../../Util/ConstVar";
import { formatUSPhoneNumber } from "../../Util/Util";

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
				rules={[
					{
						validator: (_, value) => {
							return value && value.toString().length === 10
								? Promise.resolve()
								: Promise.reject(new Error(t("phone_invalid_msg")));
						},
					},
				]}
				{...(showLabel && {
					label: `${label || t("phone_number_msg")} ${
						required ? "" : `(${t("form_optional_msg", { ns: "Form" })})`
					}`,
				})}
				{...itemProps}
			>
				<InputNumber
					controls={false}
					keyboard={false}
					formatter={(value) => {
						const format = formatUSPhoneNumber(value);
						return format;
					}}
					parser={(value) => value.replace(/[^\d]/g, "")}
					placeholder={t("phone_enter_msg")}
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

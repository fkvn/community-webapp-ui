import { Form, InputNumber, Select } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PHONE_PROP, REGION_PROP } from "../../Util/constVar";
import { formatPhoneNumber } from "../../Util/util";

function PhoneFormControl({
	itemProps: { itemName = PHONE_PROP, label, ...itemProps } = {},
	inputProps = {},
	required = true,
	showLabel = true,
	prefixItemProps: { prefixName = REGION_PROP, ...prefixItemProps } = {},
	prefixSelectProps = {},
}) {
	const { Option } = Select;
	const { t } = useTranslation(["Phone", "Form"]);

	const [region, setRegion] = useState("US");

	const prefixSelector = (
		<Form.Item name={prefixName} noStyle {...prefixItemProps}>
			<Select
				style={{
					width: "5rem",
				}}
				{...prefixSelectProps}
				onSelect={(value) => setRegion(value)}
			>
				<Option value="US">+1</Option>
			</Select>
		</Form.Item>
	);

	const App = () => (
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
					{
						required: required,
						message: t("form_required_msg", { ns: "Form" }),
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
						const format = formatPhoneNumber(value, region);
						return format;
					}}
					parser={(value) => value.replace(/[^\d]/g, "")}
					placeholder={t("phone_enter_msg")}
					addonBefore={prefixSelector}
					maxLength={14}
					{...inputProps}
				/>
			</Form.Item>
		</>
	);
	return <App />;
}

export default PhoneFormControl;

import { Flex, Form, Grid, InputNumber, Select } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PHONE_PROP, REGION_PROP } from "../../Util/ConstVar";
import { formatPhoneNumber, isPhoneValid } from "../../Util/Util";

function PhoneFormControl({
	itemProps: {
		itemName = PHONE_PROP,
		label,
		labelProp = {},
		...itemProps
	} = {},
	inputProps = {},
	required = true,
	showLabel = true,
	keyboard = true,
	prefixItemProps: { prefixName = REGION_PROP, ...prefixItemProps } = {},
	prefixSelectProps = {},
	flexProp = {},
	extra = <></>,
}) {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();
	console.log(screens);

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
		<Flex
			gap={10}
			align="center"
			wrap="wrap"
			justify="flex-start"
			{...flexProp}
		>
			<Form.Item
				name={itemName}
				className="w-100 m-0 my-2"
				rules={[
					{
						validator: (_, value) => {
							const isValidNumber = isPhoneValid(value, region);
							// console.log(isValidNumber);
							return isValidNumber
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
					label: (
						<span {...labelProp}>{`${label || t("phone_number_msg")} ${
							required ? "" : `(${t("form_optional_msg", { ns: "Form" })})`
						}`}</span>
					),
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
					checked={keyboard}
					{...inputProps}
				/>
			</Form.Item>
			{extra}
		</Flex>
	);
	return <App />;
}

export default PhoneFormControl;

import { Form, Radio } from "antd";
import { useTranslation } from "react-i18next";

/**
 *
 * @options [{label: "", value: ""}]
 * @returns
 */
function RadioFormControl({
	options = [],
	itemProps: { itemName = "", label = "", labelProp = {}, ...itemProps } = {},
	radioGroupProps = {},
	buttonStyle = "solid",
	optionType = "button",
	radioProps = {},
	required = false,
	showLabel = true,
	size = "large",
} = {}) {
	const { t } = useTranslation(["Form"]);

	const App = () => (
		<>
			<Form.Item
				name={itemName}
				{...(showLabel && {
					label: (
						<span {...labelProp}>{`${label || ""} ${
							required ? "" : `(${t("form_optional_msg", { ns: "Form" })})`
						}`}</span>
					),
				})}
				className="m-0"
				rules={[
					{
						required: required,
						message: t("form_required_msg"),
					},
				]}
				{...itemProps}
			>
				<Radio.Group
					size={size}
					optionType={optionType || "default"}
					buttonStyle={buttonStyle || "outline"}
					className="w-100"
					{...radioGroupProps}
				>
					{(options || []).map((option, idx) => (
						<Radio key={idx} value={option?.value} {...radioProps}>
							{option?.label}
						</Radio>
					))}
				</Radio.Group>
			</Form.Item>
		</>
	);
	return <App />;
}

export default RadioFormControl;

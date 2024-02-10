import { Checkbox, Form } from "antd";
import { useTranslation } from "react-i18next";
import { CHECKBOX_PROP } from "../../Util/ConstVar";

function CheckboxFormControl({
	itemProps: {
		itemName = CHECKBOX_PROP,
		label = "",
		labelProp = {},
		...itemProps
	} = {},
	inputProps = {},
	required = false,
	showLabel = true,
} = {}) {
	const { t } = useTranslation(["Form"]);

	const App = () => (
		<>
			<Form.Item
				name={itemName}
				className="m-0"
				valuePropName="checked"
				rules={[
					{
						required: required,
						message: t("form_required_msg"),
					},
				]}
				{...itemProps}
			>
				<Checkbox
					style={{
						marginTop: ".7rem",
					}}
					{...inputProps}
				>
					{" "}
					{showLabel && <span {...labelProp}>{label}</span>}
				</Checkbox>
			</Form.Item>
		</>
	);
	return <App />;
}

export default CheckboxFormControl;

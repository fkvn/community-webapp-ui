import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

function TextFormControl({
	itemProps: { itemName = "", label = "", ...itemProps } = {},
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
				rules={[
					{
						required: required,
						message: t("form_required_msg"),
					},
				]}
				{...(showLabel && {
					label: `${label} ${required ? "" : `(${t("form_optional_msg")})`}`,
				})}
				{...itemProps}
			>
				<Input allowClear {...inputProps} />
			</Form.Item>
		</>
	);
	return <App />;
}

export default TextFormControl;

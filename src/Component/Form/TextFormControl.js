import { Flex, Form, Input } from "antd";
import { useTranslation } from "react-i18next";

function TextFormControl({
	itemProps: { itemName = "", label = "", labelProp = {}, ...itemProps } = {},
	inputProps = {},
	required = false,
	showLabel = true,
	flexProp = {},
	extra = <></>,
} = {}) {
	const { t } = useTranslation(["Form"]);

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
				className="m-0"
				rules={[
					{
						required: required,
						message: t("form_required_msg"),
					},
				]}
				{...(showLabel && {
					label: (
						<span {...labelProp}>{`${label} ${
							required ? "" : `(${t("form_optional_msg")})`
						}`}</span>
					),
				})}
				{...itemProps}
			>
				<Input allowClear {...inputProps} />
			</Form.Item>
			{extra}
		</Flex>
	);
	return <App />;
}

export default TextFormControl;

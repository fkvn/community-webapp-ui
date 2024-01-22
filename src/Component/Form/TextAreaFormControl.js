import { Flex, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useTranslation } from "react-i18next";
import { runes } from "runes2";

function TextAreaFormControl({
	itemProps: { itemName = "", label = "", labelProp = {}, ...itemProps } = {},
	inputProps = {},
	rows = 6,
	showCount = true,
	maxLength = 500,
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
				className="m-0 w-100"
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
				<TextArea
					placeholder={t("form_enter_here_msg")}
					className="p-0"
					rows={rows}
					allowClear
					count={{
						show: showCount,
						max: maxLength,
						// runes for emoji counts as 1 character
						strategy: (txt) => runes(txt).length,
						exceedFormatter: (txt, { max }) =>
							runes(txt).slice(0, max).join(""),
					}}
					{...inputProps}
				/>
			</Form.Item>
			{extra}
		</Flex>
	);
	return <App />;
}

export default TextAreaFormControl;

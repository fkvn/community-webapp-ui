import { Flex, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { EMAIL_PROP } from "../../Util/constVar";

function EmailFormControl({
	itemProps: {
		itemName = EMAIL_PROP,
		label,
		labelProp = {},
		...itemProps
	} = {},
	inputProps = {},
	required = true,
	showLabel = true,
	flexProp = {},
	extra = <></>,
} = {}) {
	const { t } = useTranslation(["Email", "Form"]);

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
						type: "email",
						message: t("email_invalid_msg"),
					},
					{
						required: required,
						message: t("form_required_msg", { ns: "Form" }),
					},
				]}
				{...(showLabel && {
					label: (
						<span {...labelProp}>{`${label || t("email_address_msg")} ${
							required ? "" : `(${t("form_optional_msg", { ns: "Form" })})`
						}`}</span>
					),
				})}
				{...itemProps}
			>
				<Input allowClear placeholder={t("email_enter_msg")} {...inputProps} />
			</Form.Item>
			{extra}
		</Flex>
	);
	return <App />;
}

export default EmailFormControl;

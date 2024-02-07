import { Form } from "antd";
import { useTranslation } from "react-i18next";
import { DESCRIPTION_PROP } from "../../Util/ConstVar";
import RTE from "../RTE/RTE";

function RTEFormControl({
	itemName = DESCRIPTION_PROP,
	label = "",
	labelProp = {},
	itemProps = {},
	required = true,
	showLabel = true,
	defaultContent = "",
	onUpdate = () => {},
	onCreate = () => {},
	rteProps = {},
}) {
	const { t } = useTranslation(["Form"]);
	const App = () => (
		<Form.Item
			name={itemName}
			className="m-0 w-100"
			rules={[
				{
					required: required,
					message: t("form_required_msg", { ns: "Form" }),
				},
			]}
			{...(showLabel && {
				label: (
					<span {...labelProp}>{`${label || t("form_desc_msg")} ${
						required ? "" : `(${t("form_optional_msg", { ns: "Form" })})`
					}`}</span>
				),
			})}
			{...itemProps}
		>
			<RTE
				onCreate={onCreate}
				defaultContent={defaultContent}
				onUpdate={onUpdate}
				{...rteProps}
			/>
		</Form.Item>
	);
	return <App />;
}

export default RTEFormControl;

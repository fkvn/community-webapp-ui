import { Form, InputNumber } from "antd";
import { COST_PROP } from "../../../Util/ConstVar";
import { formatPrice } from "../../../Util/Util";

const useNumber = ({
	itemProps = {},
	inputProps = {},
	required = false,
	showLabel = true,
} = {}) =>
	((props = {}, inputProps = {}) => (
		<Form.Item {...props}>
			<InputNumber
				addonBefore="$"
				className="m-0 w-100"
				keyboard={true}
				formatter={(value) => formatPrice(value)}
				parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
				{...inputProps}
			/>
		</Form.Item>
	))(
		{
			name: COST_PROP,
			shouldUpdate: true,
			className: "mb-2",
			...itemProps,
			rules: [
				{ required: required, message: "Please enter a price!" },
				...(itemProps?.rules?.length > 0 ? itemProps?.rules : []),
			],
			...(showLabel && {
				label: `${itemProps?.label || "Cost"} ${required ? "" : "(Optional)"}`,
			}),
		},
		{
			placeholder: "E.g. $1000",
			...inputProps,
		}
	);

export default useNumber;

import { Form, Input } from "antd";
import { WEBSITE_PROP } from "../../../Util/ConstVar";

const useUrl = ({
	itemProps: { rules = [], ...itemProps } = {},
	inputProps = {},
	required = false,
	showLabel = true,
} = {}) =>
	((props = {}, inputProps = {}) => (
		<Form.Item {...props}>
			<Input {...inputProps} />
		</Form.Item>
	))(
		{
			name: WEBSITE_PROP,
			className: "m-0 ",
			rules: [
				{ required: required, message: "Please input your password!" },
				{
					pattern:
						/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
					message: "Please provide a valid domain with http(s)://",
				},
			],
			shouldUpdate: true,
			...itemProps,
			...(showLabel && {
				label: `${itemProps?.label || "Website / Link"} ${
					required ? "" : "(Optional)"
				}`,
			}),
		},
		{
			className: "rounded-0",
			placeholder: "Enter a valid domain with http(s)://",
			...inputProps,
		}
	);

export default useUrl;

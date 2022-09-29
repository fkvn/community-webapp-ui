import { AutoComplete, Form } from "antd";

const useAutocomplete = (
	{ rules = [], ...itemProps },
	inputProps = {},
	options = [],
	required = false,
	errorMessage = "Please input a value!"
) =>
	((props = {}, inputProps = {}) => (
		<Form.Item {...props}>
			<AutoComplete {...inputProps} />
		</Form.Item>
	))(
		{
			className: "m-0",
			rules: [
				{
					required: required,
					message: errorMessage,
				},
				...rules,
			],
			...itemProps,
		},
		{
			style: { width: 200 },
			options: options,
			className: "w-100",
			placeholder: "Search here",
			...inputProps,
		}
	);

export default useAutocomplete;

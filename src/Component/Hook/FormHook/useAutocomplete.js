import { AutoComplete, Form } from "antd";

const useAutocomplete = ({
	itemProps: { rules = [], ...itemProps } = {},
	inputProps = {},
	options = [],
	required = false,
	errorMessage = "Please input a value!",
}) =>
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
			label: `${itemProps?.label || "Selection"} ${
				required ? "" : "(Optional)"
			}`,
		},
		{
			className: "w-100",
			options: options,
			filterOption: (inputValue, option) =>
				option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1,
			placeholder: "Search here",
			...inputProps,
		}
	);

export default useAutocomplete;

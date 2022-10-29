import { Form, Input, Radio } from "antd";
import { useState } from "react";
import { formatSentenseCase } from "../../../Util/Util";

function useRadioGroup({
	form = {},
	itemProps: { rules = [], ...itemProps } = {},
	options = [],
	otherDefault = true,
	withOther = false,
	otherPlaceholder = "",
	required = true,
	requiredMessage = "Must choose",
	showLabel = true,
} = {}) {
	const [other, setOther] = useState(otherDefault);

	const [otherValue, setOtherValue] = useState(
		formatSentenseCase(form.getFieldValue(`${itemProps?.name}-Other`)) ||
			"Other"
	);

	const app = (
		<>
			<Form.Item
				className="m-0"
				shouldUpdate
				{...itemProps}
				rules={[
					{ required: required, message: requiredMessage },
					{
						validator(_, value) {
							setOther(
								value === "Other" ||
									formatSentenseCase(value) ===
										formatSentenseCase(
											form.getFieldValue(`${itemProps?.name}-Other`)
										)
									? true
									: false
							);
							return Promise.resolve();
						},
					},

					...rules,
				]}
				{...(showLabel && {
					label: `${itemProps?.label || "Email Address"} ${
						required ? "" : "(Optional)"
					}`,
				})}
			>
				<Radio.Group>
					{options.map((option, idx) => (
						<Radio key={idx} value={option?.value}>
							{option?.title}
						</Radio>
					))}
					{withOther && <Radio value={otherValue}>Others</Radio>}
				</Radio.Group>
			</Form.Item>
			{withOther && other && (
				<Form.Item
					name={`${itemProps?.name}-Other`}
					className="m-0"
					rules={[
						{ required: other, message: "Please enter value" },
						{
							validator(_, value) {
								form.setFieldValue(itemProps?.name, formatSentenseCase(value));
								setOtherValue(formatSentenseCase(value));
								return Promise.resolve();
							},
						},
					]}
				>
					<Input placeholder={otherPlaceholder} />
				</Form.Item>
			)}
		</>
	);
	return app;
}

export default useRadioGroup;

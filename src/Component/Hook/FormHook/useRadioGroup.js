import { Form, Input, Radio } from "antd";
import { useState } from "react";

function useRadioGroup({
	form = {},
	itemProps: { rules = [], ...itemProps } = {},
	options = [],
	otherDefault = false,
	withOther = false,
	otherPlaceholder = "",
	required = true,
	requiredMessage = "Must choose",
	showLabel = true,
} = {}) {
	const [other, setOther] = useState(otherDefault);

	const otherFieldValue = form.getFieldValue(`${itemProps?.name}-Other`) || "";

	const [otherField, setOtherField] = useState(otherFieldValue || "Other");

	const app = (
		<>
			<Form.Item
				className="m-0"
				shouldUpdate
				{...itemProps}
				rules={[
					{
						validator(_, value) {
							setOther(
								value === "Other" || value === otherFieldValue ? true : false
							);

							return required && value === undefined
								? Promise.reject(requiredMessage)
								: Promise.resolve();
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
					{withOther && <Radio value={otherField}>Others</Radio>}
				</Radio.Group>
			</Form.Item>
			{withOther && other && (
				<Form.Item
					name={`${itemProps?.name}-Other`}
					className="m-0"
					rules={[
						{ required: true, message: "Please enter value" },
						{
							validator(_, value = "") {
								form.setFieldValue(itemProps?.name, value);
								setOtherField(value);
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

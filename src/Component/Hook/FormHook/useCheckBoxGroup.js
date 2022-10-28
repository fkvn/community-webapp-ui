import { Checkbox, Col, Form, Input, Row } from "antd";
import { useState } from "react";
import { formatSentenseCase } from "../../../Util/Util";

function useCheckBoxGroup({
	form = {},
	itemProps: { rules = [], ...itemProps } = {},
	options = [],
	withOther = false,
	required = true,
	requiredMessage = "Must choose",
	showLabel = true,
} = {}) {
	const [other, setOther] = useState(false);

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
								value.indexOf("Other") >= 0 ||
									value.indexOf(formatSentenseCase(otherValue)) >= 0
									? true
									: false
							);
							return Promise.resolve();
						},
					},

					...rules,
				]}
				{...(showLabel && {
					label: `${itemProps?.label || "Field"} ${
						required ? "" : "(Optional)"
					}`,
				})}
			>
				<Checkbox.Group>
					<Row justify="space-between">
						{options.map((option, idx) => (
							<Col key={idx}>
								<Checkbox
									value={option?.value}
									style={{ lineHeight: "32px" }}
									className="mx-1"
								>
									{option?.title}
								</Checkbox>
							</Col>
						))}

						{withOther && (
							<Col>
								<Checkbox
									value={otherValue}
									style={{ lineHeight: "32px" }}
									className="mx-1"
								>
									Others
								</Checkbox>
							</Col>
						)}
					</Row>
				</Checkbox.Group>
			</Form.Item>
			{withOther && other && (
				<Form.Item
					name={`${itemProps?.name}-Other`}
					className="m-0"
					rules={[
						{ required: other, message: "Please enter value" },
						{
							validator(_, value) {
								const newValues = [...form.getFieldValue(itemProps?.name)].map(
									(item) => {
										return item === "Other" ||
											item === formatSentenseCase(otherValue)
											? formatSentenseCase(value)
											: item;
									}
								);

								setOtherValue(formatSentenseCase(value));

								form.setFieldValue(itemProps?.name, newValues);

								return Promise.resolve();
							},
						},
					]}
				>
					<Input />
				</Form.Item>
			)}
		</>
	);
	return app;
}

export default useCheckBoxGroup;

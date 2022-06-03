import React from "react";
import { Button, Form, FormControl, ListGroup, Toast } from "react-bootstrap";

function DropDownFormControl({
	type = "text",
	placeholder = "",
	className = "",
	dropdownItems = [],
	onChangeHandler = () => {},
	onItemClickHanlder = () => {},
}) {
	const app = (
		<Form.Group>
			<FormControl
				type={type}
				placeholder={placeholder}
				className={`formControl ${className}`}
				onChange={(e) => onChangeHandler(e.target.value)}
			/>

			{dropdownItems.length > 0 && (
				<Toast className="predictionDropDown position-relative w-100">
					<Toast.Body className="border-0">
						<ListGroup as="ul"></ListGroup>
						{dropdownItems.map((item, idx) => (
							<ListGroup.Item as="li" key={idx}>
								<Button
									variant="link"
									className="text-dark text-decoration-none p-0"
									onClick={onItemClickHanlder}
								>
									{item?.description}
								</Button>
							</ListGroup.Item>
						))}
					</Toast.Body>
				</Toast>
			)}
		</Form.Group>
	);
	return app;
}

export default DropDownFormControl;

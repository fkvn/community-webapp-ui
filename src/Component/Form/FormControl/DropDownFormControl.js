import React, { forwardRef } from "react";
import { Button, Form, FormControl, ListGroup, Toast } from "react-bootstrap";

function DropDownFormControl(props, ref) {
	const {
		type = "text",
		placeholder = "",
		className = "",
		dropdownItems = [],
		onChangeHandler = () => {},
		onSelectItemHandler = () => {},
	} = props;

	if (!ref) {
		ref = React.createRef();
	}

	const app = (
		<Form.Group className="position-relative">
			<FormControl
				type={type}
				placeholder={placeholder}
				className={`tedkvn-formControl ${className}`}
				ref={ref}
				onChange={(e) => onChangeHandler(e.target.value)}
				role="presentation"
			/>

			{dropdownItems.length > 0 && (
				<Toast
					className="tedkvn-predictionDropDown  position-absolute w-100"
					style={{ zIndex: "25" }}
				>
					<Toast.Body className="border-0">
						<ListGroup as="ul"></ListGroup>
						{dropdownItems.map((item, idx) => (
							<ListGroup.Item as="li" key={idx}>
								<Button
									variant="link"
									className="text-dark text-decoration-none p-0"
									onClick={() => onSelectItemHandler(item)}
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

export default forwardRef(DropDownFormControl);

import { forwardRef, useEffect, useState } from "react";
import { Button, Form, FormControl, ListGroup, Toast } from "react-bootstrap";

import * as util from "../../../Util/Util";

function DropDownFormControl(props, _) {
	const {
		id = "",
		type = "search",
		placeholder = "",
		className = "",
		value = "",
		dropdownItems = [],
		onLoadDefaultValue = () => {},
		onMergeStorage = () => {},
		onUpdatePrediction = () => {},
	} = props;

	const [loading, setLoading] = useState(true);

	const onChangeHandler = (value = "") => {
		// update store
		onMergeStorage(value);

		// return suggestions
		onUpdatePrediction(value);
	};

	const onSelectItemHandler = (selection = {}) => {
		// update store
		onMergeStorage(selection, true);

		// return suggestions
		onUpdatePrediction(selection, true);
	};

	useEffect(() => {
		// first time load
		if (loading) {
			onLoadDefaultValue();
			setLoading(false);
		}

		util.scrollToActiveElement();
	}, [loading, setLoading, onLoadDefaultValue]);

	const app = (
		<Form.Group>
			<FormControl
				{...(id && { id: id })}
				type={type}
				placeholder={placeholder}
				className={`tedkvn-formControl ${className}`}
				value={value}
				onChange={(e) => onChangeHandler(e.target.value)}
				role="presentation"
			/>

			{dropdownItems.length > 0 && (
				<Toast className="tedkvn-predictionDropDown  position-relative w-100">
					<Toast.Body className="border-0">
						<ListGroup as="ul"></ListGroup>
						{dropdownItems.map((item, idx) => (
							<ListGroup.Item
								as="li"
								key={idx}
								onClick={() => onSelectItemHandler(item)}
								disabled={item.disabled}
							>
								<Button
									variant="link"
									className="text-dark text-decoration-none p-0"
									disabled={item.disabled}
								>
									{item?.description || ""}
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

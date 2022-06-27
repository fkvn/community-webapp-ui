import { forwardRef, useEffect, useState } from "react";
import { Button, FormControl, ListGroup, Toast } from "react-bootstrap";
import * as util from "../../../Util/Util";

function DropDownFormControl(props, _) {
	const {
		id = "",
		type = "search",
		placeholder = "",
		className = "",
		value = "",
		style = {},
		required = false,
		dropdownItems = [],
		showDropdownItems = false,
		onLoadDefaultValue = () => {},
		onMergeStorage = () => {},
		onUpdatePrediction = () => {},
	} = props;

	const [loading, setLoading] = useState(true);

	const onChangeHandler = (value = "") => {
		// update store
		onMergeStorage(value);

		// update suggestions
		onUpdatePrediction(value);
	};

	const onSelectItemHandler = (selection = {}) => {
		// update store
		onMergeStorage(selection, true);

		// update suggestions
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

	const app = !loading && (
		// <Form.Group>
		<>
			<FormControl
				{...(id && { id: id })}
				type={type}
				placeholder={placeholder}
				required={required}
				className={`tedkvn-formControl ${className}`}
				value={value}
				style={style}
				onChange={(e) => onChangeHandler(e.target.value)}
				role="presentation"
			/>

			{showDropdownItems && dropdownItems.length > 0 && (
				<Toast
					className="tedkvn-predictionDropDown position-positive w-100 "
					{...(id && { id: "dropdown-" + id })}
				>
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
			{/* </Form.Group> */}
		</>
	);
	return app;
}

export default forwardRef(DropDownFormControl);

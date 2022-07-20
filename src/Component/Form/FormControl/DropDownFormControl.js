import { forwardRef, useEffect, useState } from "react";
import { FormControl, ListGroup, Toast } from "react-bootstrap";

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

	const onSelectItemHandler = (selection = {}, idx = -1) => {
		// update store
		onMergeStorage(selection, true, idx);

		// update suggestions
		onUpdatePrediction(selection, true, idx);
	};

	useEffect(() => {
		// first time load
		if (loading) {
			onLoadDefaultValue();
			setLoading(false);
		}

		// util.scrollToActiveElement();
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

			{dropdownItems.length > 0 && (
				<Toast
					className="tedkvn-predictionDropDown position-positive w-100 "
					{...(id && { id: "dropdown-" + id })}
					delay={3000}
					show={showDropdownItems}
				>
					<Toast.Body className="border-0">
						<ListGroup></ListGroup>
						{dropdownItems.map((item, idx) => (
							<ListGroup.Item
								action
								key={idx}
								disabled={item.disabled}
								onClick={() => onSelectItemHandler(item, idx)}
								{...(idx === 0 && { className: "bg-secondary text-white" })}
							>
								{item?.description || ""}
								{/* <Button
									variant="link"
									className="text-dark text-decoration-none p-0"
									disabled={item.disabled}
									
								>
									{item?.description || ""}
								</Button> */}
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

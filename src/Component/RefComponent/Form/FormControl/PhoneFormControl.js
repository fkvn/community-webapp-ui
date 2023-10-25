import React, { useCallback, useEffect, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { icons } from "../../../Assest/Asset";
import { ICON_US_PHONE } from "../../../Util/ConstVar";
import * as util from "../../../Util/Util";
import LoadingButton from "../../Button/LoadingButton";

function PhoneFormControl({
	id = "",
	className = "",
	placeholder = "(___) ___-____",
	type = "tel",
	required = false,
	disabled = false,
	size = "14",
	minLength = "14",
	maxLength = "14",
	formattedPhone = "",
	onMergeStorage = () => {},
	onLoadDefaultValue = () => {},
}) {
	const [loading, setLoading] = useState(true);

	const [cursor, setCursor] = useState(0);

	const ref = React.createRef("");

	const onPhoneChangeHandler = useCallback(
		(cursor = -1, phone = "") => {
			// update cursor
			if (cursor >= 0) {
				setCursor(cursor);
			}

			//  format phone
			const formattedPhone = util.formatPhoneNumber(phone);

			// merge to storage session
			onMergeStorage(formattedPhone);
		},
		[onMergeStorage]
	);

	useEffect(() => {
		// first time load
		if (loading) {
			// load default value
			onLoadDefaultValue();

			setLoading(false);
		}

		// update cursor
		util.updatePhoneCursorPostion(ref, cursor);
	}, [loading, setLoading, ref, cursor, onLoadDefaultValue]);

	const app = !loading && (
		<InputGroup className="mb-3 mx-0 border-0 h-100">
			<LoadingButton
				{...(id && { btnId: id + "hidden-icon" })}
				withIcon={true}
				iconSrc={icons[`${ICON_US_PHONE}`]}
				iconOnly={true}
				className="bg-light border-0 rounded mx-1"
				imgFrameWidth="50px"
				// btnVariant="white"
				// btnSize="sm"
				// // imgClassName="w-75 "
				// btnClassName=" border-0"
			/>
			<FormControl
				{...(id && { id: id })}
				type={type}
				placeholder={placeholder}
				ref={ref}
				className={`custom-formControl ${className}`}
				value={formattedPhone}
				onChange={(p) =>
					onPhoneChangeHandler(p.currentTarget.selectionStart, p.target.value)
				}
				// size={size}
				// minLength={minLength}
				maxLength={maxLength}
				required={required}
				disabled={disabled}
			/>
		</InputGroup>
	);
	return app;
}

export default PhoneFormControl;

import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import FormControlControlled from "../../../../Component/Form/FormControl/FormControlControlled";
import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../Util/ConstVar";
import * as util from "../../../../Util/Util";

function UserPositionFormControlContainer({
	id = "",
	className = "",
	required = false,
	disabled = false,
	storageObjName = "",
}) {
	const positions = [...constVar.STORAGE_COMPANY_POSTION_LIST];

	const position = useSelector(
		(state) =>
			state.thainowReducer[`${storageObjName}`][
				`${constVar.STORAGE_POSITION_PROP}`
			] || ""
	);

	const getSessionPosition = () => {
		return (
			util.getSessionStorageObj(storageObjName)[
				`${constVar.STORAGE_POSITION_PROP}`
			] || ""
		);
	};

	const updateReduxStorePosition = (position = "") => {
		dispatchPromise.patchSignupUserInfo({
			[`${constVar.STORAGE_POSITION_PROP}`]: position,
		});
	};

	const updateSessionPosition = (position = "") => {
		util.saveToSessionStore(
			storageObjName,
			constVar.STORAGE_POSITION_PROP,
			position
		);
	};

	const onClickHanlder = (e) => {
		// update store
		updateReduxStorePosition(e.target?.value || "");

		// update storage
		updateSessionPosition(e.target?.value || "");
	};

	const onLoadDefaultValueHandler = () => {
		// get information from the first time load
		const defaultPosition = getSessionPosition();

		if (position !== defaultPosition) {
			updateReduxStorePosition(defaultPosition);
		}
	};

	const app = (
		<>
			<div></div>
			{positions.map((pos, idx) => (
				<FormControlControlled
					key={idx}
					{...(id && { id: id })}
					type="radio"
					label={pos}
					className={className}
					inline={true}
					name="business-position"
					required={required}
					disabled={disabled}
					onClick={onClickHanlder}
					onLoadDefaultValue={onLoadDefaultValueHandler}
					value={pos}
					checked={position === pos}
				/>
			))}
			{position === "No Preference" && (
				<Form.Group>
					<Form.Text className="text-mute">
						<small className="text-danger">
							* Business accounts likely get rejected when their position is not
							stated.
						</small>
					</Form.Text>
				</Form.Group>
			)}
		</>
	);
	return app;
}

export default UserPositionFormControlContainer;

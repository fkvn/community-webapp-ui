import FormControlControlled from "../../../../Component/Form/FormControl/FormControlControlled";

import * as asset from "../../../../Assest/Asset";
import * as constVar from "../../../../Util/ConstVar";

function SearchInputFormControlContainer({
	id = "",
	className = "",
	placeholder = "Hi there, what are you looking for",
	required = true,
}) {
	const onMergeStorageHandler = () => {};

	const onLoadDefaultValueHandler = () => {};

	const searchInputControl = (
		<div
			className="p-2 px-3"
			style={{
				border: "2px solid red",
				minWidth: "20rem",
			}}
		>
			<FormControlControlled
				{...(id && { id: id })}
				value=""
				className={className}
				customClassName={true}
				withIcon={true}
				iconSrc={asset.images[`${constVar.ICON_USER_READER}`]}
				placeholder={placeholder}
				required={required}
				onMergeStorage={onMergeStorageHandler}
				onLoadDefaultValue={onLoadDefaultValueHandler}
			/>
		</div>
	);

	const app = <>{searchInputControl}</>;
	return app;
}

export default SearchInputFormControlContainer;

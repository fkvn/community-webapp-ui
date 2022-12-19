import { Button } from "antd";
import useClearFilter from "../../Hook/SearchHook/useClearFilter";

function ClearFilter({ type = "link", className = "px-0", ...props } = {}) {
	const onClearHandler = useClearFilter();

	const app = (
		<Button
			type={type}
			className={className}
			{...props}
			onClick={onClearHandler}
		>
			Clear Filter
		</Button>
	);
	return app;
}

export default ClearFilter;

import { Typography } from "antd";

const { Text } = Typography;

function EllipsisMiddle({ suffixCount = 0, children = "", className = "" }) {
	const start = children.slice(0, children.length - suffixCount).trim();
	const suffix = children.slice(-suffixCount).trim();

	const app = (
		<Text
			style={{ maxWidth: "100%" }}
			className={className}
			ellipsis={{ suffix }}
		>
			{start}
		</Text>
	);
	return app;
}

export default EllipsisMiddle;

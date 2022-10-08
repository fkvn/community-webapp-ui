import { Typography } from "antd";
import { svgJobBadge } from "../../Assest/Asset";
import useImage from "../Hook/useImage";

function JobBadge({
	containerClassName = "",
	containerMaxWidth = "",
	containerMaxHeight = "",
	imgWidth = "3.8rem",
	imgSrc = svgJobBadge,
	withTitle = true,
	title = "Hiring Job",
	titleLevel = 5,
	cursor = "pointer",
	onClick = () => {},
}) {
	const { image } = useImage();

	const { Title } = Typography;

	const app = (
		<div
			className={containerClassName}
			style={{
				maxWidth: containerMaxWidth,
				maxHeight: containerMaxHeight,
				cursor: cursor,
			}}
			onClick={onClick}
		>
			{image({ width: imgWidth, src: imgSrc })}{" "}
			{withTitle && title.length > 0 && (
				<Title level={titleLevel}>{title}</Title>
			)}
		</div>
	);
	return app;
}

export default JobBadge;

import { Typography } from "antd";
import { svgMarketplaceBadge } from "../../Assest/Asset";
import useImage from "../Hook/useImage";

function MarketplaceBadge({
	containerClassName = "",
	containerMaxWidth = "",
	containerMaxHeight = "",
	imgWidth = "3.8rem",
	imgSrc = svgMarketplaceBadge,
	withTitle = true,
	title = "Marketplace",
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

export default MarketplaceBadge;

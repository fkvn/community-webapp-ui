import { Button, Tag, Typography } from "antd";
import { svgMarketplaceBadge } from "../../Assest/Asset";
import global from "../../Assest/Style/scss/base/_global.scss";
import { SEARCH_MARKETPLACE } from "../../Util/ConstVar";
import useImage from "../Hook/useImage";

function MarketplaceBadge({
	id = SEARCH_MARKETPLACE,
	type = "image",

	// image with text style -> type ="image" as default
	containerClassName = "",
	containerMaxWidth = "",
	containerMaxHeight = "",
	imgWidth = "3.8rem",
	imgSrc = svgMarketplaceBadge,
	withTitle = true,
	title = "Marketplace",
	titleLevel = 5,
	cursor = "pointer",

	// button tag style -> type ="tag"
	active = false,
	activeColor = global.marketplaceColor,
	defautColor = "gray",
	buttonClassName = "p-0 m-0 border-0 rounded lh-base",
	tagClassName = "p-1 px-3 m-0 rounded lh-base border-0",
	tagProps = {},

	// action
	onClick = () => {},
} = {}) {
	const { image } = useImage();

	const { Title } = Typography;

	const app = (
		<>
			{type === "image" && (
				<div
					id={id}
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
			)}
			{type === "tag" && (
				<Button id={id} type="ghost" className={buttonClassName}>
					<Tag
						color={active ? activeColor : defautColor}
						className={tagClassName}
						onClick={onClick}
						{...tagProps}
					>
						{title}
					</Tag>
				</Button>
			)}
		</>
	);
	return app;
}

export default MarketplaceBadge;

import { Button, Tag, Typography } from "antd";
import { svgDealBadge } from "../../Assest/Asset";
import global from "../../Assest/Style/scss/base/_global.scss";
import useImage from "../Hook/useImage";

function DealBadge({
	type = "image",

	// image with text style -> type ="image" as default
	containerClassName = "",
	containerMaxWidth = "",
	containerMaxHeight = "",
	imgWidth = "3.8rem",
	imgSrc = svgDealBadge,
	withTitle = true,
	title = "Local Deal",
	titleLevel = 5,
	cursor = "pointer",

	// button tag style -> type ="tag"
	active = false,
	activeColor = global.primaryColor,
	defautColor = "gray",
	buttonClassName = "p-0 m-0 border-0 rounded lh-base",
	tagClassName = "p-1 px-3 m-0 rounded lh-base",

	// action
	onClick = () => {},
}) {
	const { image } = useImage();

	const { Title } = Typography;

	const app = (
		<>
			{type === "image" && (
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
			)}
			{type === "tag" && (
				<Button type="ghost" className={buttonClassName}>
					<Tag
						color={active ? activeColor : defautColor}
						className={tagClassName}
						onClick={onClick}
					>
						{title}
					</Tag>
				</Button>
			)}
		</>
	);
	return app;
}

export default DealBadge;

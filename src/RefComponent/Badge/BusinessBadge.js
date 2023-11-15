import { Button, Tag, Typography } from "antd";
import { svgBusinessBadge } from "../../Assest/Asset";
import global from "../../Assest/Style/scss/base/_global.scss";
import { SEARCH_BUSINESS } from "../../Util/ConstVar";
import useImage from "../Hook/useImage";

function BusinessBadge({
	id = SEARCH_BUSINESS,
	type = "image",
	disabled = false,

	// image with text style -> type ="image" as default
	containerClassName = "",
	containerMaxWidth = "",
	containerMaxHeight = "",
	imgWidth = "3.8rem",
	imgSrc = svgBusinessBadge,
	withTitle = true,
	title = "Business",
	titleLevel = 5,
	cursor = "pointer",

	// button tag style -> type ="tag"
	active = false,
	activeColor = global.businessColor,
	defautColor = "gray",
	buttonClassName = "p-0 m-0 border-0 rounded lh-base",
	tagClassName = "p-1 px-3 m-0 rounded lh-base",
	tagProps = {},

	// action
	onClick = () => {},
}) {
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
				<Button
					id={id}
					type="ghost"
					className={buttonClassName}
					disabled={disabled}
				>
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

export default BusinessBadge;

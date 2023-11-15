import { Button, Flex } from "antd";
import ReactLoading from "react-loading";
import ImageFrame from "../ImageFrame/ImageFrame";

function LoadingButton({
	id = "",
	isLoading = false,
	className = "",
	size = "large",
	customSubmit = false,
	title = "",
	type = "primary",
	btnStyle = {},
	loadingType = "spin",
	loadingColor = "#ffffff",
	loadingHeight = "1.5rem",
	loadingWidth = "1.5rem",
	loadingClassName = "d-inline-block mx-3",
	withIcon = false,
	iconSrc = "",
	iconOnly = false,
	imgFluid = true,
	imgFrameWidth = "",
	onClick = () => {},
}) {
	const app = (
		<Button
			{...(id && { id: "btn-" + id })}
			type={type}
			className={`shadown-none px-5 ${className} `}
			{...(!customSubmit
				? { htmlType: "submit" }
				: {
						htmlType: "submit",
						onClick: onClick,
				  })}
			disabled={isLoading}
			size="large"
			// style={{
			// 	display: "block !important",
			// 	...btnStyle,
			// }}
		>
			<Flex gap={1} className="h-100 w-100 px-1 custom-center">
				{!isLoading ? (
					<>
						{withIcon && (
							<ImageFrame
								{...(id && { id: id })}
								src={iconSrc}
								fluid={imgFluid}
								{...(imgFrameWidth && { frameWidth: imgFrameWidth })}
							/>
						)}
						{!iconOnly && (
							<>
								<div
									{...(id && { id: "title-" + id })}
									style={{ paddingBottom: "0.05rem" }}
									className="custom-text-ellipsis"
								>
									{title}
								</div>
							</>
						)}{" "}
					</>
				) : (
					<>
						{" "}
						<ReactLoading
							type={loadingType}
							color={loadingColor}
							height={loadingHeight}
							width={loadingWidth}
							className={loadingClassName}
						/>
					</>
				)}
			</Flex>
		</Button>
	);
	return app;
}

export default LoadingButton;

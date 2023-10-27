import { Button, Stack } from "react-bootstrap";
import ReactLoading from "react-loading";
import ImageFrame from "../ImageFrame/ImageFrame";

function LoadingButton({
	id = "",
	isLoading = false,
	className = "",
	size = "md",
	title = "",
	type = "",
	variant = "primary",
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
			size={size}
			variant={variant}
			className={`shadown-none  ${className} `}
			{...(type && { type: type })}
			disabled={isLoading}
			onClick={onClick}
		>
			<Stack direction="horizontal" gap={1} className="h-100 w-100 px-1">
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
			</Stack>
		</Button>
	);
	return app;
}

export default LoadingButton;
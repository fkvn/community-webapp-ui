import { Button } from "react-bootstrap";
import ReactLoading from "react-loading";
import ImageFrame from "../ImageFrame/ImageFrame";

function LoadingButton({
	id = "",
	isLoading = true,
	className = "",
	size = "md",
	title = "",
	type = "",
	variant = "primary",
	buttonStyle = {},
	loadingType = "spin",
	loadingColor = "#ffffff",
	loadingHeight = "1.5rem",
	loadingWidth = "1.5rem",
	loadingClassName = "d-inline-block mx-3",
	withIcon = false,
	iconSrc = "",
	imgFluid = true,
	onClick = () => {},
}) {
	const app = (
		<Button
			{...(id && { id: "btn-" + id })}
			size={size}
			variant={variant}
			className={`d-inline-flex tedkvn-center border-0 shadown-none px-3 ${className} `}
			type={type}
			disabled={isLoading}
			style={{ borderRadius: "1rem", ...buttonStyle }}
			onClick={onClick}
		>
			{!isLoading ? (
				<>
					{withIcon && <ImageFrame src={iconSrc} fluid={imgFluid} />}
					<div className="pb-1">{title}</div>
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
		</Button>
	);
	return app;
}

export default LoadingButton;

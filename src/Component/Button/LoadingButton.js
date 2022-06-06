import React from "react";
import { Button } from "react-bootstrap";
import ReactLoading from "react-loading";

function LoadingButton({
	show = false,
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
	onClick = () => {},
}) {
	const app = (
		<Button
			size={size}
			variant={variant}
			className={className}
			type={type}
			disabled={show}
			onClick={onClick}
		>
			{show ? (
				<>
					<ReactLoading
						type={loadingType}
						color={loadingColor}
						height={loadingHeight}
						width={loadingWidth}
						className={loadingClassName}
					/>
				</>
			) : (
				title
			)}
		</Button>
	);
	return app;
}

export default LoadingButton;

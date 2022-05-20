import React from "react";
import { Button } from "react-bootstrap";
import ReactLoading from "react-loading";

function LoadingButton({
	show = false,
	onClose = () => {},
	className = "",
	size = "md",
	title = "",
	type = "",
	loadingType = "spin",
	loadingColor = "#ffffff",
	loadingHeight = "5%",
	loadingWidth = "5%",
	loadingClassName = "d-inline-block mx-2",
}) {
	const app = (
		<Button size={size} className={className} type={type} disabled={show}>
			{show ? (
				<>
					{title}
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

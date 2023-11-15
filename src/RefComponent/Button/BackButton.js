import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function BackButton({
	backHref = -1,
	size = "md",
	variant = "link",
	style = {},
	replaceStyle = false,
	className = {},
	replaceClassName = false,
	title = "Back",
}) {
	const navigate = useNavigate();

	const app = (
		<Button
			size={size}
			variant={variant}
			style={
				replaceStyle
					? style
					: { ...style, position: "relative", top: "5px", left: "0" }
			}
			className={
				replaceClassName
					? className
					: `${className} fs-5 text-decoration-none p-0`
			}
			onClick={() => navigate(backHref, { state: {} })}
		>
			{title}
		</Button>
	);
	return app;
}

export default BackButton;

import React from "react";
import { Navbar } from "react-bootstrap";

function NavBrand({
	src = "",
	width = "40",
	height = "40",
	imgClassName = ".",
	replaceClass = false,
	alt = "",
	href = "/",
	title = "",
}) {
	const app = (
		<Navbar.Brand href={href}>
			<img
				alt={alt}
				src={src}
				width={width}
				height={height}
				className={
					replaceClass
						? imgClassName
						: `d-inline-block align-top img-fluid ${imgClassName}`
				}
			/>
			{title && <strong>{title}</strong>}
		</Navbar.Brand>
	);

	return app;
}

export default NavBrand;

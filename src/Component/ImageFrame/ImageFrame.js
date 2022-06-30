import { useState } from "react";
import { Image } from "react-bootstrap";
import ReactLoading from "react-loading";

function ImageFrame({
	id = "",
	frameClassName = "",
	frameWidth = "1.5rem",
	frameStyle = {},
	src = "",
	className = "",
	style = {},
}) {
	const [isLoading, setLoading] = useState(true);

	const app = (
		<div
			className={`tedkvn-center ${frameClassName}`}
			style={{
				width: frameWidth,
				...frameStyle,
			}}
			{...(id && { id: "imageFrame-" + id })}
		>
			<Image
				{...(id && { id: "image-" + id })}
				src={src}
				fluid
				className={`d-none ${className}`}
				style={style}
				onLoad={(e) => {
					if (e.target.complete && e.target.naturalHeight !== 0) {
						e.target.classList.remove("d-none");
						e.target.classList.add("d-block");
						setLoading(false);
					}
				}}
			/>
			{isLoading && (
				<ReactLoading
					type="spin"
					color="#0000FF"
					height={"1.5rem"}
					width={"1.5rem"}
				/>
			)}
		</div>
	);
	return app;
}

export default ImageFrame;

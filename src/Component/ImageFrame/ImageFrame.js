import { Image } from "antd";
import { useState } from "react";
import ReactLoading from "react-loading";
import { imageNoPhoto } from "../../Asset/Asset";

function ImageFrame({
	id = "",
	frameClassName = "",
	frameWidth = "1.5rem",
	frameStyle = {},
	customFrameStyle = true,
	src = "",
	className = "",
	style = {},
	imgProp = {},
	fluid = true,
}) {
	const [isLoading, setLoading] = useState(true);

	const app = (
		<div
			className={`${frameClassName}`}
			style={{
				...(!customFrameStyle && { width: frameWidth, ...frameStyle }),
			}}
			{...(id && { id: "imageFrame-" + id })}
		>
			<Image
				{...(id && { id: "image-" + id })}
				src={src}
				{...(fluid && { ...fluid })}
				className={`d-none ${className}`}
				style={style}
				onLoad={(e) => {
					if (e.target.complete && e.target.naturalHeight !== 0) {
						e.target.classList.remove("d-none");
						e.target.classList.add("d-block");
						setLoading(false);
					}
				}}
				{...imgProp}
				fallback={imageNoPhoto}
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

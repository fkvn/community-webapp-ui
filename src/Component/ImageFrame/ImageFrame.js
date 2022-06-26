import { Image } from "react-bootstrap";

function ImageFrame({ iconSrc = "", className = "" }) {
	const app = (
		<div className={`tedkvn-center ` + className}>
			<Image src={iconSrc} fluid />
		</div>
	);
	return app;
}

export default ImageFrame;

import { Image } from "antd";
import { imageNoPhoto, imageThainowLogoRound } from "../../Assest/Asset";

function useImage() {
	const image = ({ className = "", ...inputProps }, center = true) =>
		((props = {}) => <Image {...props} />)({
			width: 45,
			src: imageThainowLogoRound,
			preview: false,
			onError: (e) => {
				e.target.style.border = "1px solid";
				e.target.style.padding = "0.5rem";
			},
			fallback: imageNoPhoto,
			className: `${className} ${center ? "custom-center" : ""} d-block`,
			...inputProps,
			style: {
				objectFit: "cover",
				...inputProps?.style,
			},
		});

	return {
		image,
	};
}

export default useImage;

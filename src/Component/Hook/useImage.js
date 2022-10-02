import { Image } from "antd";
import { useNavigate } from "react-router-dom";
import { imageNoPhoto, imageThainowLogoRound } from "../../Assest/Asset";

function useImage() {
	const navigate = useNavigate();

	const image = (inputProps = {}) =>
		((props = {}) => <Image {...props} />)({
			width: 45,
			src: imageThainowLogoRound,
			preview: false,
			onError: (e) => {
				e.target.style.border = "1px solid";
				e.target.style.padding = "0.5rem";
			},
			fallback: imageNoPhoto,
			...inputProps,
			className: `${inputProps.className} tedkvn-center`,
		});

	return { image };
}

export default useImage;

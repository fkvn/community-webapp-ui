import { Image } from "antd";
import { useNavigate } from "react-router-dom";
import { noPhotoImage, thainowLogoRound } from "../../Assest/Asset";

function useImage() {
	const navigate = useNavigate();

	const image = (inputProps = {}) =>
		((props = {}) => <Image {...props} />)({
			width: 45,
			src: thainowLogoRound,
			preview: false,
			onError: (e) => {
				e.target.style.border = "1px solid";
				e.target.style.padding = "0.5rem";
			},
			fallback: noPhotoImage,
			onClick: () => navigate("/"),
			...inputProps,
			className: `${inputProps.className} tedkvn-center`,
		});

	return { image };
}

export default useImage;

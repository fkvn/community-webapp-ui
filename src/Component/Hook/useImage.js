import { Image } from "antd";
import { imageNoPhoto, imageThainowLogoRound } from "../../Assest/env";
import useUpload from "./useUpload";

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

	const { uploadFile } = useUpload();

	// const avatar = ({
	// 	inputProps = {},
	// 	editable = false,
	// 	uploadProps = {},
	// 	uploadPhotoOnClick = uploadFile,
	// 	withTooltip = true,
	// }) =>
	// 	((props = {}) =>
	// 		editable ? (
	// 			<UploadPicture
	// 				cropShape="round"
	// 				uploadPhotoOnClick={uploadPhotoOnClick}
	// 				{...uploadProps}
	// 			>
	// 				<Tooltip
	// 					arrowPointAtCente={true}
	// 					{...(withTooltip && {
	// 						title: <Image src={inputProps?.src} />,
	// 					})}
	// 					placement="bottom"
	// 				>
	// 					<Avatar {...props} />
	// 				</Tooltip>
	// 			</UploadPicture>
	// 		) : (
	// 			<Tooltip
	// 				arrowPointAtCente={true}
	// 				{...(withTooltip && {
	// 					title: <Image src={inputProps?.src} />,
	// 				})}
	// 				placement="bottom"
	// 			>
	// 				<Avatar {...props} />
	// 			</Tooltip>
	// 		))({
	// 		size: 45,
	// 		shape: "circle",
	// 		icon: <UserOutlined />,
	// 		style: {
	// 			border: "1px solid ",
	// 		},
	// 		...inputProps,
	// 	});

	return {
		image,
		//  avatar
	};
}

export default useImage;

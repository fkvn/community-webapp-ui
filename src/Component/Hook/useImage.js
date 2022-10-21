import { UserOutlined } from "@ant-design/icons";
import { Avatar, Image, Tooltip } from "antd";
import { imageNoPhoto, imageThainowLogoRound } from "../../Assest/Asset";
import UploadAvatarContainer from "../../Container/UploadAvatarContainer";
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
			className: `${className} ${center ? "tedkvn-center" : ""} `,
			...inputProps,
		});

	const { uploadFile } = useUpload();

	const avatar = (
		{ ...inputProps },
		editable = false,
		uploadPhotoOnClick = uploadFile,
		tooltip = true
	) =>
		((props = {}) =>
			editable ? (
				<UploadAvatarContainer
					cropShape="round"
					uploadPhotoOnClick={uploadPhotoOnClick}
				>
					<Tooltip
						arrowPointAtCente={true}
						title={<Image src={inputProps?.src} />}
						placement="bottom"
					>
						<Avatar {...props} />
					</Tooltip>
				</UploadAvatarContainer>
			) : (
				<Tooltip
					arrowPointAtCente={true}
					title={<Image src={inputProps?.src} />}
					placement="bottom"
				>
					<Avatar {...props} />
				</Tooltip>
			))({
			size: 45,
			shape: "circle",
			icon: <UserOutlined />,
			style: {
				border: "1px solid ",
			},
			...inputProps,
		});

	return { image, avatar };
}

export default useImage;

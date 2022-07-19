import { message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useState } from "react";
import LoadingButton from "../Component/Button/LoadingButton";

function UploadAvatarContainer({
	customUploadButton = false,
	className = "",
	cropAspect = 1 / 1,
	cropShape = "rect",
	cropQuality = 0.4,
	uploadPhotoOnClick = async () => {},
}) {
	const [loading, setLoading] = useState(false);

	const [isValidPhoto, setIsValidPhoto] = useState(false);

	const uploadButton = (
		<LoadingButton
			isLoading={loading}
			title="Upload Photo"
			variant="link"
			size="sm"
			loadingColor="blue"
		/>
	);

	// const getBase64 = (img, callback) => {
	// 	const reader = new FileReader();
	// 	reader.addEventListener("load", () => callback(reader.result));
	// 	reader.readAsDataURL(img);
	// };

	const beforeUpload = (file) => {
		const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

		if (!isJpgOrPng) {
			message.error("You can only upload JPG/PNG file!");
		}

		const isLt2M = file.size / 1024 / 1024 < 2;

		if (!isLt2M) {
			message.error("Image must smaller than 2MB!");
		}

		setIsValidPhoto(isJpgOrPng && isLt2M);

		return isJpgOrPng && isLt2M;
	};

	const handleChange = (info) => {
		if (info.file.status === "uploading") {
			setLoading(true);
			return;
		}
		setLoading(false);

		// if (info.file.status === "done") {
		// 	// Get this url from response in real world.
		// 	getBase64(info.file.originFileObj, () => {
		// 		setLoading(false);
		// 		// console.log(url);
		// 	});
		// }
	};

	const app = (
		<ImgCrop
			aspect={cropAspect}
			shape={cropShape}
			quality={cropQuality}
			beforeCrop={isValidPhoto}
		>
			<Upload
				name="avatar"
				accept=".png, .jpg, .jpeg"
				className={`${className}`}
				showUploadList={false}
				customRequest={({ file, onError, onSuccess }) => {
					if (isValidPhoto) {
						const formData = new FormData();
						formData.append("file", file);

						uploadPhotoOnClick(formData)
							.then(() => onSuccess())
							.catch(onError);
					}

					return {
						abort() {
							// console.log("upload progress is aborted.");
						},
					};
				}}
				onStart={beforeUpload}
				onChange={handleChange}
				progress={{
					strokeColor: {
						"0%": "#108ee9",
						"100%": "#87d068",
					},
					strokeWidth: 3,
					format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
				}}
			>
				{uploadButton}
			</Upload>
		</ImgCrop>
	);
	return app;
}

export default UploadAvatarContainer;

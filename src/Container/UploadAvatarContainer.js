import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useState } from "react";
import LoadingButton from "../Component/Button/LoadingButton";
import { submitErrorHandlerPromise } from "../redux-store/dispatchPromise";

function UploadAvatarContainer({
	className = "",
	cropAspect = 1 / 1,
	cropShape = "rect",
	cropQuality = 0.4,
	uploadPhotoOnClick = async () => {},
}) {
	const [loading, setLoading] = useState(false);

	const uploadButton = (
		<LoadingButton
			isLoading={loading}
			title="Upload Photo"
			variant="link"
			size="sm"
			loadingColor="blue"
		/>
	);

	const isValidImage = (file) => {
		const isJpgOrPng =
			file.type === "image/jpg" ||
			file.type === "image/jpeg" ||
			file.type === "image/png";

		if (!isJpgOrPng) {
			submitErrorHandlerPromise("You can only upload JPG/PNG file!").catch(
				() => {
					return;
				}
			);
		}

		const isLt2M = file.size / 1024 / 1024 < 2;

		if (!isLt2M) {
			submitErrorHandlerPromise("Image must smaller than 2MB!").catch(() => {
				return;
			});
		}

		return isJpgOrPng && isLt2M;
	};

	const beforeUpload = (file) => {
		return isValidImage(file);
	};

	const handleChange = (info) => {
		if (info.file.status === "uploading") {
			setLoading(true);
			return;
		}
		setLoading(false);
	};

	const app = (
		<ImgCrop aspect={cropAspect} shape={cropShape} quality={cropQuality}>
			<Upload
				name="avatar"
				accept=".png, .jpg, .jpeg"
				className={`${className}`}
				showUploadList={false}
				customRequest={({ file, onError, onSuccess }) => {
					const formData = new FormData();
					formData.append("file", file);

					uploadPhotoOnClick(formData)
						.then(() => onSuccess())
						.catch(onError());

					return {
						abort() {
							// console.log("upload progress is aborted.");
						},
					};
				}}
				beforeUpload={beforeUpload}
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

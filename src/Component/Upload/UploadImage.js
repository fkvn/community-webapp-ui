import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useTranslation } from "react-i18next";
import useMessage from "../Hook/MessageHook/useMessage";

function UploadImage({
	uploadClassName = "",
	cropRotate = true,
	cropAspect = 1 / 1,
	// rect or round
	cropShape = "rect",
	cropQuality = 0.4,
	cropOk = "Save",
	cropModalWidth = "60%",
	imgCropProps = {},
	uploadProps = {},
	uploadImageOnClick = async (_formData) => {},
	uploadButton,
}) {
	const { errorMessage } = useMessage();
	const { t } = useTranslation();

	const isValidImage = (file) => {
		const isJpgOrPng =
			file.type === "image/jpg" ||
			file.type === "image/jpeg" ||
			file.type === "image/png";

		if (!isJpgOrPng) {
			errorMessage("message_only_image_msg").then(() => {
				return;
			});
		}

		const isLt2M = file.size / 1024 / 1024 < 2;

		if (!isLt2M) {
			errorMessage(`message_image_invalid_size_msg-{}-{"value": "2MB"}`).then(
				() => {
					return;
				}
			);
		}

		return isJpgOrPng && isLt2M;
	};

	const beforeUpload = (file) => {
		return isValidImage(file);
	};

	const handleChange = (info) => {
		if (info.file.status === "uploading") {
			return;
		}
	};

	return (
		<ImgCrop
			rotationSlider={cropRotate}
			aspectSlider={true}
			aspect={cropAspect}
			cropShape={cropShape}
			quality={cropQuality}
			modalOk={cropOk}
			modalWidth={cropModalWidth}
			{...imgCropProps}
		>
			<Upload
				name="avatar"
				accept=".png, .jpg, .jpeg"
				className={`${uploadClassName}`}
				showUploadList={false}
				customRequest={({ file, onError, onSuccess }) => {
					const formData = new FormData();
					formData.append("file", file);

					uploadImageOnClick(formData)
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
				{...uploadProps}
			>
				{uploadButton || t("upload_msg")}
			</Upload>
		</ImgCrop>
	);
}

export default UploadImage;

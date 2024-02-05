import { CameraOutlined } from "@ant-design/icons";
import { Avatar, Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useTranslation } from "react-i18next";
import useMessage from "../Hook/MessageHook/useMessage";

function UploadImageBtn({
	className = "",
	cropRotate = true,
	cropAspect = 1 / 1,
	// rect or round
	cropShape = "rect",
	cropQuality = 0.4,
	cropOk = "Save",
	uploadImageOnClick = async (_formData) => {},
	uploadIconSize = 25,
	uploadIconStyle = {
		right: 40,
		bottom: 0,
	},
	uploadButtonProp = {},
	uploadButtonTitle = "",
	uploadButtonAvatarProp = {},
	children = <></>,
}) {
	const { errorMessage } = useMessage();
	const { t } = useTranslation();

	const uploadButton = (
		<Button
			className="custom-center m-0 p-2"
			shape="pill"
			style={{
				borderRadius: "50px",
				borderColor: "blueviolet",
			}}
			size="medium"
			{...uploadButtonProp}
		>
			<Avatar
				size={uploadIconSize}
				icon={<CameraOutlined />}
				style={{ border: "1px solid white" }}
				{...uploadButtonAvatarProp}
			/>
			<span className="mx-2" style={{ fontSize: ".9rem" }}>
				{!uploadButtonTitle ? t("upload_msg") : uploadButtonTitle}
			</span>
		</Button>
	);

	const isValidImage = (file) => {
		const isJpgOrPng =
			file.type === "image/jpg" ||
			file.type === "image/jpeg" ||
			file.type === "image/png";

		if (!isJpgOrPng) {
			console.log("not image");
			errorMessage("message_only_image_msg").then(() => {
				return;
			});
		}

		const isLt2M = file.size / 1024 / 1024 < 2;

		if (!isLt2M) {
			console.log("tolarge");
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

	const app = (
		<div style={{ position: "relative", maxWidth: 200 }}>
			<div
				style={{
					position: "absolute",
					// zIndex: 20,
					...uploadIconStyle,
				}}
			>
				<ImgCrop
					rotationSlider={cropRotate}
					aspect={cropAspect}
					cropShape={cropShape}
					quality={cropQuality}
					modalOk={cropOk}
				>
					<Upload
						name="avatar"
						accept=".png, .jpg, .jpeg"
						className={`${className}`}
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
							format: (percent) =>
								percent && `${parseFloat(percent.toFixed(2))}%`,
						}}
					>
						{uploadButton}
					</Upload>
				</ImgCrop>
			</div>
			{children}
		</div>
	);
	return app;
}

export default UploadImageBtn;

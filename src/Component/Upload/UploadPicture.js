import { CameraOutlined } from "@ant-design/icons";
import { Avatar, Badge, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { errorMessage } from "../Hook/useMessage";

function UploadPicture({
	className = "",
	cropAspect = 1 / 1,
	cropShape = "rect",
	cropQuality = 0.4,
	cropOk = "Save",
	uploadPhotoOnClick = async () => {},
	uploadIconSize = 25,
	uploadIconStyle = {
		right: 0,
		bottom: 5,
	},
	children = {},
}) {
	const uploadButton = (
		<Badge>
			<Avatar
				size={uploadIconSize}
				icon={<CameraOutlined />}
				style={{ border: "1px solid white" }}
			/>
		</Badge>
	);

	const isValidImage = (file) => {
		const isJpgOrPng =
			file.type === "image/jpg" ||
			file.type === "image/jpeg" ||
			file.type === "image/png";

		if (!isJpgOrPng) {
			errorMessage("You can only upload JPG/PNG file!").catch(() => {
				return;
			});
		}

		const isLt2M = file.size / 1024 / 1024 < 2;

		if (!isLt2M) {
			errorMessage("Image must smaller than 2MB!").catch(() => {
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
			return;
		}
	};

	const app = (
		<div style={{ position: "relative" }}>
			<div
				style={{
					position: "absolute",
					zIndex: 300,
					...uploadIconStyle,
				}}
			>
				<ImgCrop
					aspect={cropAspect}
					shape={cropShape}
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

export default UploadPicture;

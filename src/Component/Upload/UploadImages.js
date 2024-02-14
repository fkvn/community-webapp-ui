import { InboxOutlined } from "@ant-design/icons";
import { Image, Modal, Typography, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useMessage from "../Hook/MessageHook/useMessage";

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

/**
 * @listType "picture-card" || "picture"
 * @cropShape "rect" || "round"
 * @cropAspect width / height
 * @returns
 */
function UploadImages({
	defaultFileList = [],
	maxCount = 5,
	multiple = true,
	dragger = false,
	listType = "picture-card",
	cropMaxZoom = 8,
	cropAspect = 1 / 1,
	cropShape = "rect",
	cropQuality = 0.8,
	cropModalOk = "Save",
	cropModalWidth = "80%",
	imgCropProps = {},
	uploadProps = {},
	uploadImage = (_formData) => Promise.resolve(),
	afterUpload = (_newFileList) => {},
	afterRemove = (_newFileList) => {},
	showReset = true,
}) {
	const { t } = useTranslation(["Form"]);
	const [fileList, setFileList] = useState(defaultFileList || []);
	const { errorMessage } = useMessage();
	const [preview, setPreview] = useState({
		open: false,
		url: "",
		title: "",
	});

	const { Dragger } = Upload;

	const onPreviewHandle = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreview({
			open: true,
			url: file.url || file.preview || "",
			title:
				file.name || file.url.substring(file.url.lastIndexOf("%2F") + 1) || "",
		});
	};

	/** DON'T DELETE THIS COMMENT
	 * 
	 * using for onChange event when not using customRequest
	    const handleChange = ({ fileList: newFileList }) => {
	  	setFileList(newFileList);
		 };
	 * 
	 */

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

		const isLt10M = file.size / 1024 / 1024 < 10;

		if (!isLt10M) {
			errorMessage(`message_image_invalid_size_msg-{}-{"value": "10MB"}`).then(
				() => {
					return;
				}
			);
		}

		return isJpgOrPng && isLt10M;
	};

	const beforeUpload = (file) => {
		return isValidImage(file);
	};

	const Preview = () => (
		<Modal
			open={preview.open}
			title={
				<Typography.Text
					style={{
						width: "96%",
					}}
					ellipsiss="true"
				>
					{preview.title}
				</Typography.Text>
			}
			width="80%"
			footer={null}
			onCancel={() => setPreview({ open: false })}
		>
			<Image className="w-100" src={preview.url} />
		</Modal>
	);

	const props = {
		name: "upload",
		className: "w-100",
		maxCount: maxCount,
		multiple: multiple,
		listType: listType,
		fileList: fileList,
		beforeUpload: beforeUpload,
		// onChange: handleChange,
		// if customRequest, don't enable the onChange func
		customRequest: ({ file }) => {
			const formData = new FormData();
			formData.append("file", file);

			uploadImage(formData)
				.then((url = "") => {
					file.status = url ? "done" : "error";
					file.percent = 100;

					if (url) file.url = url;

					const newFileList = [...fileList, file];

					// return newFileList
					afterUpload(newFileList);

					// update ant component
					setFileList(newFileList);
				})
				.catch(() => {
					file.status = "error";
					file.percent = 100;

					const newFileList = [...fileList, file];

					// update ant component
					setFileList(newFileList);
				});

			// added if this is a customRequest
			return {
				abort() {
					// console.log("upload progress is aborted.");
				},
			};
		},

		onRemove: ({ uid = "" }) => {
			const newFileList = fileList.filter((f) => f.uid !== uid);
			afterRemove(fileList.filter((img) => img.uid !== uid));

			// update state list if using with customRequest
			setFileList(newFileList);
		},
		onPreview: onPreviewHandle,
		...uploadProps,
	};

	const App = () => (
		<>
			<ImgCrop
				maxZoom={cropMaxZoom}
				rotationSlider={true}
				aspect={cropAspect}
				cropShape={cropShape}
				quality={cropQuality}
				modalOk={cropModalOk}
				showReset={showReset}
				modalWidth={cropModalWidth}
				{...imgCropProps}
			>
				{dragger ? (
					<Dragger className="my-2" {...props}>
						{" "}
						<p className="ant-upload-drag-icon">
							<InboxOutlined />
						</p>
						<p className="ant-upload-text">
							Click or drag file to this area to upload
						</p>
						<p className="ant-upload-hint">
							Support for a single or bulk upload.
						</p>
					</Dragger>
				) : (
					<Upload {...props}>
						{fileList.length >= maxCount ? null : t("form_upload_msg")}
					</Upload>
				)}
			</ImgCrop>
			<Preview />
		</>
	);
	return <App />;
}

export default UploadImages;

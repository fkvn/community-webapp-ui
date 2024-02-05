import { Form, Image, Modal, Typography, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useState } from "react";
import { uploadFileAxios } from "../../Axios/utilAxios";

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
	form = {},
	defaultFileList = [],
	maxCount = 5,
	listType = "picture",
	cropMaxZoom = 8,
	cropAspect = 1 / 1,
	cropShape = "rect",
	cropQuality = 0.8,
	cropModalOk = "Save",
	cropModalWidth = "50%",
	imgCropProps = {},
}) {
	const [fileList, setFileList] = useState(defaultFileList || []);
	const [preview, setPreview] = useState({
		open: false,
		url: "",
		title: "",
	});

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

	const handleChange = ({ fileList: newFileList }) => {
		setFileList(newFileList);
	};

	console.log(fileList);

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
			width="100%"
			style={{
				maxWidth: "50%",
			}}
			footer={null}
			onCancel={() => setPreview({ open: false })}
		>
			<Image
				style={{
					width: "100%",
				}}
				src={preview.url}
			/>
		</Modal>
	);
	// const normFile = ({ fileList: newFileList }) => {
	// 	// if (Array.isArray(e)) {
	// 	// 	return e;
	// 	// }

	// 	;

	// 	setFileList(newFileList);
	// };

	const App = () => (
		<>
			<Form.Item name={["guideBook", "upload"]} label="Upload">
				<ImgCrop
					maxZoom={cropMaxZoom}
					rotationSlider={true}
					aspect={cropAspect}
					cropShape={cropShape}
					quality={cropQuality}
					modalOk={cropModalOk}
					modalWidth={cropModalWidth}
					{...imgCropProps}
				>
					<Upload
						//  testing
						name="logo"
						maxCount={maxCount}
						action={(file) => {
							const formData = new FormData();
							formData.append("file", file);

							uploadFileAxios(formData).then((url = "") => {
								file.status = "done";
								file.percent = 100;
								file.url = url;

								const newFileList = [...fileList, file];

								// return newFileList
								form.setFieldValue(["guideBook", "upload"], newFileList);
								setFileList(newFileList);
							});
						}}
						listType={listType}
						fileList={fileList}
						onChange={handleChange}
						// onRemove={({ url = "" }) => console.log(url)}
						onPreview={onPreviewHandle}
					>
						"+ Upload"
						{/* {fileList.length >= maxCount ? null : } */}
					</Upload>
				</ImgCrop>
			</Form.Item>
			<Preview />
		</>
	);
	return <App />;
}

export default UploadImages;

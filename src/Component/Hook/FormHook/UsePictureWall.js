import { PlusOutlined } from "@ant-design/icons";
import { Form, Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import React, { useState } from "react";
import { uploadFileAxios } from "../../../Axios/axiosPromise";
import { PICTURE_LIST_PROP } from "../../../Util/ConstVar";
const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

function usePictureWall({
	form = {},
	itemProps = {},
	required = false,
	cropAspect = 1 / 1,
	cropShape = "rect",
	cropQuality = 0.4,
	cropOk = "Save",
	[`${PICTURE_LIST_PROP}`]: pictureList = [],
}) {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	const [fileList, setFileList] = useState(pictureList || []);

	const handleCancel = () => setPreviewOpen(false);
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
		setPreviewTitle(
			file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
		);
	};
	const handleChange = ({ fileList = [], file = {} }) => {
		const newFileList = fileList.filter((res) => res?.uid !== file?.uid);
		setFileList(newFileList);
		form?.setFieldValue(PICTURE_LIST_PROP, newFileList);
		form.validateFields([PICTURE_LIST_PROP]);
	};

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div
				style={{
					marginTop: 8,
				}}
			>
				Upload
			</div>
		</div>
	);
	return (
		<>
			<Form.Item
				name={PICTURE_LIST_PROP}
				className="m-0"
				initialValue={fileList}
				rules={[
					{ required: required, message: "Please provide at least 1 picture!" },
				]}
				{...itemProps}
				label={`${itemProps?.label || "Cover pictures"} ${
					required ? "" : "(Optional)"
				}`}
			>
				<>
					{" "}
					<ImgCrop
						maxZoom={8}
						rotate={true}
						aspect={cropAspect}
						shape={cropShape}
						quality={cropQuality}
						modalOk={cropOk}
					>
						<Upload
							listType="picture-card"
							fileList={fileList}
							onPreview={handlePreview}
							onChange={handleChange}
							customRequest={({ file = {} }) => {
								const formData = new FormData();
								formData.append("file", file);

								let newFileList = [
									...fileList,
									{
										uid: file?.uid,
										status: "uploading",
										percent: 30,
									},
								];
								form?.setFieldValue(PICTURE_LIST_PROP, newFileList);
								setFileList(newFileList);

								uploadFileAxios(formData)
									.then((res = {}) => {
										newFileList = newFileList.map((f) => {
											return {
												...f,
												...(f?.uid === file?.uid && {
													uid: file?.uid,
													status: "done",
													percent: 100,
													...res,
												}),
											};
										});
										setFileList(newFileList);
										form?.setFieldValue(PICTURE_LIST_PROP, newFileList);
										form.validateFields([PICTURE_LIST_PROP]);
									})
									.catch(() =>
										setFileList([
											...fileList,
											{
												name: "Upload failed",
												status: "error",
											},
										])
									);

								return {
									abort() {
										// console.log("upload progress is aborted.");
									},
								};
							}}
						>
							{fileList.length >= 12 ? null : uploadButton}
						</Upload>
					</ImgCrop>
					<Modal
						open={previewOpen}
						title={previewTitle}
						footer={null}
						onCancel={handleCancel}
					>
						<img
							alt="example"
							style={{
								width: "100%",
							}}
							src={previewImage}
						/>
					</Modal>
				</>
			</Form.Item>
		</>
	);
}

export default usePictureWall;

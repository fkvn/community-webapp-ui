import { Form } from "antd";
import { useTranslation } from "react-i18next";
import { PICTURE_LIST_PROP } from "../../Util/ConstVar";
import UploadImages from "../Upload/UploadImages";

function UploadImagesFormControl({
	itemName = PICTURE_LIST_PROP,
	label = "",
	labelProp = {},
	itemProps = {},
	required = true,
	showLabel = true,
	defaultFileList = [],
	maxCount = 5,
	listType = "picture-card",
	cropAspect = 1 / 1,
	cropShape = "rect",
	cropQuality = 0.8,
	imgCropProps = {},
	dragger = false,
	uploadProps = {},
	uploadImage = (_formData) => Promise.resolve(),
	afterUpload = (_newFileList) => {},
	afterRemove = (_newFileList) => {},
} = {}) {
	const { t } = useTranslation(["Form"]);

	const App = () => (
		<Form.Item
			name={itemName}
			className="m-0 w-100"
			rules={[
				{
					required: required,
					message: t("form_required_msg", { ns: "Form" }),
				},
			]}
			{...(showLabel && {
				label: (
					<span {...labelProp}>{`${label || t("form_upload_msg")} ${
						required ? "" : `(${t("form_optional_msg", { ns: "Form" })})`
					}`}</span>
				),
			})}
			{...itemProps}
		>
			<UploadImages
				defaultFileList={defaultFileList}
				dragger={dragger}
				maxCount={maxCount}
				listType={listType}
				cropAspect={cropAspect}
				cropShape={cropShape}
				cropQuality={cropQuality}
				imgCropProps={imgCropProps}
				uploadProps={uploadProps}
				uploadImage={uploadImage}
				afterUpload={afterUpload}
				afterRemove={afterRemove}
			/>
		</Form.Item>
	);
	return <App />;
}

export default UploadImagesFormControl;

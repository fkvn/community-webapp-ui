import { Flex, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import Title from "antd/lib/typography/Title";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadFileAxios } from "../../../../Axios/utilAxios";
import {
	BANNER_URL_PROP,
	CATEGORY_PROP,
	DESCRIPTION_PROP,
	GUIDE_BOOK_PATH,
	GUIDE_BOOK_PROP,
	TITLE_PROP,
	USER_REDUCER,
} from "../../../../Util/ConstVar";
import Auth from "../../../Auth/Auth";
import RTEFormControl from "../../../Form/RTEFormControl";
import RadioFormControl from "../../../Form/RadioFormControl";
import SubmitBtnFormControl from "../../../Form/SubmitBtnFormControl";
import TextFormControl from "../../../Form/TextFormControl";
import UploadImagesFormControl from "../../../Form/UploadImagesFormControl";
import useMessage from "../../../Hook/MessageHook/useMessage";
import useGuideBookPost from "../../../Hook/PostHook/useGuideBookPost";
import FormPageHeader from "../../MainLayout/Header/FormPageHeader";

function NewGuideBookPost() {
	const { t } = useTranslation(["Form"]);
	const { errorMessage } = useMessage();
	const { profile } = useSelector((state) => state[`${USER_REDUCER}`]);
	const navigate = useNavigate();
	const [saving, setSaving] = useState(false);

	const { fetchGuideBookCategories, createGuideBook } = useGuideBookPost();
	const [form] = useForm();
	const newPostAuthorities = [
		"ROLE_ADMIN",
		"ROLE_SUPER_ADMIN",
		"ROLE_CONTRIBUTOR",
		"GUIDEBOOK_CREATE",
	];

	const isUserAuthorizedCreateNewPost = () =>
		(profile?.authorities || []).some((v) => newPostAuthorities.includes(v));

	const handleUploadFile = (formData) => uploadFileAxios(formData);

	const onFinish = () => {
		form
			.validateFields()
			.then(() => {
				setSaving(true);
				createGuideBook(profile?.id, form.getFieldsValue())
					.then((id) => {
						window.localStorage.removeItem("editor-content");
						navigate(`${GUIDE_BOOK_PATH}/${id}`);
					})
					.finally(() => setSaving(false));
			})
			.catch(() => {});
	};

	const NewPortForm = () => (
		<Form form={form} layout="vertical" onFinish={onFinish}>
			<Flex vertical gap={30}>
				<TextFormControl
					itemProps={{
						itemName: [GUIDE_BOOK_PROP, TITLE_PROP],
						label: t("form_topic_msg"),
						labelProp: {
							style: {
								fontWeight: "bold",
								color: "#002E60",
							},
						},
					}}
					inputProps={{
						style: {
							background: "#F7F7FC",
						},
						styles: {
							input: {
								background: "#F7F7FC",
								color: "#093869",
							},
						},
					}}
					required
				/>

				<UploadImagesFormControl
					itemName={[GUIDE_BOOK_PROP, BANNER_URL_PROP]}
					label={t("form_cover_msg")}
					labelProp={{ className: "fw-bold" }}
					required={true}
					cropAspect={16 / 9}
					maxCount={1}
					uploadImage={handleUploadFile}
					afterUpload={(newFileList) => {
						form.setFieldValue(
							[GUIDE_BOOK_PROP, BANNER_URL_PROP],
							newFileList[0]?.url || ""
						);
						form.validateFields([[GUIDE_BOOK_PROP, BANNER_URL_PROP]]);
					}}
					afterRemove={(newFileList) => {
						form.setFieldValue(
							[GUIDE_BOOK_PROP, BANNER_URL_PROP],
							newFileList[0]?.url || ""
						);
					}}
				/>

				<RadioFormControl
					required={true}
					itemProps={{
						itemName: [GUIDE_BOOK_PROP, CATEGORY_PROP],
						label: t("form_category_msg"),
						labelProp: {
							className: "fw-bold",
						},
					}}
					options={fetchGuideBookCategories().map((v) => {
						return {
							label: v?.title,
							value: v?.key,
						};
					})}
					radioGroupProps={{
						className: "",
					}}
					radioProps={{
						className: "m-2 radio-before-w-0",
						style: {
							borderRadius: "0.5rem",
						},
					}}
				/>
				<RTEFormControl
					itemName={[GUIDE_BOOK_PROP, DESCRIPTION_PROP]}
					labelProp={{ className: "mb-2 fw-bold" }}
					onUpdate={(editor) => {
						form.setFieldValue(
							[GUIDE_BOOK_PROP, DESCRIPTION_PROP],
							editor?.getHTML()
						);
						form.validateFields([[GUIDE_BOOK_PROP, DESCRIPTION_PROP]]);
					}}
				/>

				<Flex justify="center" className="w-100">
					<SubmitBtnFormControl
						loading={saving}
						disabled={saving}
						className="w-100"
						btnProps={{
							size: "large",
							style: {
								padding: "1.5rem 5rem",
							},
						}}
						onClick={onFinish}
					/>
				</Flex>
			</Flex>
		</Form>
	);

	const NewPostFormSection = () => (
		<Flex
			className="p-5 p-lg-5 bg-white"
			align="center"
			vertical
			style={{
				paddingTop: "2rem",
				minHeight: "20rem",
			}}
		>
			<Flex
				className="w-100"
				style={{
					maxWidth: "70%",
				}}
				align="flext-start"
				vertical
				gap={30}
			>
				<Title level={2} className="text-align-start">
					{t("form_new_guidebook_msg")}
				</Title>

				<NewPortForm />
			</Flex>
		</Flex>
	);

	const App = () => (
		<>
			<FormPageHeader />
			<NewPostFormSection />
		</>
	);

	return (
		<Auth>
			{isUserAuthorizedCreateNewPost ? (
				<App />
			) : (
				errorMessage("message_access_denied_msg")
			)}
		</Auth>
	);
}

export default NewGuideBookPost;

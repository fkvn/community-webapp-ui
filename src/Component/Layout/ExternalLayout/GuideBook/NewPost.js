import { Button, Flex, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import Title from "antd/lib/typography/Title";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { uploadFileAxios } from "../../../../Axios/utilAxios";
import {
	BANNER_URL_PROP,
	CATEGORY_PROP,
	GUIDE_BOOK_PROP,
	TITLE_PROP,
	USER_REDUCER,
} from "../../../../Util/ConstVar";
import Auth from "../../../Auth/Auth";
import RadioFormControl from "../../../Form/RadioFormControl";
import TextFormControl from "../../../Form/TextFormControl";
import UploadImagesFormControl from "../../../Form/UploadImagesFormControl";
import useGuideBookPost from "../../../Hook/PostHook/useGuideBookPost";
import FormPageHeader from "../../MainLayout/Header/FormPageHeader";

function NewGuideBookPost() {
	const { t } = useTranslation(["Form"]);
	const { profile } = useSelector((state) => state[`${USER_REDUCER}`]);

	const { fetchGuideBookCategories } = useGuideBookPost();
	const [form] = useForm();
	const newPostAuthorities = [
		"ROLE_ADMIN",
		"ROLE_SUPER_ADMIN",
		"ROLE_CONTRIBUTOR",
		"GUIDEBOOK_CREATE",
	];

	const handleUploadFile = (formData) => uploadFileAxios(formData);

	const onFinish = (values) => {
		console.log("Received values of form: ", values);
	};

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
					maxWidth: "45rem",
				}}
				align="flext-start"
				vertical
				gap={20}
			>
				<Title level={2} className="text-align-start">
					{t("form_new_guidebook_msg")}
				</Title>

				<Form form={form} layout="vertical" onFinish={onFinish}>
					<Flex vertical gap={20}>
						<TextFormControl
							itemProps={{
								itemName: [GUIDE_BOOK_PROP, TITLE_PROP],
								label: t("form_topic_msg"),
								labelProp: {
									style: {
										fontWeight: "500",
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
							cropAspect={16 / 9}
							maxCount={1}
							uploadImage={handleUploadFile}
							afterUpload={(newFileList) =>
								form.setFieldValue(
									[GUIDE_BOOK_PROP, BANNER_URL_PROP],
									newFileList[0]?.url
								)
							}
							afterRemove={(newFileList) =>
								form.setFieldValue(
									[GUIDE_BOOK_PROP, BANNER_URL_PROP],
									newFileList[0]?.url
								)
							}
						/>

						<RadioFormControl
							required={true}
							itemProps={{
								itemName: CATEGORY_PROP,
								label: t("form_category_msg"),
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
						<Button
							// onClick={() => {
							// 	form
							// 		.validateFields()
							// 		.then(() => {
							// 			console.log(form.getFieldsValue());
							// 		})
							// 		.catch(() => {});
							// }}
							htmlType="submit"
						>
							Submit
						</Button>
					</Flex>
				</Form>
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
			<App />
		</Auth>
	);
}

export default NewGuideBookPost;

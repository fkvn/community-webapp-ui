import { Flex, Form, Skeleton } from "antd";
import { useForm } from "antd/es/form/Form";
import Title from "antd/lib/typography/Title";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { uploadFileAxios } from "../../../../Axios/utilAxios";
import {
	BANNER_URL_PROP,
	CATEGORY_PROP,
	DESCRIPTION_PROP,
	GUIDE_BOOK_EDIT_POST_PATH,
	GUIDE_BOOK_PROP,
	REDIRECT_URI,
	TITLE_PROP,
	USER_REDUCER,
} from "../../../../Util/ConstVar";
import Auth from "../../../Auth/Auth";
import FloatBtnGroup from "../../../FloatButton/FloatBtnGroup";
import NewGuideBookPostFloatBtn from "../../../FloatButton/GuideBook/NewPostFloatBtn";
import RTEFormControl from "../../../Form/RTEFormControl";
import RadioFormControl from "../../../Form/RadioFormControl";
import SubmitBtnFormControl from "../../../Form/SubmitBtnFormControl";
import TextFormControl from "../../../Form/TextFormControl";
import UploadImagesFormControl from "../../../Form/UploadImagesFormControl";
import useMessage from "../../../Hook/MessageHook/useMessage";
import useGuideBookPost from "../../../Hook/PostHook/useGuideBookPost";
import FormPageHeader from "../../MainLayout/Header/FormPageHeader";

function EditGuideBookPost({ customRedirectUri = "" }) {
	const { t } = useTranslation(["Form"]);
	const { errorMessage } = useMessage();
	const { profile } = useSelector((state) => state[`${USER_REDUCER}`]);

	const navigate = useNavigate();
	const [params] = useSearchParams();
	const redirectUri =
		customRedirectUri || params.get(REDIRECT_URI) || "my-profile?menu=post";

	console.log(redirectUri);

	const [saving, setSaving] = useState(false);
	const { id } = useParams();

	const { fetchGuideBook, fetchGuideBookCategories, patchGuideBook } =
		useGuideBookPost();
	const [form] = useForm();

	const editPostAuthorities = [
		"ROLE_ADMIN",
		"ROLE_SUPER_ADMIN",
		"ROLE_CONTRIBUTOR",
	];

	const isUserAuthorizedEditPost = (profileOwnerId) =>
		(profile?.authorities || []).some((v) => editPostAuthorities.includes(v)) &&
		profile?.id === profileOwnerId;

	console.log(profile);
	console.log(
		(profile?.authorities || []).some((v) => editPostAuthorities.includes(v))
	);

	const [authorized, setAuthorized] = useState(false);

	const [defaultPostValues, setDefaultPostValues] = useState({});

	const formatItem = ({ id, owner, details }) => {
		window.localStorage.setItem("editor-content", details?.description);
		return {
			id: id,
			profileOwnerId: owner?.id,
			[`${GUIDE_BOOK_PROP}`]: {
				[`${BANNER_URL_PROP}`]: details?.bannerUrl,
				[`${CATEGORY_PROP}`]: details?.category,
				[`${TITLE_PROP}`]: details?.title,
				[`${DESCRIPTION_PROP}`]: details?.description,
			},
		};
	};

	const fetchItem = (id) =>
		fetchGuideBook(id).then((res = {}) => {
			const formattedItem = formatItem(res);

			if (isUserAuthorizedEditPost(formattedItem.profileOwnerId)) {
				form.setFieldsValue(formattedItem);
				setDefaultPostValues(formattedItem);
				setAuthorized(true);
			} else errorMessage("message_access_denied_msg");
		});

	useEffect(() => {
		fetchItem(id);
	}, [id]);

	const handleUploadFile = (formData) => uploadFileAxios(formData);

	const onFinish = (closeAfterSave = false) => {
		form
			.validateFields()
			.then(() => {
				setSaving(true);
				patchGuideBook(id, profile?.id, form.getFieldsValue())
					.then(() => {
						if (closeAfterSave) {
							window.localStorage.removeItem("editor-content");
							navigate(`/${redirectUri}`);
						}
						// navigate(`${GUIDE_BOOK_PATH}/${id}`);
					})
					.finally(() => setSaving(false));
			})
			.catch(() => {});
	};

	const NewPortForm = () => (
		<Form
			form={form}
			layout="vertical"
			onFinish={onFinish}
			// initialValues={defaultPostValues}
		>
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
					defaultFileList={[
						{
							uid: defaultPostValues?.id || 1,
							status: "done",
							// name: "asda",
							url: form.getFieldValue([GUIDE_BOOK_PROP, BANNER_URL_PROP]),
						},
					]}
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
				{id && (
					<RTEFormControl
						itemName={[GUIDE_BOOK_PROP, DESCRIPTION_PROP]}
						labelProp={{ className: "mb-2 fw-bold" }}
						onUpdate={(editor) => {
							form.setFieldValue(
								[GUIDE_BOOK_PROP, DESCRIPTION_PROP],
								editor?.getHTML()
							);
							form.validateFields([GUIDE_BOOK_PROP, DESCRIPTION_PROP]);
						}}
					/>
				)}

				<Flex justify="center" className="w-100" gap={20}>
					<SubmitBtnFormControl
						loading={saving}
						disabled={saving}
						popconfirm={true}
						title={t("form_delete_record_msg")}
						className="w-100 bg-danger"
						btnProps={{
							size: "large",
							style: {
								padding: "1.5rem 5rem",
							},
						}}
					/>

					<SubmitBtnFormControl
						loading={saving}
						disabled={saving}
						title={t("form_save_and_close_msg")}
						className="w-100 bg-primary"
						btnProps={{
							size: "large",
							style: {
								padding: "1.5rem 5rem",
							},
						}}
					/>

					<SubmitBtnFormControl
						loading={saving}
						disabled={saving}
						className="w-100 bg-success"
						title={t("form_save_msg")}
						btnProps={{
							size: "large",
							style: {
								padding: "1.5rem 5rem",
							},
						}}
						onClick={() => onFinish(false)}
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
				<Title level={2} className="text-align-start text-warning">
					{t("form_edit_guidebook_msg")}
				</Title>
				{authorized ? <NewPortForm /> : <Skeleton active />}
			</Flex>
		</Flex>
	);

	const App = () => (
		<>
			<FormPageHeader />
			<NewPostFormSection />
			<FloatBtnGroup
				buttons={[
					<NewGuideBookPostFloatBtn
						redirectUri={`${GUIDE_BOOK_EDIT_POST_PATH.slice(1)}/${id}`}
					/>,
				]}
			/>
		</>
	);

	return (
		<Auth>
			<App />
		</Auth>
	);
}

export default EditGuideBookPost;

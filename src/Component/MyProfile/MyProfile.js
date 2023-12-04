import { Flex, Form, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import Title from "antd/lib/typography/Title";
import { useTranslation } from "react-i18next";
import {
	FIRSTNAME_PROP,
	IS_EMAIL_PUBLIC_PROP,
	IS_PHONE_PUBLIC_PROP,
	LASTNAME_PROP,
	PICTURE_PROP,
	REGION_PROP,
	USERNAME_PROP,
} from "../../Util/constVar";
import CheckboxFormControl from "../Form/CheckboxFormControl";
import EmailFormControl from "../Form/EmailFormControl";
import PhoneFormControl from "../Form/PhoneFormControl";
import SubmitBtnFormControl from "../Form/SubmitBtnFormControl";
import TextFormControl from "../Form/TextFormControl";
import ImageFrame from "../ImageFrame/ImageFrame";
import UploadPicture from "../Upload/UploadPicture";

function MyProfile({
	profile = {},
	changeProfileAvatar = () => {},
	updateProfile = () => {},
}) {
	const { t } = useTranslation(["Default"]);
	const [form] = useForm();

	const updateProfileHandle = () => {
		form
			.validateFields()
			.then(() => updateProfile(form.getFieldsValue()))
			.catch(() => {});
	};

	const ProfileHeader = () => (
		<Typography>
			<Title level={2}>{t("my_profile_msg")}</Title>
		</Typography>
	);

	const ProfileAvatar = () => (
		<>
			<ImageFrame
				frameClassName="my-2"
				imgProp={{
					width: 150,
					style: {
						borderRadius: "100px",
					},
				}}
				src={profile[`${PICTURE_PROP}`]}
			/>
			<UploadPicture
				className="text-center w-100"
				uploadIconStyle={{
					right: 70,
					bottom: 10,
				}}
				cropShape="round"
				uploadPhotoOnClick={changeProfileAvatar}
			/>
		</>
	);

	const ProfileUserName = () => (
		<TextFormControl
			itemProps={{
				label: t("user_name_msg"),
				itemName: USERNAME_PROP,
				className: "my-0",
				style: {
					minWidth: 400,
					maxWidth: "100%",
					marginRight: 20,
				},

				labelProp: {
					className: "c-primary",
				},
			}}
			required={true}
			extra={
				<CheckboxFormControl
					itemProps={{
						itemName: "",
						label: t("public_msg"),
					}}
					inputProps={{
						disabled: true,
						defaultChecked: true,
					}}
				/>
			}
		/>
	);

	const ProfileEmail = () => (
		<EmailFormControl
			itemProps={{
				className: "my-0",
				style: {
					minWidth: 400,
					maxWidth: "100%",
					marginRight: 20,
				},

				labelProp: {
					className: "c-primary",
				},
			}}
			extra={
				<CheckboxFormControl
					itemProps={{
						itemName: IS_EMAIL_PUBLIC_PROP,
						label: t("public_msg"),
					}}
				/>
			}
		/>
	);

	const ProfileFirstName = () => (
		<TextFormControl
			itemProps={{
				label: t("first_name_msg"),
				itemName: FIRSTNAME_PROP,
				className: "my-0",
				style: {
					minWidth: 400,
					maxWidth: "100%",
					marginRight: 20,
				},
				labelProp: {
					className: "c-primary",
				},
			}}
		/>
	);

	const ProfileLastName = () => (
		<TextFormControl
			itemProps={{
				label: t("last_name_msg"),
				itemName: LASTNAME_PROP,
				className: "my-0",
				style: {
					minWidth: 400,
					maxWidth: "100%",
					marginRight: 20,
				},

				labelProp: {
					className: "c-primary",
				},
			}}
		/>
	);

	const ProfilePhone = () => (
		<PhoneFormControl
			itemProps={{
				className: "my-0",
				style: {
					minWidth: 400,
					maxWidth: "100%",
					marginRight: 20,
				},

				labelProp: {
					className: "c-primary",
				},
			}}
			required={false}
			extra={
				<CheckboxFormControl
					itemProps={{
						itemName: IS_PHONE_PUBLIC_PROP,
						label: t("public_msg"),
					}}
				/>
			}
		/>
	);

	const ProfileUpdateForm = () => (
		<Form
			form={form}
			id="my-profile-form"
			layout="vertical"
			initialValues={{
				...profile,
				[`${REGION_PROP}`]: "US",
			}}
		>
			<Flex vertical gap="large" className="my-4">
				<ProfileUserName />

				<ProfileEmail />
				<ProfileFirstName />

				<ProfileLastName />
				<ProfilePhone />

				<SubmitBtnFormControl
					title="Save"
					className="mt-5"
					style={{
						maxWidth: 400,
					}}
					onClick={updateProfileHandle}
				/>
			</Flex>
		</Form>
	);

	const App = () => (
		<>
			<ProfileHeader />
			<ProfileAvatar />
			<ProfileUpdateForm />
		</>
	);
	return <App />;
}

export default MyProfile;

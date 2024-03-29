import { Flex, Form, Grid, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import Title from "antd/lib/typography/Title";
import { useTranslation } from "react-i18next";
import {
	FIRSTNAME_PROP,
	ID_PROP,
	IS_EMAIL_PUBLIC_PROP,
	IS_PHONE_PUBLIC_PROP,
	LASTNAME_PROP,
	PROFILE_AVATAR_PROP,
	REGION_PROP,
	USERNAME_PROP,
} from "../../../../Util/ConstVar";
import CheckboxFormControl from "../../../Form/CheckboxFormControl";
import EmailFormControl from "../../../Form/EmailFormControl";
import PhoneFormControl from "../../../Form/PhoneFormControl";
import SubmitBtnFormControl from "../../../Form/SubmitBtnFormControl";
import TextFormControl from "../../../Form/TextFormControl";
import ImageFrame from "../../../ImageFrame/ImageFrame";
import UploadImageBtn from "../../../Upload/UploadImageBtn";

function UserProfile({
	profile = {},
	changeProfileAvatar = async (_id, _formData) => {},
	updateProfile = async (_id, _formData) => {},
}) {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const { t } = useTranslation(["Default", "Form"]);
	const [form] = useForm();

	const {
		[`${PROFILE_AVATAR_PROP}`]: avatarUrl = "",
		[`${ID_PROP}`]: id = "",
	} = profile;

	const updateProfileHandle = () => {
		form
			.validateFields()
			.then(() => updateProfile(id, form.getFieldsValue()).catch(() => {}))
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
				src={avatarUrl}
			/>
			<UploadImageBtn
				className="text-center w-100"
				uploadIconStyle={{
					right: 70,
					bottom: 10,
				}}
				cropShape="round"
				uploadImageOnClick={(formData) =>
					changeProfileAvatar(id, formData).catch(() => {})
				}
			/>
		</>
	);

	const ProfileUserName = () => (
		<TextFormControl
			flexProp={{
				gap: screens.lg ? 20 : 0,
			}}
			itemProps={{
				label: t("user_name_msg"),
				itemName: USERNAME_PROP,
				className: "m-0",
				style: {
					minWidth: screens.lg ? "25rem" : "100%",
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
						label: t("allow_public_msg"),
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
			flexProp={{
				gap: screens.lg ? 20 : 0,
			}}
			itemProps={{
				className: "m-0",
				style: {
					minWidth: screens.lg ? "27rem" : "100%",
				},

				labelProp: {
					className: "c-primary",
				},
			}}
			extra={
				<CheckboxFormControl
					itemProps={{
						itemName: IS_EMAIL_PUBLIC_PROP,
						label: t("allow_public_msg"),
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
				className: "m-0",
				style: {
					minWidth: screens.lg ? "27rem" : "100%",
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
				className: "m-0",
				style: {
					minWidth: screens.lg ? "27rem" : "100%",
				},

				labelProp: {
					className: "c-primary",
				},
			}}
		/>
	);

	const ProfilePhone = () => (
		<PhoneFormControl
			flexProp={{
				gap: screens.lg ? 20 : 0,
			}}
			itemProps={{
				className: "m-0",
				style: {
					minWidth: screens.lg ? "27rem" : "100%",
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
						label: t("allow_public_msg"),
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
			style={{
				minWidth: screens.md ? "25rem" : "10rem",
			}}
		>
			<Flex vertical gap="large" className="my-4 w-100">
				<ProfileUserName />

				<ProfileEmail />
				<ProfileFirstName />

				<ProfileLastName />
				<ProfilePhone />

				<SubmitBtnFormControl
					title={t("form_submit_msg", { ns: "Form" })}
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

export default UserProfile;

import { Button, Col, Form, Row, Space, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import {
	DEFAULT_USER_INFO,
	DESCRIPTION_PROP,
	EMAIL_PROP,
	FIRSTNAME_PROP,
	INFO_PROP,
	IS_DESCRIPTION_PUBLIC_PROP,
	IS_EMAIL_PUBLIC_PROP,
	IS_LOCATION_PUBLIC,
	IS_PHONE_PUBLIC_PROP,
	IS_WEBSITE_PUBLIC_PROP,
	LASTNAME_PROP,
	LOCATION_OBJ,
	NAME_PROP,
	PHONE_PROP,
	PICTURE_LIST_PROP,
	WEBSITE_PROP,
} from "../../Util/ConstVar";
import useAddress from "../Hook/FormHook/useAddress";
import useCheckBox from "../Hook/FormHook/useCheckBox";
import useEmail from "../Hook/FormHook/useEmail";
import usePhone from "../Hook/FormHook/usePhone";
import usePictureWall from "../Hook/FormHook/UsePictureWall";
import useTextarea from "../Hook/FormHook/useTextarea";
import useUrl from "../Hook/FormHook/useUrl";
import useUsername from "../Hook/FormHook/useUsername";

function EditProfile({ profile = {} }) {
	const [form] = useForm();
	const { [`${INFO_PROP}`]: info } = {
		...profile,
		[`${INFO_PROP}`]: { ...DEFAULT_USER_INFO, ...profile?.[`${INFO_PROP}`] },
	};

	const header = (
		<Row justify="center">
			<Col>
				<Typography.Title level={5} type="danger">
					Please review carefully and click "Update and Save" after updating the
					profile information
				</Typography.Title>
			</Col>
		</Row>
	);

	const address = (
		<Row justify="start" gutter={[50, 10]}>
			<Col>
				{useAddress({
					itemProps: {
						label: "Address",
						extra: (
							<Typography.Text type="danger" ellipsis>
								<small>
									The address would help the system to suggest better local
									services.
								</small>
							</Typography.Text>
						),
						shouldUpdate: true,
					},
					inputProps: { prefix: "" },
					required: false,
					defaultLocation: info?.[`${LOCATION_OBJ}`] || {},
				})}
			</Col>
			<Col>
				{useCheckBox({
					itemProps: {
						name: IS_LOCATION_PUBLIC,
						initialValue: info?.[`${IS_LOCATION_PUBLIC}`] || false,
					},
					title: "Public your address",
				})}
			</Col>
		</Row>
	);

	const email = (
		<Row justify="start" gutter={[50, 10]}>
			<Col>
				{useEmail({
					itemProps: {
						label: "Email Address",
						initialValue: info?.[`${EMAIL_PROP}`] || "",
						extra: (
							<Typography.Text type="warning" ellipsis>
								<small>Must provide at least one email or phone number</small>
							</Typography.Text>
						),
					},
					required: false,
				})}
			</Col>
			<Col>
				{useCheckBox({
					itemProps: {
						name: IS_EMAIL_PUBLIC_PROP,
						initialValue: info?.[`${IS_EMAIL_PUBLIC_PROP}`] || false,
					},
					title: "Public your email",
				})}
			</Col>
		</Row>
	);

	const phone = (
		<Row justify="start" gutter={[50, 10]}>
			<Col>
				{usePhone({
					itemProps: {
						initialValue: info?.[`${PHONE_PROP}`] || "",
						extra: (
							<Typography.Text type="warning" ellipsis>
								<small>Must provide at least one email or phone number</small>
							</Typography.Text>
						),
					},
					required: false,
				})}
			</Col>
			<Col>
				{useCheckBox({
					itemProps: {
						name: IS_PHONE_PUBLIC_PROP,
						initialValue: info?.[`${IS_PHONE_PUBLIC_PROP}`] || false,
					},
					title: "Public your phone",
				})}
			</Col>
		</Row>
	);

	const description = (
		<Row justify="start" gutter={[50, 10]}>
			<Col xs={24}>
				{useTextarea({
					itemProps: {
						label: "Profile Description",
						initialValue: info?.[`${DESCRIPTION_PROP}`] || "",
					},
				})}
			</Col>
			<Col>
				{useCheckBox({
					itemProps: {
						name: IS_DESCRIPTION_PUBLIC_PROP,
						initialValue: info?.[`${IS_DESCRIPTION_PUBLIC_PROP}`] || false,
					},
					title: "Public your description",
				})}
			</Col>
		</Row>
	);

	const website = (
		<Row justify="start" gutter={[50, 10]}>
			<Col>
				{useUrl({
					itemProps: {
						initialValue: info?.[`${WEBSITE_PROP}`] || "",
					},
				})}
			</Col>
			<Col>
				{useCheckBox({
					itemProps: {
						name: IS_WEBSITE_PUBLIC_PROP,
						initialValue: info?.[`${IS_WEBSITE_PUBLIC_PROP}`] || false,
					},
					title: "Public your website",
				})}
			</Col>
		</Row>
	);

	const infoForm = (
		<Form className="my-4 " form={form}>
			<Space
				size={20}
				direction="vertical"
				className="w-100 my-2 my-xl-4 "
				// style={{ maxWidth: "35rem" }}
			>
				{useUsername({
					itemProps: { initialValue: info?.[`${NAME_PROP}`] || "" },
				})}
				{useUsername({
					itemProps: {
						name: FIRSTNAME_PROP,
						label: "First Name",
						initialValue: info?.[`${FIRSTNAME_PROP}`] || "",
					},
					required: false,
				})}
				{useUsername({
					itemProps: {
						name: LASTNAME_PROP,
						label: "Last Name",
						initialValue: info?.[`${LASTNAME_PROP}`] || "",
					},
					required: false,
				})}
				{usePictureWall({
					form: form,
					itemProps: {
						label: "Cover pictures",
					},
					[`${PICTURE_LIST_PROP}`]: info?.[`${PICTURE_LIST_PROP}`],
				})}
				{address}
				{email}
				{phone}
				{description}
				{website}
				<Row justify="center" className="mt-4">
					<Col>
						<Button
							type="primary"
							size="large"
							shape="round"
							block
							onClick={() =>
								console.log(
									form.getFieldValue(IS_LOCATION_PUBLIC) +
										" . " +
										form.getFieldValue(IS_EMAIL_PUBLIC_PROP)
								)
							}
						>
							Update and Save
						</Button>
					</Col>
				</Row>
			</Space>
		</Form>
	);

	const app = (
		<Row justify="center" className="m-4 m-xl-5">
			<Col>
				{header}
				{infoForm}
			</Col>
		</Row>
	);
	return app;
}

export default EditProfile;

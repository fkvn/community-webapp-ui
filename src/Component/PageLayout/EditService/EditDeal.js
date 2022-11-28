import { Button, Checkbox, Col, Divider, Form, Row, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import { useState } from "react";
import {
	CATEGORY_PROP,
	CONTACT_INFO_PROP,
	DATE_PROP,
	DEFAULT_DEAL_INFO,
	EMAIL_PROP,
	EXPIRED_ON_PROP,
	ID_PROP,
	INFO_PROP,
	IS_EMAIL_PUBLIC_PROP,
	IS_PHONE_PUBLIC_PROP,
	IS_WEBSITE_PUBLIC_PROP,
	LOCATION_OBJ,
	LOCATION_PROP,
	PHONE_PROP,
	PICTURE_LIST_PROP,
	TITLE_PROP,
	WEBSITE_PROP,
} from "../../../Util/ConstVar";
import useAddress from "../../Hook/FormHook/useAddress";
import useContactInfo from "../../Hook/FormHook/useContactInfo";
import useDatePicker from "../../Hook/FormHook/useDatePicker";
import usePictureWall from "../../Hook/FormHook/UsePictureWall";
import usePostStatus from "../../Hook/FormHook/usePostStatus";
import useRadioGroup from "../../Hook/FormHook/useRadioGroup";
import useTextarea from "../../Hook/FormHook/useTextarea";
import useUsername from "../../Hook/FormHook/useUsername";
import usePost from "../../Hook/usePost";

function EditDeal({ service = {}, editing = false, ownerId = null }) {
	const [form] = useForm();
	const {
		[`${ID_PROP}`]: id = -1,
		[`${INFO_PROP}`]: { [`${PICTURE_LIST_PROP}`]: pictureList = [], ...info },
	} = {
		...service,
		[`${INFO_PROP}`]: { ...DEFAULT_DEAL_INFO, ...service?.[`${INFO_PROP}`] },
	};

	const [moreInfor, setMoreInfor] = useState(editing);
	const [updating, setUpdating] = useState(false);

	const { updateDeal, createDeal } = usePost();

	const header = (
		<Row justify="center" className="text-center">
			<Col>
				<Typography.Title level={1} className="c-primary-important">
					Deal and Promotion Service
				</Typography.Title>
				{editing && (
					<Typography.Title level={5} type="danger">
						Please review carefully and click "Save and Update" after updating
						the service information
					</Typography.Title>
				)}
			</Col>
		</Row>
	);

	const title = useUsername({
		itemProps: {
			name: TITLE_PROP,
			label: "Promotion Title",
		},
		inputProps: {
			placeholder: "Promotion Title",
		},
	});

	const address = useAddress({
		itemProps: {
			label: "Promotion Area / Post Area?",
			labelCol: { span: 24 },
		},
		inputProps: { prefix: "" },
		defaultLocation: editing ? info?.[`${LOCATION_PROP}`] || {} : {},
	});

	const coverPictures = usePictureWall({
		form: form,
		itemProps: {
			label: "Upload promotion’s photos",
			labelCol: { span: 24 },
		},
		required: true,
		cropAspect: 16 / 9,
		[`${PICTURE_LIST_PROP}`]: (editing ? pictureList : []).map((res) => {
			return { url: res };
		}),
	});

	const contactInfo = useContactInfo({
		info: editing ? info?.[`${CONTACT_INFO_PROP}`] : {},
	});

	const status = usePostStatus();

	const description = useTextarea({
		itemProps: {
			label: "Promotion Description",
			labelCol: { span: 24 },
		},
		inputProps: {
			placeholder: "More information about the service",
		},
	});

	const category = useRadioGroup({
		form: form,
		options: [
			{
				value: "Restaurant",
				title: "Restaurant",
			},
			{
				value: "Massage / Spa",
				title: "Massage / Spa",
			},
			{
				value: "Clothing & Accessories",
				title: "Clothing & Accessories",
			},
			{
				value: "Insurance",
				title: "Insurance",
			},
		],
		itemProps: {
			name: CATEGORY_PROP,
			label: "Promotion Category ",
			labelCol: { span: 24 },
		},
		required: false,
		withOther: true,
	});

	const expiredOn = useDatePicker({
		itemProps: {
			label: "Expiration Date",
		},
		inputProps: {
			showTime: { defaultValue: moment("00:00:00", "HH:mm:ss") },
			format: "MM/DD/YYYY HH:mm:ss",
		},
	});

	const withMoreInfo = (
		<>
			<Divider className="m-0">
				<Checkbox
					checked={moreInfor}
					onChange={(e) => {
						setUpdating(true);
						setMoreInfor(e.target.checked);
					}}
					disabled={editing}
				>
					More Information
				</Checkbox>
			</Divider>
			{moreInfor && (
				<>
					<Col xs={24} className="my-4">
						{category}
					</Col>
					<Col xs={24} className="my-4">
						{expiredOn}
					</Col>
					<Col xs={24} className="my-4">
						{description}
					</Col>
				</>
			)}
		</>
	);

	const fetchContactInfo = () => {
		const contactInfoField = form.getFieldValue(CONTACT_INFO_PROP);

		const contactInfo = {
			...(contactInfoField?.[`${IS_EMAIL_PUBLIC_PROP}`] && {
				[`${EMAIL_PROP}`]: contactInfoField?.[`${EMAIL_PROP}`],
			}),
			...(contactInfoField?.[`${IS_PHONE_PUBLIC_PROP}`] && {
				[`${PHONE_PROP}`]: contactInfoField?.[`${PHONE_PROP}`],
			}),
			...(contactInfoField?.[`${IS_WEBSITE_PUBLIC_PROP}`] && {
				[`${WEBSITE_PROP}`]: contactInfoField?.[`${WEBSITE_PROP}`],
			}),
		};

		return contactInfo;
	};

	const submitHandle = () => {
		const info = {
			...form.getFieldsValue(),
			...form.getFieldValue(LOCATION_OBJ),
			[`${EXPIRED_ON_PROP}`]: form.getFieldValue(DATE_PROP)?.toDate(),
			[`${CONTACT_INFO_PROP}`]: fetchContactInfo(),
		};

		form
			.validateFields()
			.then(() =>
				editing ? updateDeal(id, ownerId, info) : createDeal(ownerId, info)
			)
			.catch((e) => console.log(e))
			.finally(() => setUpdating(false));
	};

	const infoForm = (
		<Form
			id="edit-deal-form"
			className="my-4 "
			form={form}
			{...(editing && {
				initialValues: {
					...info,
					[`${DATE_PROP}`]: info?.[`${EXPIRED_ON_PROP}`]
						? moment(new Date(info?.[`${EXPIRED_ON_PROP}`]))
						: "",
				},
			})}
			onFinish={submitHandle}
			onFieldsChange={() => setUpdating(true)}
		>
			<Row justify="center">
				<Col xs={24} xl={20}>
					<Row justify="space-evenly">
						<Col xs={24} lg={20} xl={15} className="my-3">
							{title}
						</Col>
						<Col xs={24} lg={20} xl={15} className="my-3">
							{address}
						</Col>
						<Col xs={24} lg={20} xl={15} className="my-3">
							{coverPictures}
						</Col>
						<Col xs={24} lg={20} xl={15} className="my-3">
							{contactInfo}
						</Col>
						<Col xs={24} lg={20} xl={15} className="my-3">
							{status}
						</Col>
						<Col xs={24} lg={20} xl={15} className="my-3">
							{withMoreInfo}
						</Col>

						<Col xs={24} lg={12} className="my-3">
							<Button
								type="primary"
								size="large"
								shape="round"
								block
								htmlType="submit"
								// onClick={submitHandle}
								disabled={!updating}
							>
								{editing ? "Save and Update" : "Save and Post"}
							</Button>
						</Col>
					</Row>
				</Col>
			</Row>
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

export default EditDeal;

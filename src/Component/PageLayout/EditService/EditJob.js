import { Button, Checkbox, Col, Divider, Form, Row, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import { useState } from "react";
import {
	CONTACT_INFO_PROP,
	DATE_PROP,
	DEFAULT_JOB_INFO,
	EMAIL_PROP,
	EXPERIENCE_PROP,
	EXPIRED_ON_PROP,
	ID_PROP,
	INFO_PROP,
	IS_EMAIL_PUBLIC_PROP,
	IS_PHONE_PUBLIC_PROP,
	IS_REMOTE_PROP,
	IS_WEBSITE_PUBLIC_PROP,
	LOCATION_OBJ,
	LOCATION_PROP,
	PHONE_PROP,
	PICTURE_LIST_PROP,
	POSITION_LIST_PROP,
	SALARY_PROP,
	SKILL_PROP,
	TITLE_PROP,
	WEBSITE_PROP,
} from "../../../Util/ConstVar";
import useAddress from "../../Hook/FormHook/useAddress";
import useCheckBox from "../../Hook/FormHook/useCheckBox";
import useCheckBoxGroup from "../../Hook/FormHook/useCheckBoxGroup";
import useContactInfo from "../../Hook/FormHook/useContactInfo";
import useDatePicker from "../../Hook/FormHook/useDatePicker";
import usePictureWall from "../../Hook/FormHook/UsePictureWall";
import usePostStatus from "../../Hook/FormHook/usePostStatus";
import useRadioGroup from "../../Hook/FormHook/useRadioGroup";
import useTextarea from "../../Hook/FormHook/useTextarea";
import useUsername from "../../Hook/FormHook/useUsername";
import usePost from "../../Hook/usePost";

function EditJob({ service = {}, editing = false, ownerId = null }) {
	const [form] = useForm();
	const {
		[`${ID_PROP}`]: id = -1,
		[`${INFO_PROP}`]: { [`${PICTURE_LIST_PROP}`]: pictureList = [], ...info },
	} = {
		...service,
		[`${INFO_PROP}`]: { ...DEFAULT_JOB_INFO, ...service?.[`${INFO_PROP}`] },
	};

	const [moreInfor, setMoreInfor] = useState(editing);
	const [updating, setUpdating] = useState(false);

	const { updateJob, createJob } = usePost();

	const header = (
		<Row justify="center" className="text-center">
			<Col>
				<Typography.Title level={1} className="c-job-important">
					Job Hiring Service
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
			label: "Job Title",
		},
		inputProps: {
			placeholder: "E.g. Graphic Designer",
		},
	});

	const address = useAddress({
		itemProps: {
			label: "Job Area / Post Area?",
			labelCol: { span: 24 },
		},
		inputProps: { prefix: "" },
		defaultLocation: editing ? info?.[`${LOCATION_PROP}`] || {} : {},
	});

	const remoteOption = useCheckBox({
		itemProps: {
			name: IS_REMOTE_PROP,
		},
		title: "Remote work available",
	});

	const coverPictures = usePictureWall({
		form: form,
		itemProps: {
			label: "Upload job or service photos",
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
			label: "Position Description",
			labelCol: { span: 24 },
		},
		inputProps: {
			placeholder: "Give your candidates more information about this job",
		},
	});

	const positions = useCheckBoxGroup({
		form: form,
		options: [
			{
				value: "Full-time",
				title: "Full-time",
			},
			{
				value: "Part-time",
				title: "Part-time",
			},
			{
				value: "Internship",
				title: "Internship",
			},
			{
				value: "Seasonal",
				title: "Seasonal",
			},
			{
				value: "Freelance",
				title: "Freelance",
			},
			{
				value: "Volunteer",
				title: "Volunteer",
			},
		],
		itemProps: {
			name: POSITION_LIST_PROP,
			label: "Job Postion",
			labelCol: { span: 24 },
		},
		required: false,
		withOther: false,
	});

	const experience = useRadioGroup({
		form: form,
		options: [
			{
				value: "No experience",
				title: "No experience",
			},
			{
				value: "1-2 years",
				title: "1-2 years",
			},
			{
				value: "3-5 years",
				title: "3-5 years",
			},
			{
				value: "+5 years",
				title: "+5 years",
			},
		],
		itemProps: {
			name: EXPERIENCE_PROP,
			label: "Job Experience",
			labelCol: { span: 24 },
		},
		required: false,
	});

	const salary = useUsername({
		itemProps: {
			name: SALARY_PROP,
			label: "Job Salary",
		},
		inputProps: {
			placeholder: "E.g. $16 per hour, minimum wage",
		},
		required: false,
	});

	const skills = useUsername({
		itemProps: {
			name: SKILL_PROP,
			label: "Job Skills",
		},
		inputProps: {
			placeholder: "E.g. Self-learning, Good memory, Customer service",
		},
		required: false,
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
					<Col xs={24} className="my-3">
						{positions}
					</Col>
					<Col xs={24} className="my-3">
						{experience}
					</Col>
					<Col xs={24} className="my-4">
						{salary}
					</Col>
					<Col xs={24} className="my-4">
						{skills}
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
				editing ? updateJob(id, ownerId, info) : createJob(ownerId, info)
			)
			.catch((e) => console.log(e))
			.finally(() => setUpdating(false));
	};

	const infoForm = (
		<Form
			id="edit-job-form"
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
						<Col xs={24} lg={20} xl={15} className="mt-0 mb-3">
							{remoteOption}
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

						<Col xs={24} lg={12} className="my-4">
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

export default EditJob;

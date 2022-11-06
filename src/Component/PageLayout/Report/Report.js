import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Col, Form, Modal, Row, Tooltip, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { sendReportAxios } from "../../../Axios/axiosPromise";
import {
	REPORT_MESSAGE_PROP,
	REPORT_REASON_LIST_PROP,
	REPORT_SENDER_PROP,
	REPORT_TYPE_ID_PROP,
	REPORT_TYPE_PROP,
} from "../../../Util/ConstVar";
import useCheckBoxGroup from "../../Hook/FormHook/useCheckBoxGroup";
import useEmail from "../../Hook/FormHook/useEmail";
import useTextarea from "../../Hook/FormHook/useTextarea";
import {
	errorMessage,
	loadingMessage,
	successMessage,
} from "../../Hook/useMessage";

function Report({
	zIndex = 1000,
	type = "",
	typeId = "",
	buttonText = "Report",
	buttonProps = {},
	iconOnly = true,
	iconProps = {},
} = {}) {
	const [form] = useForm();

	const [open, setOpen] = useState(false);

	const [confirmLoading, setConfirmLoading] = useState(false);

	const handleOk = () => {
		setConfirmLoading(true);
		form
			.validateFields()
			.then(() => {
				loadingMessage("Sending ....", 0);

				const info = {
					[`${REPORT_TYPE_PROP}`]: type,
					[`${REPORT_TYPE_ID_PROP}`]: typeId,
					...form.getFieldsValue(),
				};

				sendReportAxios(info)
					.then(() =>
						successMessage(
							"Report sent successfully. We have received your report. We will contact you if we need more information.",
							2.5
						).then(() => setOpen(false))
					)
					.catch((e) => errorMessage(e));
			})
			.finally(() => setConfirmLoading(false));
	};

	const handleCancel = () => {
		setConfirmLoading(false);
		setOpen(false);
	};

	const email = useEmail({
		itemProps: {
			name: REPORT_SENDER_PROP,
			label: "Your email",
		},
	});

	const reasonData = [
		"Inappropriate content or images",
		"Wrong product information",
		"Abusive user",
	].map((v) => {
		return {
			title: v,
			value: v,
		};
	});

	const reasons = (
		<>
			{useCheckBoxGroup({
				form: form,
				itemProps: {
					name: REPORT_REASON_LIST_PROP,
					label: "Reason",
					labelCol: { span: 24, className: "p-0" },
				},
				options: reasonData,
				withOther: true,
			})}{" "}
		</>
	);

	const message = useTextarea({
		itemProps: {
			name: REPORT_MESSAGE_PROP,
			label: "Message",
			className: "my-2",
			labelCol: { span: 24 },
		},
		inputProps: {
			placeholder:
				"Please provide more information about your problem so that we can understand and solve the issue better.",
		},
	});

	const reportForm = (
		<Form form={form}>
			{email}
			{reasons}
			{message}
		</Form>
	);

	const app = (
		<>
			<Tooltip title="Report">
				<Button
					shape="round"
					type="danger"
					className={`${iconOnly && " px-2 "}`}
					onClick={() => setOpen(true)}
					{...buttonProps}
				>
					{iconOnly ? (
						<ExclamationCircleFilled
							style={{ fontSize: "1rem" }}
							{...iconProps}
						/>
					) : (
						buttonText
					)}
				</Button>
			</Tooltip>
			<Modal
				title={
					<Typography.Text ellipsis className="px-2">
						ThaiNow Report Form
					</Typography.Text>
				}
				open={open}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
				okButtonProps={{
					style: { display: "block !important" },
				}}
				cancelButtonProps={{ style: { display: "block !important" } }}
				okText="Submit Review"
				centered
				zIndex={zIndex}
			>
				<Row justify="center" gutter={[20, 20]} className="w-100">
					<Col>
						<Typography.Text type="danger">
							Thanks for contacting us. Please provide the following
							information!
						</Typography.Text>
					</Col>
					<Col xs={20}>{reportForm}</Col>
				</Row>
			</Modal>
		</>
	);
	return app;
}

export default Report;

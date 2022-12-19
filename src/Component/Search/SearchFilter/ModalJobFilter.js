import { Button, Form, Modal, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
	EXPERIENCE_PROP,
	POSITION_LIST_PROP,
	STATUS_PROP,
} from "../../../Util/ConstVar";
import useCheckBoxGroup from "../../Hook/FormHook/useCheckBoxGroup";
import useRadioGroup from "../../Hook/FormHook/useRadioGroup";
import useSearch from "../../Hook/SearchHook/useSearch";

function ModalJobFilter({ open = false, onHide = () => {} } = {}) {
	const { dispatchSearch } = useSearch();
	const [searchParams] = useSearchParams({ replace: false });

	const positionParam = searchParams.get(POSITION_LIST_PROP) || "All";
	const experienceParam = searchParams.get(EXPERIENCE_PROP) || "All";
	const statusParam = searchParams.get(STATUS_PROP) || "All";

	const [form] = useForm();
	const [confirmLoading, setConfirmLoading] = useState(false);

	const id = "filter-job-form";
	const title = "Job Filter";
	const initialValues = {
		[`${POSITION_LIST_PROP}`]: positionParam,
		[`${EXPERIENCE_PROP}`]: experienceParam,
		[`${STATUS_PROP}`]: statusParam,
	};

	const positions = useCheckBoxGroup({
		form: form,
		options: [
			{
				value: "All",
				title: "All",
			},
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
		required: true,
	});

	const experience = useRadioGroup({
		form: form,
		options: [
			{
				value: "All",
				title: "All",
			},
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
		required: true,
	});

	const status = useRadioGroup({
		form: form,
		options: [
			{
				value: "All",
				title: "All",
			},
			{
				value: "Available Only",
				title: "Available Only",
			},
		],
		itemProps: {
			name: STATUS_PROP,
			label: "Promotion Status ",
			labelCol: { span: 24 },
		},
		required: true,
	});

	const filterFields = (
		<>
			<div className="mb-3">{positions}</div>
			{experience}
			{status}
		</>
	);

	const filterForm = (
		<Form id={id} form={form} initialValues={initialValues}>
			{filterFields}
		</Form>
	);

	const fetchParams = () => {
		const { [`${POSITION_LIST_PROP}-Other`]: otherPosition, ...params } = {
			...form.getFieldsValue(),
		};
		return params;
	};

	const handleApplyFilter = () => {
		form
			.validateFields()
			.then(() => {
				setConfirmLoading(true);

				dispatchSearch({
					filter: true,
					params: fetchParams(),
				});
			})
			.finally(() => {
				onHide();
				setConfirmLoading(false);
			});
	};

	const handleCancelFilter = () => {
		form.setFieldsValue(initialValues);
		onHide();
	};

	const handleResetFilter = () =>
		form.setFieldsValue({
			[`${POSITION_LIST_PROP}`]: "All",
			[`${STATUS_PROP}`]: "All",
		});

	const filterModal = (
		<Modal
			title={
				<>
					<Typography.Title level={3} className="m-0">
						{title}
					</Typography.Title>
					<Button type="link" className="m-0 p-0" onClick={handleResetFilter}>
						Reset filter
					</Button>
				</>
			}
			open={open}
			okText="Apply filter"
			okButtonProps={{
				style: {
					borderRadius: "50px",
				},
			}}
			onOk={handleApplyFilter}
			confirmLoading={confirmLoading}
			onCancel={handleCancelFilter}
			cancelButtonProps={{
				style: {
					borderRadius: "50px",
				},
			}}
		>
			{filterForm}
		</Modal>
	);

	const app = filterModal;
	return app;
}

export default ModalJobFilter;

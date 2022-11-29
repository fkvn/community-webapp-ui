import { Button, Form, Modal, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CATEGORY_PROP, STATUS_PROP } from "../../Util/ConstVar";
import useRadioGroup from "../Hook/FormHook/useRadioGroup";
import useSearch from "../Hook/useSearch";

function ModalDealFilter({ open = false, onHide = () => {} } = {}) {
	const [confirmLoading, setConfirmLoading] = useState(false);
	const { dispatchSearch } = useSearch();
	const [searchParams] = useSearchParams({ replace: false });
	const categoryParam = searchParams.get(CATEGORY_PROP, "All");
	const statusParam = searchParams.get(STATUS_PROP, "All");

	const [form] = useForm();

	const category = useRadioGroup({
		form: form,
		options: [
			{
				value: "All",
				title: "All",
			},
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
		required: true,
		withOther: true,
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

	const filterForm = (
		<Form
			id="filter-deal-form"
			form={form}
			initialValues={{
				[`${CATEGORY_PROP}`]: categoryParam,
				[`${STATUS_PROP}`]: statusParam,
			}}
		>
			{category}
			{status}
		</Form>
	);

	const handleOk = () => {
		form
			.validateFields()
			.then(() => {
				setConfirmLoading(true);

				dispatchSearch({
					filter: true,
					params: {
						...form.getFieldsValue(),
					},
				}).then(() => onHide());
			})
			.finally(() => setConfirmLoading(false));
	};

	const handleCancel = () => {
		form.setFieldsValue({
			[`${CATEGORY_PROP}`]: categoryParam,
			[`${STATUS_PROP}`]: statusParam,
		});
		onHide();
	};

	console.log(form.isFieldsTouched());

	const app = (
		<Modal
			title={
				<>
					<Typography.Title level={3} className="m-0">
						Local Deal Filter
					</Typography.Title>
					<Button
						type="link"
						className="m-0 p-0"
						onClick={() =>
							form.setFieldsValue({
								[`${CATEGORY_PROP}`]: "All",
								[`${STATUS_PROP}`]: "All",
							})
						}
					>
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
			onOk={handleOk}
			confirmLoading={confirmLoading}
			onCancel={handleCancel}
			cancelButtonProps={{
				style: {
					borderRadius: "50px",
				},
			}}
		>
			{filterForm}
		</Modal>
	);
	return app;
}

export default ModalDealFilter;

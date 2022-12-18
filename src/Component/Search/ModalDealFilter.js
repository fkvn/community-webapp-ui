import { Button, Form, Modal, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CATEGORY_PROP, STATUS_PROP } from "../../Util/ConstVar";
import useRadioGroup from "../Hook/FormHook/useRadioGroup";
import useSearch from "../Hook/SearchHook/useSearch";

function ModalDealFilter({ open = false, onHide = () => {} } = {}) {
	const { dispatchSearch } = useSearch();
	const [searchParams] = useSearchParams({ replace: false });
	const categoryParam = searchParams.get(CATEGORY_PROP) || "All";
	const statusParam = searchParams.get(STATUS_PROP) || "All";

	const [form] = useForm();
	const [confirmLoading, setConfirmLoading] = useState(false);

	const id = "filter-deal-form";
	const title = "Local Deal Filter";
	const initialValues = {
		[`${CATEGORY_PROP}`]: categoryParam,
		[`${STATUS_PROP}`]: statusParam,
	};

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

	const filterFields = (
		<>
			{category}
			{status}
		</>
	);

	const filterForm = (
		<Form id={id} form={form} initialValues={initialValues}>
			{filterFields}
		</Form>
	);

	const fetchParams = () => {
		const { [`${CATEGORY_PROP}-Other`]: other, ...params } = {
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
		form.setFieldsValue({
			[`${CATEGORY_PROP}`]: categoryParam,
			[`${STATUS_PROP}`]: statusParam,
		});
		onHide();
	};

	const handleResetFilter = () =>
		form.setFieldsValue({
			[`${CATEGORY_PROP}`]: "All",
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

export default ModalDealFilter;

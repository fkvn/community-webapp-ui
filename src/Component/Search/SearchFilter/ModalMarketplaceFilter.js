import { Button, Form, Modal, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
	CATEGORY_PROP,
	CONDITION_PROP,
	STATUS_PROP,
} from "../../../Util/ConstVar";
import useRadioGroup from "../../Hook/FormHook/useRadioGroup";
import useSearch from "../../Hook/SearchHook/useSearch";

function ModalMarketplaceFilter({ open = false, onHide = () => {} } = {}) {
	const { dispatchSearch } = useSearch();
	const [searchParams] = useSearchParams({ replace: false });

	const conditionParam = searchParams.get(CONDITION_PROP) || "All";
	const categoryParam = searchParams.get(CATEGORY_PROP) || "All";
	const statusParam = searchParams.get(STATUS_PROP) || "All";

	const [form] = useForm();
	const [confirmLoading, setConfirmLoading] = useState(false);

	const id = "filter-housing-form";
	const title = "Housing Filter";
	const initialValues = {
		[`${CONDITION_PROP}`]: conditionParam,
		[`${CATEGORY_PROP}`]: categoryParam,
		[`${STATUS_PROP}`]: statusParam,
	};

	const condition = useRadioGroup({
		form: form,
		options: [
			{
				value: "All",
				title: "All",
			},
			{
				value: "New",
				title: "New",
			},
			{
				value: "Liked New",
				title: "Liked New",
			},
			{
				value: "Used",
				title: "Used",
			},
		],
		itemProps: {
			name: CONDITION_PROP,
			label: "Product Condition",
			labelCol: { span: 24 },
		},
		required: true,
	});

	const category = useRadioGroup({
		form: form,
		options: [
			{
				value: "All",
				title: "All",
			},
			{
				value: "Electronics",
				title: "Electronics",
			},
			{
				value: "Clothing and Accessories",
				title: "Clothing and Accessories",
			},
			{
				value: "Phone & Computer",
				title: "Phone & Computer",
			},
			{
				value: "Classifieds",
				title: "Classifieds",
			},
			{
				value: "Vehicles",
				title: "Vehicles",
			},
			{
				value: "Home and Garden",
				title: "Home and Garden",
			},
		],
		itemProps: {
			name: CATEGORY_PROP,
			label: "Property Category",
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
			<div className="mb-3">{condition}</div>
			<div className="mb-3">{category}</div>
			{status}
		</>
	);

	const filterForm = (
		<Form id={id} form={form} initialValues={initialValues}>
			{filterFields}
		</Form>
	);

	const fetchParams = () => {
		return form.getFieldsValue();
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
			[`${CONDITION_PROP}`]: "All",
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

export default ModalMarketplaceFilter;

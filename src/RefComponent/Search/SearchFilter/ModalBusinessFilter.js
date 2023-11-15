import { Button, Form, Modal, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
	COMPANY_INDUSTRY_LIST,
	COMPANY_INDUSTRY_PROP,
	STATUS_PROP,
} from "../../../Util/ConstVar";
import useRadioGroup from "../../Hook/FormHook/useRadioGroup";
import useSearch from "../../Hook/SearchHook/useSearch";

function ModalBusinessFilter({ open = false, onHide = () => {} } = {}) {
	const { dispatchSearch } = useSearch();
	const [searchParams] = useSearchParams({ replace: false });
	const industryParam = searchParams.get(COMPANY_INDUSTRY_PROP) || "All";

	const [form] = useForm();
	const [confirmLoading, setConfirmLoading] = useState(false);

	const id = "filter-business-form";
	const title = "Business Filter";
	const initialValues = {
		[`${COMPANY_INDUSTRY_PROP}`]: industryParam,
	};

	const category = useRadioGroup({
		form: form,
		options: [
			{
				value: "All",
				title: "All",
			},
			...COMPANY_INDUSTRY_LIST.map((ids) => {
				return {
					value: ids,
					title: ids,
				};
			}),
		],
		itemProps: {
			name: COMPANY_INDUSTRY_PROP,
			label: "Business Industry ",
			labelCol: { span: 24 },
		},
		required: true,
	});

	const filterFields = <>{category}</>;

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
		form.setFieldsValue({
			[`${COMPANY_INDUSTRY_PROP}`]: industryParam,
		});
		onHide();
	};

	const handleResetFilter = () =>
		form.setFieldsValue({
			[`${COMPANY_INDUSTRY_PROP}`]: "All",
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

export default ModalBusinessFilter;

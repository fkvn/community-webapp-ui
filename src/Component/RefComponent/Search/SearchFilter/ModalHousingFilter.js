import { Button, Form, Image, Modal, Space, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
	svgAcIconBlack,
	svgCookingIconBlack,
	svgDryerIconBlack,
	svgMicrowaveIconBlack,
	svgPetAllowedIconBlack,
	svgRefrigeratorIconBlack,
	svgWasherIconBlack,
	svgWifiIconBlack,
} from "../../../Assest/Asset";
import {
	AMENITY_LIST_PROP,
	CATEGORY_PROP,
	HOUSING_TYPE_PROP,
	STATUS_PROP,
} from "../../../Util/ConstVar";
import useCheckBoxGroup from "../../Hook/FormHook/useCheckBoxGroup";
import useRadioGroup from "../../Hook/FormHook/useRadioGroup";
import useSearch from "../../Hook/SearchHook/useSearch";

function ModalHousingFilter({ open = false, onHide = () => {} } = {}) {
	const { dispatchSearch } = useSearch();
	const [searchParams] = useSearchParams({ replace: false });

	const propertyTypeParam = searchParams.get(HOUSING_TYPE_PROP) || "All";
	const categoryParam = searchParams.get(CATEGORY_PROP) || "All";
	const amenitiesParam = searchParams.get(AMENITY_LIST_PROP) || ["All"];
	const statusParam = searchParams.get(STATUS_PROP) || "All";

	const [form] = useForm();
	const [confirmLoading, setConfirmLoading] = useState(false);

	const id = "filter-housing-form";
	const title = "Housing Filter";
	const initialValues = {
		[`${HOUSING_TYPE_PROP}`]: propertyTypeParam,
		[`${CATEGORY_PROP}`]: categoryParam,
		[`${AMENITY_LIST_PROP}`]: amenitiesParam,
		[`${STATUS_PROP}`]: statusParam,
	};

	const property = useRadioGroup({
		form: form,
		options: [
			{
				value: "All",
				title: "All",
			},
			{
				value: "Shared",
				title: "Shared",
			},
			{
				value: "Private",
				title: "Private",
			},
			{
				value: "Entire",
				title: "Entire",
			},
			{
				value: "Co-op",
				title: "Co-op",
			},
		],
		itemProps: {
			name: HOUSING_TYPE_PROP,
			label: "Property Type",
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
				value: "Apartment",
				title: "Apartment",
			},
			{
				value: "Room",
				title: "Room",
			},
			{
				value: "House",
				title: "House",
			},
			{
				value: "Condo",
				title: "Condo",
			},
		],
		itemProps: {
			name: CATEGORY_PROP,
			label: "Property Category",
			labelCol: { span: 24 },
		},
		required: true,
	});

	const amenityItems = [
		{
			title: "Air Conditioner",
			icon: svgAcIconBlack,
			height: "1.1rem",
		},

		{
			title: "Wifi",
			icon: svgWifiIconBlack,
			height: "1.1rem",
		},
		{
			title: "Refrigerator",
			icon: svgRefrigeratorIconBlack,
			height: "1.2rem",
		},

		{
			title: "Cooking Basic",
			icon: svgCookingIconBlack,
			height: "1rem",
		},
		{
			title: "Microwave",
			icon: svgMicrowaveIconBlack,
			height: "1rem",
		},
		{
			title: "Pet Allowed",
			icon: svgPetAllowedIconBlack,
			height: "1.2rem",
		},
		{
			title: "Washer",
			icon: svgWasherIconBlack,
			height: "1.2rem",
		},
		{
			title: "Dryer",
			icon: svgDryerIconBlack,
			height: "1.2rem",
		},
	];

	const amenity = useCheckBoxGroup({
		form: form,
		itemProps: {
			name: AMENITY_LIST_PROP,
			label: "Property Amenities",
			labelCol: { span: 24 },
		},
		options: amenityItems.map((item) => {
			return {
				value: item.title,
				title: (
					<Space align="top">
						<Image
							preview={false}
							src={item.icon}
							style={{
								height: item.height,
								verticalAlign: "middle",
								paddingBottom: "3px",
							}}
						/>
						<Typography.Text>{item.title}</Typography.Text>
					</Space>
				),
			};
		}),
		required: true,
		justify: "",
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
			{property}
			{amenity}
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
			[`${HOUSING_TYPE_PROP}`]: "All",
			[`${CATEGORY_PROP}`]: "All",
			[`${AMENITY_LIST_PROP}`]: ["All"],
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

export default ModalHousingFilter;

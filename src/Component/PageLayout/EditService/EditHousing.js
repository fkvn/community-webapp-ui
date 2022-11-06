import {
	Button,
	Checkbox,
	Col,
	Divider,
	Form,
	Image,
	Row,
	Space,
	Typography,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import { useState } from "react";
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
	ANNUAL_COST_PROP,
	CATEGORY_PROP,
	CONTACT_INFO_PROP,
	DAILY_COST_PROP,
	DATE_PROP,
	DEFAULT_HOUSING_INFO,
	DEPOSIT_COST_PROP,
	EMAIL_PROP,
	EXPIRED_ON_PROP,
	HOUSING_TYPE_PROP,
	ID_PROP,
	INFO_PROP,
	INTERIOR_BATH_PROP,
	INTERIOR_BED_PROP,
	INTERIOR_GUEST_PROP,
	INTERIOR_PARKING_PROP,
	INTERIOR_PROP,
	IS_EMAIL_PUBLIC_PROP,
	IS_PHONE_PUBLIC_PROP,
	IS_WEBSITE_PUBLIC_PROP,
	LOCATION_OBJ,
	LOCATION_PROP,
	MONTHLY_COST_PROP,
	PHONE_PROP,
	PICTURE_LIST_PROP,
	TITLE_PROP,
	WEBSITE_PROP,
} from "../../../Util/ConstVar";
import useAddress from "../../Hook/FormHook/useAddress";
import useCheckBoxGroup from "../../Hook/FormHook/useCheckBoxGroup";
import useContactInfo from "../../Hook/FormHook/useContactInfo";
import useDatePicker from "../../Hook/FormHook/useDatePicker";
import useNumber from "../../Hook/FormHook/useNumber";
import usePictureWall from "../../Hook/FormHook/UsePictureWall";
import usePostStatus from "../../Hook/FormHook/usePostStatus";
import useRadioGroup from "../../Hook/FormHook/useRadioGroup";
import useTextarea from "../../Hook/FormHook/useTextarea";
import useUsername from "../../Hook/FormHook/useUsername";
import usePost from "../../Hook/usePost";

function EditHousing({ service = {}, editing = false, ownerId = null }) {
	const [form] = useForm();
	const {
		[`${ID_PROP}`]: id = -1,
		[`${INFO_PROP}`]: { [`${PICTURE_LIST_PROP}`]: pictureList = [], ...info },
	} = {
		...service,
		[`${INFO_PROP}`]: { ...DEFAULT_HOUSING_INFO, ...service?.[`${INFO_PROP}`] },
	};

	const [moreInfor, setMoreInfor] = useState(editing);
	const [updating, setUpdating] = useState(false);

	const { updateHousing, createHousing } = usePost();

	const header = (
		<Row justify="center" className="text-center">
			<Col>
				<Typography.Title level={1} className="c-housing-important">
					Housing Service For Rent or Sell
				</Typography.Title>
				{editing && (
					<Typography.Title level={5} className="c-primary-important">
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
			label: "Property Title ",
		},
		inputProps: {
			placeholder: "E.g. House for sell, Looking for roommates",
		},
	});

	const address = useAddress({
		itemProps: {
			label: "Property Area / Post Area?",
			labelCol: { span: 24 },
		},
		inputProps: { prefix: "" },
		defaultLocation: editing ? info?.[`${LOCATION_PROP}`] || {} : {},
	});

	const coverPictures = usePictureWall({
		form: form,
		itemProps: {
			label: "Upload property’s photos",
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
			label: "Property Description",
			labelCol: { span: 24 },
		},
		inputProps: {
			placeholder: "Give people more information about this place",
		},
	});

	const property = useRadioGroup({
		form: form,
		options: [
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
		required: false,
	});

	const category = useRadioGroup({
		form: form,
		options: [
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
		otherDefault:
			["Apartment", "Room", "House", "Condo"].indexOf(
				info?.[`${CATEGORY_PROP}`]
			) < 0
				? true
				: false,
		required: false,
		withOther: true,
		otherPlaceholder: "E.g. Studio, Duplex",
	});

	const dailyCost = useNumber({
		itemProps: {
			name: DAILY_COST_PROP,
			label: "Daily",
		},
	});

	const monthlyCost = useNumber({
		itemProps: {
			name: MONTHLY_COST_PROP,
			label: "Monthly",
		},
	});

	const annualCost = useNumber({
		itemProps: {
			name: ANNUAL_COST_PROP,
			label: "Annual",
		},
	});

	const depositCost = useNumber({
		itemProps: {
			name: DEPOSIT_COST_PROP,
			label: "Deposit",
		},
	});

	const costs = (
		<Row justify="space-between">
			<Col xs={24}>
				<Form.Item className="m-0" label="Property Cost Starts" labelCol={24}>
					{dailyCost}
					{monthlyCost}
					{annualCost}
					{depositCost}
				</Form.Item>
			</Col>
		</Row>
	);

	const guest = useNumber({
		itemProps: {
			name: INTERIOR_GUEST_PROP,
			label: "Guest",
		},
		inputProps: {
			addonBefore: "",
			placeholder: "Number of guests available",
		},
	});

	const bath = useNumber({
		itemProps: {
			name: INTERIOR_BATH_PROP,
			label: "Bath",
		},
		inputProps: {
			addonBefore: "",
			placeholder: "Number of baths available",
		},
	});

	const bed = useNumber({
		itemProps: {
			name: INTERIOR_BED_PROP,
			label: "Bed",
		},
		inputProps: {
			addonBefore: "",
			placeholder: "Number of beds available",
		},
	});

	const parking = useNumber({
		itemProps: {
			name: INTERIOR_PARKING_PROP,
			label: "Parking",
		},
		inputProps: {
			addonBefore: "",
			placeholder: "Number of parking available",
		},
	});

	const interior = (
		<Form.List name={INTERIOR_PROP}>
			{() => (
				<Form.Item className={`m-0`} label="Property Interior">
					<Row justify="space-between" gutter={20}>
						<Col>
							{guest} {bed}
						</Col>

						<Col>
							{bath} {parking}
						</Col>
					</Row>
				</Form.Item>
			)}
		</Form.List>
	);

	const amenityList = [
		"Wifi",
		"Washer",
		"Cooking Basic",
		"Refrigerator",
		"Air Conditioner",
		"Microwave",
		"Dryer",
		"Pet Allowed",
	];

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
		},
		options: amenityItems.map((item, idx) => {
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
					{property}
					{category}
					{costs}
					{interior}
					{amenity}

					{expiredOn}
					{description}
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
		const submitInfo = {
			...form.getFieldsValue(),
			...form.getFieldValue(LOCATION_OBJ),
			[`${EXPIRED_ON_PROP}`]: form.getFieldValue(DATE_PROP)
				? form.getFieldValue(DATE_PROP).toDate()
				: null,
			[`${CONTACT_INFO_PROP}`]: fetchContactInfo(),
			[`${AMENITY_LIST_PROP}`]: (
				form.getFieldValue([`${AMENITY_LIST_PROP}`]) || []
			).reduce(
				(res, item) => {
					return amenityList.indexOf(item) >= 0 ? [...res, item] : res;
				},

				[]
			),
		};

		form
			.validateFields()
			.then(
				// () => console.log(submitInfo)
				editing
					? updateHousing(id, ownerId, submitInfo)
					: createHousing(ownerId, submitInfo)
			)
			.catch((e) => console.log(e))
			.finally(() => setUpdating(false));
	};

	const infoForm = (
		<Form
			className="my-4 "
			form={form}
			{...(editing && {
				initialValues: {
					...info,
					[`${DATE_PROP}`]: info?.[`${EXPIRED_ON_PROP}`]
						? moment(new Date(info?.[`${EXPIRED_ON_PROP}`]))
						: "",
					...(["Apartment", "Room", "House", "Condo"].indexOf(
						info?.[`${CATEGORY_PROP}`]
					) < 0 && {
						[`${CATEGORY_PROP}`]: "Other",
						[`${CATEGORY_PROP}-Other`]: info?.[`${CATEGORY_PROP}`],
					}),
				},
			})}
			onFinish={submitHandle}
			onFieldsChange={() => setUpdating(true)}
		>
			<Space size={15} direction="vertical" className="w-100 my-2 my-xl-4 ">
				{title}
				{address}
				{coverPictures}
				{contactInfo}
				{status}
				{withMoreInfo}
				<Row justify="center" className="mt-4">
					<Col>
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

export default EditHousing;
